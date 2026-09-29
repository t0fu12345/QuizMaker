const express = require('express');
const router = express.Router();
const questionController = require('../modules/question/question.controller');

// GET /api/questions
router.get('/', questionController.getQuestions);

module.exports = router;
