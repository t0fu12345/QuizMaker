// backend/src/modules/ai/ai.service.js
// MODULE DÀNH CHO TV3 (AI INTEGRATION & PROMPT ENGINEERING)
// Quản lý tích hợp Google Gemini API, Prompt Engineering và Structured Output

const { GoogleGenerativeAI, SchemaType } = require('@google/generative-ai');

/**
 * Cấu hình schema JSON bắt buộc cho Gemini Structured Outputs
 * Đảm bảo 100% kết quả trả về đúng định dạng, không cần regex hay markdown strip
 */
const adviceResponseSchema = {
    type: SchemaType.OBJECT,
    properties: {
        summary: {
            type: SchemaType.STRING,
            description: 'Đánh giá tổng quan súc tích về kết quả làm bài của học viên (1-2 câu)'
        },
        performanceLevel: {
            type: SchemaType.STRING,
            enum: ['NeedsImprovement', 'Fair', 'Good', 'Excellent'],
            description: 'Cấp độ phân loại năng lực: Cần cải thiện, Khá, Tốt, Xuất sắc'
        },
        strengths: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
            description: 'Danh sách các điểm mạnh hoặc mảng kiến thức đã làm tốt'
        },
        weaknesses: {
            type: SchemaType.ARRAY,
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    topic: {
                        type: SchemaType.STRING,
                        description: 'Tên chủ đề bị trả lời sai'
                    },
                    diagnosis: {
                        type: SchemaType.STRING,
                        description: 'Nguyên nhân và khái niệm học viên có thể đang bị nhầm lẫn'
                    },
                    action: {
                        type: SchemaType.STRING,
                        description: 'Hành động cụ thể cần làm để khắc phục lỗ hổng này'
                    }
                },
                required: ['topic', 'diagnosis', 'action']
            },
            description: 'Chi tiết các chủ đề bị hổng kiến thức'
        },
        roadmap: {
            type: SchemaType.ARRAY,
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    step: {
                        type: SchemaType.INTEGER,
                        description: 'Thứ tự bước (1, 2, 3...)'
                    },
                    phase: {
                        type: SchemaType.STRING,
                        description: 'Tên giai đoạn học (ví dụ: Bước 1: Ôn tập nền tảng)'
                    },
                    description: {
                        type: SchemaType.STRING,
                        description: 'Nội dung chi tiết cần học và bài tập cần làm'
                    },
                    duration: {
                        type: SchemaType.STRING,
                        description: 'Thời gian ước tính (ví dụ: 1-2 ngày)'
                    }
                },
                required: ['step', 'phase', 'description', 'duration']
            },
            description: 'Lộ trình học tập từng bước cá nhân hóa'
        },
        recommendedKeywords: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
            description: 'Các từ khóa kỹ thuật chuẩn xác để học viên tra cứu tài liệu'
        },
        motivationalMessage: {
            type: SchemaType.STRING,
            description: 'Lời động viên tích cực, ngắn gọn truyền cảm hứng học tập'
        }
    },
    required: [
        'summary',
        'performanceLevel',
        'strengths',
        'weaknesses',
        'roadmap',
        'recommendedKeywords',
        'motivationalMessage'
    ]
};

/**
 * Khởi tạo Gemini Model với cấu hình JSON output
 */
const getGeminiModel = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
        throw new Error('GEMINI_API_KEY chưa được cấu hình hợp lệ trong file .env');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

    return genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
            responseMimeType: 'application/json',
            responseSchema: adviceResponseSchema,
            temperature: 0.2, // Nhiệt độ thấp giúp phản hồi mang tính phân tích, chuẩn xác, không bị ảo giác
        }
    });
};

/**
 * Xây dựng Prompt kỹ thuật (Prompt Engineering) chuyên sâu
 */
