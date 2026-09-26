# 📄 Báo Cáo Triển Khai Module AI (TV3) — ScoreUp AI Learning Advisor

> **Người thực hiện**: Thành viên 3 (AI Integration & Prompt Engineering)  
> **Dự án**: ScoreUp — Nền tảng thi trắc nghiệm có AI phân tích năng lực và gợi ý lộ trình học  
> **Thời gian thực hiện**: 27/09/2026  
> **Trạng thái**: Hoàn thành & Đã kiểm thử nội bộ thành công  

---

## 1. Tóm tắt Nhiệm vụ được giao (Scope of Work)

Theo phân công trong `README.md`, TV3 phụ trách:
1. **Kết nối API AI**: Tích hợp Google Gemini API sử dụng gói miễn phí (Free Tier: `gemini-1.5-flash`).
2. **Prompt Engineering**: Thiết kế System Prompt và User Prompt động tiếp nhận kết quả làm bài của học viên (điểm số, số câu hỏi, các chủ đề bị trả lời sai).
3. **Structured Output (Ép chuẩn JSON)**: Sử dụng cơ chế `responseSchema` để đảm bảo Gemini trả về 100% định dạng JSON hợp lệ, tuyệt đối không bị dính các ký tự markdown rác làm hỏng việc parse dữ liệu ở Frontend.
4. **Resilience & Fallback**: Xây dựng cơ chế dự phòng an toàn (Fallback) khi API gặp sự cố mạng hoặc chưa gắn API Key, bảo đảm luồng nộp bài của hệ thống không bao giờ bị crash.
5. **Đảm bảo tính độc lập**: Hạn chế tối đa việc sửa đổi mã nguồn của các thành viên khác (TV1, TV2, TV4).

---

## 2. Chi tiết các công việc đã thực hiện

### 2.1. Cài đặt thư viện AI
Đã cài đặt gói thư viện chính thức của Google Gemini trong thư mục `backend`:
```bash
npm install @google/generative-ai
```
- **Phiên bản cài đặt**: `^0.24.1` (Hỗ trợ native JSON Schema và Gemini 1.5 Flash).

