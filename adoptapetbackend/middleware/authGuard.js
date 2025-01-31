const jwt = require('jsonwebtoken')

const authGuard  = (req,res,next) =>{
    // 1. get auth headers (content type, authorization)
    console.log(req.headers)
    
    //get authorization
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(400).json({
            'success': false,
            "message": 'Authorization header not found'
        })
    }
    
    
    //if not found stop the process(res)
    // authorization format : "Bearer tokenajknjfknv" so split the token by space and take only the token

    const token = authHeader.split(' ')[1]
    //if token not found send response
    if(!token || token === ""){
        return res.status(400).json({
            "success" : false,
            "message" : "Token is missing"
        })
    }
    try {
        //verify the token and get user information
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodedUser;
        next()
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            "success": false,
            "message": "Not Authenticated"
        })
    }
}

//admin guard
const adminGuard = (req, res, next) => {
    try {
        // 1. Get Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authorization header is missing or malformed",
            });
        }

        // 2. Extract token
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        // 3. Verify token
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedUser;

        // 4. Check if user is an admin
        if (!req.user.isAdmin) {
            return res.status(403).json({
                success: false,
                message: "Permission denied: Admins only",
            });
        }

        // 5. Proceed to the next middleware
        next();
    } catch (error) {
        console.error("AdminGuard Error:", error.message);

        // Handle specific JWT errors (e.g., token expired, malformed)
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token has expired",
            });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }

        // Fallback for other errors
        res.status(500).json({
            success: false,
            message: "Internal server error during authentication",
        });
    }
};
module.exports = {
    authGuard,
    adminGuard
}