const buildPrompt = ({ score, totalQuestions, mistakenTopics, subject }) => {
    const total = totalQuestions || (score + (Array.isArray(mistakenTopics) ? mistakenTopics.length : 0)) || 10;
    const percentage = Math.round((score / total) * 100);
    const subjectTitle = subject ? `môn học: "${subject}"` : 'bài kiểm tra trắc nghiệm';
    const isPerfect = !mistakenTopics || mistakenTopics.length === 0;

    return `
Bạn là "ScoreUp AI Learning Advisor" — Chuyên gia cố vấn học tập và phân tích năng lực cá nhân hóa cho học viên.

BỐI CẢNH BÀI LÀM CỦA HỌC VIÊN:
- Bài kiểm tra: ${subjectTitle}
- Kết quả đạt được: ${score}/${total} câu hỏi (Tỷ lệ chính xác: ${percentage}%)
- Tình trạng chủ đề sai: ${isPerfect ? 'Học viên làm đúng 100%, không bị sai chủ đề nào.' : `Các chủ đề bị sai: ${JSON.stringify(mistakenTopics)}`}

YÊU CẦU PHÂN TÍCH:
1. Đánh giá tổng quan súc tích, mang tính chuyên môn và khách quan.
2. Xác định cấp độ (NeedsImprovement nếu < 50%, Fair nếu 50-69%, Good nếu 70-89%, Excellent nếu >= 90%).
3. Liệt kê điểm mạnh dựa trên tỉ lệ điểm số đạt được.
4. Với từng chủ đề trong danh sách bị sai:
   - Phân tích nguyên nhân cốt lõi học viên thường nhầm lẫn (diagnosis).
   - Đưa ra giải pháp hành động sửa sai tức thì và trọng tâm (action).
   (Nếu làm đúng 100%, mục weaknesses để mảng rỗng []).
5. Xây dựng lộ trình học tập cá nhân hóa (roadmap) 2 đến 3 bước khả thi trong ngắn hạn (1-7 ngày tới).
6. Gợi ý từ khóa kỹ thuật chuẩn xác (recommendedKeywords) để học viên tra cứu tài liệu học tập chính thống.
7. Lời động viên ngắn gọn, tích cực (motivationalMessage).

LƯU Ý: Phản hồi bằng tiếng Việt chuẩn mực, chuyên nghiệp và đúng 100% định dạng JSON Schema đã quy định.
`.trim();
};

/**
 * Mock/Fallback dữ liệu khi chưa có API Key hoặc khi Gemini API bị sự cố
 * Đảm bảo luồng nộp bài của hệ thống KHÔNG BAO GIỜ bị crash
 */
