const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    fullname :{
        type: String,
        required : true
    },
    phonenumber : {
        type : String,
        required: true,
    },
    email: {
        type : String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password : {
        type : String,
        required: true,
        minlength: 8
    },
    isAdmin:{
        type : Boolean,
        default : false,
    },
    otpReset: {
        type: Number,
        default: null
      },
      otpResetExpires: {
        type: Date,
        default: null
      },
      recentPasswords: { // Array to store hashed passwords
        type: [String],
        default: [],
    },
    passwordLastChanged: { // Date field to track when the password was last changed
        type: Date,
        default: Date.now,
    },
})

const User = mongoose.model("user",user_schema);
module.exports = User;