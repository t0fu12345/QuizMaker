const Question = require('./question.model');

// Xử lý logic lấy danh sách câu hỏi
const fetchQuestions = async (limit) => {
    // Sử dụng $sample của MongoDB để lấy câu hỏi ngẫu nhiên thay vì lấy cố định
    // Sử dụng $project để ẩn đi đáp án đúng (correct_answer) và các trường dư thừa
    const questions = await Question.aggregate([
        { $sample: { size: limit } },
        { $project: { 
            correct_answer: 0, // 0 nghĩa là ẩn đi
            createdAt: 0, 
            updatedAt: 0, 
            __v: 0 
        }}
    ]);
    
    return questions;
};

module.exports = {
    fetchQuestions
};