const getFallbackAdvice = (score, mistakenTopics = [], metadata = {}) => {
    const total = metadata.totalQuestions || (score + mistakenTopics.length) || 10;
    const isPerfect = !mistakenTopics || mistakenTopics.length === 0;
    const percentage = Math.round((score / total) * 100);

    let performanceLevel = 'NeedsImprovement';
    if (percentage >= 90) performanceLevel = 'Excellent';
    else if (percentage >= 70) performanceLevel = 'Good';
    else if (percentage >= 50) performanceLevel = 'Fair';

    const fallbackData = {
        summary: isPerfect
            ? `Xuất sắc! Bạn đã đạt ${score}/${total} điểm tuyệt đối. Kiến thức của bạn rất vững vàng.`
            : `Bạn đã đạt ${score}/${total} điểm (${percentage}%). Bạn có tiềm năng tốt nhưng cần củng cố lại các chủ đề còn sai sót.`,
        performanceLevel,
        strengths: isPerfect
            ? ['Nắm vững toàn diện lý thuyết và ứng dụng thực hành', 'Tư duy giải quyết câu hỏi chính xác']
            : ['Đã hoàn thành nghiêm túc bài thi', 'Nhận diện rõ ràng các chủ đề cần ôn tập thêm'],
        weaknesses: (mistakenTopics || []).map(topic => ({
            topic,
            diagnosis: `Chưa nắm chắc khái niệm nền tảng hoặc cú pháp chuyên sâu của "${topic}".`,
            action: `Đọc lại tài liệu chuyên đề "${topic}", xem ví dụ thực tế và làm thêm bài tập vận dụng.`
        })),
        roadmap: [
            {
                step: 1,
                phase: 'Giai đoạn 1: Ôn tập lỗ hổng kiến thức',
                description: mistakenTopics.length > 0
                    ? `Đọc lại tài liệu lý thuyết và làm lại câu hỏi về: ${mistakenTopics.slice(0, 3).join(', ')}.`
                    : 'Tìm hiểu các chủ đề nâng cao và tối ưu hóa kiến thức.',
                duration: '1 - 2 ngày'
            },
            {
                step: 2,
                phase: 'Giai đoạn 2: Luyện tập thực chiến',
                description: 'Làm lại một bài test mới để kiểm tra sự tiến bộ sau khi đã ôn tập.',
                duration: '2 - 3 ngày'
            }
        ],
        recommendedKeywords: mistakenTopics.length > 0 
            ? mistakenTopics 
            : ['Best Practices', 'Architecture Patterns', 'Optimization'],
        motivationalMessage: 'Học tập là một hành trình liên tục. Cải thiện từng lỗ hổng nhỏ sẽ giúp bạn tiến bộ vượt bậc!'
    };

    // Gắn toString để tương thích ngược khi Mongoose ép kiểu String trong attempt.model.js
    Object.defineProperty(fallbackData, 'toString', {
        value: function() { return JSON.stringify(this); },
        enumerable: false,
        writable: true,
        configurable: true
    });

    return fallbackData;
};

/**
 * Hàm phân tích kết quả bài thi qua Google Gemini API
 * @param {number} score - Số câu đúng của user
 * @param {Array<string>} mistakenTopics - Danh sách topic bị sai
 * @param {object} [metadata] - Metadata mở rộng (totalQuestions, subject, v.v.)
 * @returns {Promise<object>} Đối tượng lời khuyên và lộ trình học tập cá nhân hóa
 */
const getAdviceFromGemini = async (score, mistakenTopics = [], metadata = {}) => {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        
        // Kiểm tra an toàn: Nếu chưa cấu hình Key hoặc dùng placeholder thì trả fallback an toàn
        if (!apiKey || apiKey === 'your_gemini_api_key_here') {
            console.warn('⚠️ [TV3 AI Advice]: GEMINI_API_KEY chưa được cấu hình. Sử dụng chế độ phân tích dự phòng (Fallback).');
            return getFallbackAdvice(score, mistakenTopics, metadata);
        }

        const model = getGeminiModel();
        const prompt = buildPrompt({
            score,
            totalQuestions: metadata.totalQuestions,
            mistakenTopics,
            subject: metadata.subject
        });

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // Parse kết quả JSON trả về từ Gemini
        const parsedAdvice = JSON.parse(responseText);

        // Đảm bảo tương thích ngược 2-trong-1:
        // - Khi Express trả về qua res.json(), dữ liệu là JSON Object đầy đủ.
        // - Nếu TV2 lưu vào attempt.model.js (đang để type: String), Mongoose sẽ gọi toString()
        //   để lưu chuỗi JSON hợp lệ thay vì bị gán "[object Object]".
        Object.defineProperty(parsedAdvice, 'toString', {
            value: function() { return JSON.stringify(this); },
            enumerable: false,
            writable: true,
            configurable: true
        });

        return parsedAdvice;

    } catch (error) {
        console.error('❌ [TV3 AI Advice Error]: Lỗi khi gọi Gemini API:', error.message);
        // Trả về fallback có cấu trúc tương tự để frontend không bị vỡ giao diện
        return getFallbackAdvice(score, mistakenTopics, metadata);
    }
};

module.exports = {
    getAdviceFromGemini,
    getFallbackAdvice,
    buildPrompt
};
