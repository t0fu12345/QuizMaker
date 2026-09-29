const questionService = require('./question.service');

const getQuestions = async (req, res) => {
    try {
        // Lấy số lượng câu hỏi từ query (vd: /api/questions?limit=10)
        // Nếu Frontend không truyền lên, ta mặc định là lấy 10 câu
        const limit = parseInt(req.query.limit) || 10;
        
        const questions = await questionService.fetchQuestions(limit);
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getQuestions
};
