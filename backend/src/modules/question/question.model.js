const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    options: [{
        type: String,
        required: true
    }],
    correct_answer: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true, // Ví dụ: "Vòng lặp", "DOM", "React Hooks"
        index: true
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'medium'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Question', questionSchema);
