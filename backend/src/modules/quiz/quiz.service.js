const Question = require('../question/question.model');
const Attempt = require('./attempt.model');
const aiService = require('../ai/ai.service');

const evaluateQuiz = async (userId, userAnswers) => {
    let score = 0;
    const mistaken_topics = new Set();

    const totalQuestions = userAnswers.length;

    // Duyệt qua từng câu trả lời của User
    for (let i = 0; i < totalQuestions; i++) {
        const item = userAnswers[i];
        if (!item.questionId) continue;

        const question = await Question.findById(item.questionId);
        
        if (question) {
            if (question.correct_answer === item.selected) {
                score += 1;
            } else {
                mistaken_topics.add(question.topic);
            }
        }
    }

    const uniqueMistakenTopics = Array.from(mistaken_topics);

    // 1. GỌI SANG MODULE AI ĐỂ LẤY LỜI KHUYÊN
    const aiAdvice = await aiService.getAdviceFromGemini(score, uniqueMistakenTopics);

    // 2. LƯU LỊCH SỬ VÀO DATABASE
    const attempt = new Attempt({
        user: userId,
        score: score,
        totalQuestions: totalQuestions,
        mistaken_topics: uniqueMistakenTopics,
        ai_advice: aiAdvice // Lưu luôn nhận xét của AI
    });
    await attempt.save();

    // 3. TRẢ KẾT QUẢ VỀ CHO FRONTEND
    return {
        score: score,
        totalQuestions: totalQuestions,
        mistaken_topics: uniqueMistakenTopics,
        ai_advice: aiAdvice,
        message: "Chấm điểm hoàn tất!"
    };
};

module.exports = {
    evaluateQuiz
};