### 2.2. Tạo file cấu hình môi trường mẫu
Tạo file [`backend/.env.example`](file:///C:/Users/FPTSHOP/Documents/GitHub/QuizMaker/backend/.env.example) để các thành viên trong nhóm dễ dàng thiết lập môi trường:
```env
PORT=3001
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/scoreup
JWT_SECRET=your_jwt_secret_key_here

# Cấu hình Google Gemini AI (Miễn phí từ Google AI Studio: https://aistudio.google.com/)
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-1.5-flash
```

### 2.3. Hoàn thiện Module AI ([`backend/src/modules/ai/ai.service.js`](file:///C:/Users/FPTSHOP/Documents/GitHub/QuizMaker/backend/src/modules/ai/ai.service.js))

Module được xây dựng với các tính năng kỹ thuật nâng cao:

1. **Structured Outputs qua `responseSchema`**:
   Định nghĩa chặt chẽ kiểu dữ liệu cho từng trường:
   - `summary` (String): Nhận định súc tích về bài làm.
   - `performanceLevel` (Enum: `NeedsImprovement`, `Fair`, `Good`, `Excellent`): Phân loại xếp hạng học lực.
   - `strengths` (Array of Strings): Điểm mạnh hoặc phần kiến thức đã nắm vững.
   - `weaknesses` (Array of Objects): Chi tiết từng chủ đề bị sai:
     - `topic`: Tên chủ đề.
     - `diagnosis`: Nguyên nhân học viên hay hiểu nhầm.
     - `action`: Cách khắc phục cụ thể.
   - `roadmap` (Array of Objects): Lộ trình học 2-3 giai đoạn cá nhân hóa:
     - `step`: Thứ tự (1, 2, 3...).
     - `phase`: Tiêu đề giai đoạn (ví dụ: Bước 1: Ôn tập nền tảng).
     - `description`: Nội dung hành động.
     - `duration`: Thời gian ước tính (ví dụ: 1-2 ngày).
   - `recommendedKeywords` (Array of Strings): Từ khóa kỹ thuật để tra cứu tài liệu học tập chính thống.
   - `motivationalMessage` (String): Lời khuyên/động viên tích cực.

2. **Kỹ thuật tương thích ngược 2-trong-1 (Zero-breaking change)**:
   - Trong `attempt.model.js` của TV2, trường `ai_advice` đang định nghĩa dạng `type: String`.
   - Nếu trả về Javascript Object thuần, Mongoose sẽ tự động ép kiểu thành chuỗi `"[object Object]"` gây mất dữ liệu.
   - **Giải pháp của TV3**: Định nghĩa phương thức ẩn `toString()` trả về `JSON.stringify(this)`. Nhờ đó:
     - Khi TV2 lưu vào MongoDB: Mongoose tự gọi `toString()` ➡️ Lưu đúng chuỗi JSON hoàn chỉnh.
     - Khi Express gửi kết quả về Frontend: `res.json()` serialize bình thường ➡️ Frontend nhận được Object JSON có cấu trúc rõ ràng.
     - **Không cần sửa đổi bất kỳ dòng code nào của TV2!**

3. **Cơ chế Fallback thông minh**:
   - Tự động phát hiện khi chưa cấu hình `GEMINI_API_KEY` hoặc khi mất mạng, hạn mức API bị đầy.
   - Sinh dữ liệu phân tích chuẩn theo schema để giao diện người dùng không bị vỡ và không phát sinh lỗi 500.

4. **Kiểm thử nội bộ ([`backend/src/modules/ai/ai.test.js`](file:///C:/Users/FPTSHOP/Documents/GitHub/QuizMaker/backend/src/modules/ai/ai.test.js))**:
   - Đã chạy kiểm thử độc lập cho cả 2 kịch bản:
     - Làm sai nhiều chủ đề ➡️ Trả về chẩn đoán và lộ trình chi tiết.
     - Làm đúng 100% (0 câu sai) ➡️ Đánh giá xuất sắc, lộ trình nâng cao.
   - Kết quả test: **PASS 100%**.

---

## 3. Báo cáo phối hợp liên thành viên (Cross-Team Alignment)

### 3.1. Đối với TV2 (Backend Core)
Mã nguồn của TV3 đã tương thích hoàn toàn với cách gọi hiện tại của TV2:
```javascript
// quiz.service.js (Dòng 30)
const aiAdvice = await aiService.getAdviceFromGemini(score, uniqueMistakenTopics);
```
Tuy nhiên, để chất lượng phân tích của AI cao nhất, đề xuất TV2 bổ sung thêm tham số thứ 3 (không bắt buộc):
```javascript
const aiAdvice = await aiService.getAdviceFromGemini(score, uniqueMistakenTopics, {
    totalQuestions: totalQuestions,
    subject: "ReactJS" // Tên môn học nếu có
});
```
*Tùy chọn*: TV2 có thể cập nhật `attempt.model.js` từ `type: String` sang `type: mongoose.Schema.Types.Mixed` để MongoDB lưu trực tiếp BSON Object.

### 3.2. Đối với TV1 (Frontend)
Khi nhận được `ai_advice` từ API nộp bài (`POST /api/quiz/submit`), TV1 có thể map dữ liệu trực tiếp:
- `result.ai_advice.summary`: Hiển thị ở thẻ đánh giá đầu trang.
- `result.ai_advice.weaknesses.map(...)`: Render danh sách lỗi sai và cách khắc phục.
- `result.ai_advice.roadmap.map(...)`: Render Timeline/Roadmap các bước cần làm.
- `result.ai_advice.recommendedKeywords.map(...)`: Render các thẻ tag từ khóa để người dùng click tìm kiếm.

### 3.3. Đối với TV4 (Data & QA)
- TV4 cần đảm bảo các câu hỏi trong ngân hàng câu hỏi đều có trường `topic` mang tính cụ thể (Ví dụ: thay vì đặt topic chung chung là `"Lập trình"`, hãy đặt là `"Vòng lặp For"`, `"React useState"`, `"SQL JOIN"`). Điều này giúp AI phân tích chính xác tuyệt đối.

---

## 4. Hướng dẫn chạy thử nghiệm thực tế với Gemini API Key

1. Đăng nhập vào [Google AI Studio](https://aistudio.google.com/) để lấy API Key miễn phí.
2. Tạo file `backend/.env` với nội dung:
   ```env
   PORT=3001
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=super_secret_jwt_key
   GEMINI_API_KEY=AIzaSy...điền_key_vào_đây...
   GEMINI_MODEL=gemini-1.5-flash
   ```
3. Chạy test thử nghiệm:
   ```bash
   node backend/src/modules/ai/ai.test.js
   ```
4. Khởi động backend:
   ```bash
   cd backend
   npm run dev
   ```
