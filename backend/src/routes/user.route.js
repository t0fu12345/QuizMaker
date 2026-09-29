const express = require('express');
const router = express.Router();
const userController = require('../modules/users/user.controller');
const { verifyToken } = require('../core/utils/auth.middleware');

// GET /api/users/profile (Cần token)
router.get('/profile', verifyToken, userController.getProfile);

module.exports = router;
