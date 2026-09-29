const quizService = require('./quiz.service');

const submitQuiz = async (req, res) => {
    try {
        // userId được lấy từ JWT Token (bởi auth.middleware)
        const userId = req.user.userId; 
        
        // answers lấy từ Frontend gửi lên
        const { answers } = req.body;

        if (!answers || !Array.isArray(answers)) {
            return res.status(400).json({ error: "Dữ liệu nộp bài không hợp lệ (cần mảng answers)" });
        }

        // Gọi service chấm điểm
        const result = await quizService.evaluateQuiz(userId, answers);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    submitQuiz
};
