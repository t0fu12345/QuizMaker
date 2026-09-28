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
        type: mongoose.Schema.Types.Mixed // Đổi thành Mixed để lưu trực tiếp Object JSON từ Gemini
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Attempt', attemptSchema);
