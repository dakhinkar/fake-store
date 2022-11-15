
const express = require('express');
const { getUsers, getSingleUser, updateUser, deleteUser } = require('../controllers/user');

const {verifyAdmin, verifyUser } = require('../utils/tokenVerify');

const router = express.Router();

// get All users
router.get('/',verifyAdmin, getUsers);

// get single user
router.get('/:id',verifyAdmin, getSingleUser);

// update user
router.put('/:id',verifyUser, updateUser);
// delete user
router.delete("/:id",verifyUser, deleteUser);

module.exports = router;