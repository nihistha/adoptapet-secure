//imported according to the process
const dotenv = require('dotenv');
dotenv.config();
const express = require('express'); 
// const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require('mongoose');
const connectDB = require('./database/database');
const cors = require("cors");
const fileUpload = require('express-fileupload')
const https = require('https');
const fs = require('fs');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/errorhandler');

const logger = require('./logger/logger');
const app = express();

const helmet = require('helmet');

const mongoSanitize = require('express-mongo-sanitize');

const xss = require('xss-clean');

app.use(errorHandler); 

app.use(cookieParser());

// Session Middleware
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,              
    saveUninitialized: true,    
    cookie: {
        secure: true,          
        httpOnly: true,         
        maxAge: 1000 * 60 * 60 
    }
}));

//creating an express app
app.use(xss());

app.use(helmet());
app.use(mongoSanitize());
//Json config
app.use(express.json());
app.use(fileUpload());

app.use(express.static('./public'))

app.use((req, res, next) => {
    if (req.session.user && req.session.ip && req.session.ip !== req.ip) {
        logger.security(`Session hijacking attempt! Session ID: ${req.session.id} changed IP from ${req.session.ip} to ${req.ip}`);
        req.session.destroy();
        return res.status(403).send('Session terminated');
    }
    req.session.ip = req.ip;
    next();
});


const sslOptions = {
    key: fs.readFileSync('key.pem'),  // Private key
    cert: fs.readFileSync('cert.pem') // Certificate
};

const corsOptions = {
    origin: `https://localhost:3000`,
    credentials : true,
    optionSuccessStatus : 200
} 
app.use(cors(corsOptions));

dotenv.config();

//connecting to the database
connectDB();

// Dev logging middleware
app.use(morgan("dev"));
  


//defining a port
const PORT = process.env.PORT

//creating a test route or endpoint
app.get('/test',(req,res)=>{
    res.end("Test Api is working")
})
const donation_routes = require('./routes/donation_route')

//CREATE USER API
app.use('/api/user',require('./routes/user_routes'))

app.use('/api/pets',require('./routes/pet_listing_route'))
// Payment route
app.use('/api/payment',donation_routes);
//creating the server
// app.listen(PORT,()=>{
//     console.log(`Server is running on port server ${PORT}`  )
// })

https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`HTTPS Server is running on https://localhost:${PORT}`);
});

module.exports = app;