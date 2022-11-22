const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const  product  = require('./routes/product');
const cart = require('./routes/cart');
const favourite = require('./routes/favorite');
const user = require('./routes/user');
const  auth  = require('./routes/auth');
const cookieParser = require('cookie-parser');

const app = express();
dotenv.config();

// middleware
app.use(express.static(path.join(__dirname + "/public")))
app.use(cookieParser());
app.use(express.json());
app.use(cors());
// products
app.use("/api/products/", product);
// auth
app.use("/api/auth/", auth);
app.use("/api/users/", user);
app.use("/api/users/favorite/", favourite);

app.use((err, req, res, next) => {
    const errorCode = err.status || 500;
    const errorMessage = err.message || "Something is wrong";

    res.status(errorCode).json({
        status: errorCode,
        message: errorMessage,
        success: false,
        stack : err.stack
    });
})
const connect = async () => {
   try {
       await mongoose.connect(process.env.MONGO);
       console.log('connected to mongodb');
    } catch (error) {
        throw(error);
    } 
}

app.listen(process.env.PORT || 5000, () => {
    connect();
    console.log("connected to backend");
})



