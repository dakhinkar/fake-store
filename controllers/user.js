const bcrypt = require('bcryptjs');

const User = require('../models/User');
const createError = require('../utils/error');

// Get All Users
const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        return next(error);
    }
}

// Get Single User
const getSingleUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(createError(404, "User not found"));
        }
        res.json(user);
    } catch (error) {
        return next(error);
    }
}

// update user
const updateUser = async (req, res, next) => {
    const { username, password, email } = req.body;
    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        const user = await User.findByIdAndUpdate(req.params.id, { username, password: hash, email }, { new: true });

        if (!user) {
             return next(createError(404, "User not found"));
        }

        res.json(user);

    } catch (error) {
        return next(error);
    }
}

// delete user
const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            return next(createError(404, "User not found"));
        }
        await User.findByIdAndDelete(id);
        res.json({ message: "User delete successfully" });
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser
}