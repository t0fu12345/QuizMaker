const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    score: {
        type: Number,
        required: true,
        default: 0
    },
    totalQuestions: {
        type: Number,
        required: true
    },
    mistaken_topics: [{
        type: String // Lưu lại các topic mà user trả lời sai
    }],
    ai_advice: {
        type: String // Lưu phản hồi dạng chuỗi (hoặc JSON string) từ Gemini
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Attempt', attemptSchema);
