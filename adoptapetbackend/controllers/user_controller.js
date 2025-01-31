const userModel = require("../models/user_model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const sanitize = require("mongo-sanitize");
const nodemailer = require('nodemailer');
const logger = require('../logger/logger.js')
const mongoose = require("mongoose");

const createUser = async (req, res) => {
    console.log(res.data)
    const { fullname,phonenumber, email, password ,isAdmin} = sanitize(req.body); // destructuring the data
    
    //validation
    if(!fullname || !phonenumber || !email || !password){
        return res.status(400).json({
            "sucess" : false,
            "message" : "Please enter all fields"
        })
    }
    try {
        const existingUser = await userModel.findOne({email: email})
        if(existingUser){
            return res.json({
                "sucess" : false,
                "message" : "User Already Exists"
            })
        }
        const randomsalt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,randomsalt)

        const newUser = new userModel({
            fullname,
            phonenumber,
            email,
            password: hashPassword,
            isAdmin,
            recentPasswords: [hashPassword] 
        });

        await newUser.save();
        res.json({
            'success': true,
            'message': "User Created Successfully"
        });
    } catch (error) {
        console.error("User creation error:", error);
        res.status(500).json({
            'success': false,
            'message': "Internal Server Error"
        });
    }

}

const MAX_PASSWORD_AGE = 90 * 24 * 60 * 60 * 1000;
const loginUser = async (req, res) => {
    console.log(req.body);
    const { email, password } = sanitize(req.body) ;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please enter all fields",
        });
    }

    try {
        logger.info(`Login attempt for email: ${email}`);
        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            logger.warn(`Login failed for non-existent user: ${email}`);
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Check password expiry
        const passwordAge = Date.now() - new Date(user.passwordLastChanged || user.createdAt).getTime();
        if (passwordAge > MAX_PASSWORD_AGE) {
            return res.status(403).json({
                success: false,
                message: "Your password has expired. Please reset your password.",
            });
        }

        // Validate password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            logger.warn(`Invalid password attempt for user: ${email}`);
            return res.status(401).json({
                success: false,
                message: "Incorrect password",
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );
        logger.info(`User ${email} logged in successfully`);
        // Send success response
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            userData: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                isAdmin: user.isAdmin,
                phonenumber: user.phonenumber
            },
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const getUser = async (req, res) => {
    const user = await userModel.findById(req.user.id).select("-password -__v ");
    return res.status(200).json({
         success: true,
          data: user });
  }

const updateUser = async(req,res)=>{
    try {
        updates = req.body;
        const updatedUser = await userModel.findByIdAndUpdate(req.user.id, updates, { new: true });
        
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Forgot Password
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Set OTP and expiry
        user.otpReset = otp;
        user.otpResetExpires = Date.now() + 3600000; // 1 hour expiry
        await user.save();

        // Send email
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'suyogmanandhar2022@gmail.com',
                pass: 'esuc ialc qrof xenr'
            }
        });

        var mailOptions = {
            from: 'suyogmanandhar2022@gmail.com',
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: 'Error sending email' });
            } else {
                console.log('Email sent: ' + info.response);
                return res.status(200).json({ message: 'Password reset OTP sent' });
            }
        });

    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Server error' }); // Handle server errors
    }
};

// Verify OTP and Set New Password
const verifyOtpAndPassword = async (req, res) => {
    const { email, otp, password } = req.body;
    console.log(otp)

    if (!email || !otp || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const now = Date.now();
        const otpResetExpires = user.otpResetExpires.getTime();

        console.log(`Current Time (ms): ${now}`);
        console.log(`OTP Expiry Time (ms): ${otpResetExpires}`);
        console.log(`Stored OTP: ${user.otpReset}`);
        console.log(`Provided OTP: ${otp}`);

        if (user.otpReset != otp) {
            console.log('Provided OTP does not match stored OTP');
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        if (otpResetExpires < now) {
            console.log('OTP has expired');
            return res.status(400).json({ message: 'Expired OTP' });
        }

        const randomSalt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, randomSalt);
        user.otpReset = undefined;
        user.otpResetExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const changePassword = async (req, res) => {
    const { userId, newPassword } = req.body;

    // Validate userId format before proceeding
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid userId format. Please provide a valid MongoDB ObjectId.",
        });
    }

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if new password matches any recent passwords
        for (const recentHash of user.recentPasswords) {
            const isMatch = await bcrypt.compare(newPassword, recentHash);
            if (isMatch) {
                return res.status(400).json({
                    success: false,
                    message: "You cannot reuse a recent password. Please choose a new one.",
                });
            }
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the password & store recent passwords
        user.recentPasswords.push(user.password);
        if (user.recentPasswords.length > 5) {
            user.recentPasswords.shift(); // Keep only the last 5 passwords
        }

        user.password = hashedPassword;
        user.passwordLastChanged = Date.now();

        await user.save();

        return res.json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        console.error("Password update error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
module.exports = {
    createUser,
    loginUser,
    getUser,
    updateUser,
    forgotPassword,
    verifyOtpAndPassword,
    changePassword
}