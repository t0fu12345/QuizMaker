const express = require('express');
const router = express.Router();
const quizController = require('../modules/quiz/quiz.controller');
const { verifyToken } = require('../core/utils/auth.middleware');

// POST /api/quiz/submit (Chỉ cho phép user đã đăng nhập)
router.post('/submit', verifyToken, quizController.submitQuiz);

module.exports = router;
