
const express = require('express');
const { createUser, loginUser } = require('../controllers/auth');
const router = express.Router();

// register
router.post("/register", createUser);

// login
router.get("/login", loginUser )

module.exports = router;