const express = require('express');
const router = express.Router();
const { register, login, updateProfile } = require('../controllers/auth.controller');
const protect = require('../middleware/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.put('/me', protect, updateProfile);

module.exports = router;
