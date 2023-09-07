const express = require('express');

const { register, login, logout, printLoggedInUsers } = require('../Controllers/auth.js');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post("/logout", logout)
router.get("/logged-in-users", printLoggedInUsers)

module.exports = router;