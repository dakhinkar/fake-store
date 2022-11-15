
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const createError = require('../utils/error');

const createUser = async (req, res, next) => {
    const { username, email, password, isAdmin } = req.body;
    // let isAdmin2 = isAdmin ? isAdmin : false;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    try {
        const user = new User({
            username,
            email,
            password : hash,
            isAdmin
        });
        await user.save();
        res.status(200).json({message: "user created successfully."});
    } catch (error) {
        return next(error);
    }
} 

const loginUser = async (req, res, next) => {

    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return next(createError(404, "Invalid username"));
        }
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        

        if (!isPasswordCorrect) {
            return next(createError(404, "Invalid username or password"));    
        }

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);
        const { isAdmin, password, ...otherdata} = user._doc;

        res.cookie("access_token", token, {httpOnly: true}).status(201).json({token , ...otherdata});
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    createUser,
    loginUser
}