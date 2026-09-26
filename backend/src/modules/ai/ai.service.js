// FILE NÀY DÀNH CHO TV3 (AI INTEGRATION)
// TV3 sẽ viết code kết nối với Google Gemini API tại đây

const getAdviceFromGemini = async (score, mistakenTopics) => {
    try {
        // TODO (TV3): 
        // 1. Khởi tạo @google/generative-ai với process.env.GEMINI_API_KEY
        // 2. Viết Prompt truyền biến `score` và mảng `mistakenTopics`
        // 3. Gọi model.generateContent()
        
        // Đoạn code mock dưới đây là để TV1 và TV2 test luồng trong lúc chờ TV3 code thật:
        if (mistakenTopics.length === 0) {
            return "Bạn làm rất tốt! Không có chủ đề nào bị hổng.";
        }
        return `Bạn cần ôn tập lại các phần sau: ${mistakenTopics.join(', ')}.`;

    } catch (error) {
        console.error("Lỗi khi gọi AI:", error);
        return "Hiện tại hệ thống AI đang bận. Vui lòng thử lại sau.";
    }
};

module.exports = {
    getAdviceFromGemini
};
