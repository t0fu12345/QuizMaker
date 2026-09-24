# 📋 Phân Chia Đầu Việc — ScoreUp AI Learning Advisor (Mini-Project)

> **Dự án**: ScoreUp — Thêm tính năng ghi lại lịch sử làm bài và nhận gợi ý học tập từ AI
> **Quy mô**: Mini-project sinh viên · 4 thành viên
> **Tech stack**: React (Frontend) · Node.js + Express (Backend) · Gemini API (AI)

---

## Chi tiết các Nghiệp vụ Cốt lõi

**1. Nghiệp vụ Quản lý Tri thức (Knowledge Base)**
Đây là khâu chuẩn bị dữ liệu đầu vào. AI không thể hoạt động nếu thiếu siêu dữ liệu (Metadata).
- **Gắn thẻ (Data Tagging)**: Gắn các Tag (Chủ đề kiến thức, Kỹ năng) cho từng câu hỏi.
- **Quản lý Câu hỏi (Question CRUD)**: Thêm, sửa, xóa nội dung câu hỏi.
- **Tự động cân bằng độ khó (Auto-Calibration)**: Hệ thống backend định kỳ tính toán lại tỷ lệ trả lời đúng (Pass Rate) của tất cả người dùng để tự động gán lại mức độ khó (Dễ/Trung bình/Khó) cho từng câu hỏi, thay vì gán cứng bằng tay.

**2. Nghiệp vụ Tracking & Thu thập hành vi (Frontend Core)**
Đây là nghiệp vụ diễn ra trong lúc người dùng đang làm bài, biến Frontend thành một "cảm biến" thu thập dữ liệu sạch.
- **Đo lường thời gian thực (Active Time Tracking)**: Bắt đầu/Tạm dừng bộ đếm giây cho từng câu hỏi độc lập khi người dùng thao tác.
- **Chống nhiễu dữ liệu (Anti-cheat/Focus Tracking)**: Bắt sự kiện chuyển tab trình duyệt hoặc thu nhỏ cửa sổ để tạm dừng tính giờ, đảm bảo số giây thu thập là thời gian thực sự "động não".
- **Đóng gói Payload nộp bài**: Gom toàn bộ mảng Dữ liệu trả lời (ID câu hỏi, Đáp án chọn) + Thời gian làm từng câu gửi lên Backend.

**3. Nghiệp vụ Chuẩn hóa & Tổng hợp năng lực (Backend Core)**
Nghiệp vụ này chạy ngầm sau khi user nộp bài để biến dữ liệu thô thành "Hồ sơ năng lực".
- **Lọc dữ liệu rác (Sanitization/Outlier Detection)**: Backend loại bỏ các khoảng thời gian treo máy (quá dài) hoặc đánh lụi (quá ngắn) trước khi lưu vào DB.
- **Chấm điểm (Scoring)**: So sánh đáp án, tính tổng điểm bài thi và lưu chi tiết từng câu vào log (Attempt_Logs).
- **Tổng hợp theo Chủ đề (Data Aggregation)**: Gom nhóm các câu hỏi theo Tag, tính toán lại Tỷ lệ đúng (%) và Tốc độ trung bình, sau đó cập nhật vào bảng hồ sơ năng lực (User_Progress).

**4. Nghiệp vụ AI & Cá nhân hóa Lộ trình (AI Integration)**
Đây là chặng cuối, nơi AI phát huy tác dụng dựa trên dữ liệu đã được tổng hợp.
- **Đóng gói Context (Prompt Engineering)**: Backend lấy dữ liệu từ bảng hồ sơ năng lực (User_Progress), format thành chuỗi JSON tinh gọn (Gồm: Điểm mạnh, Điểm yếu) để làm đầu vào cho LLM.
- **Gọi API Khởi tạo Lộ trình (LLM Generation)**: Gửi Prompt đến OpenAI/Gemini để yêu cầu sinh ra lời nhận xét và lộ trình học 3-5 bước dưới định dạng JSON chuẩn.
- **Hiển thị (Rendering)**: Frontend parse cục JSON từ AI để vẽ lên giao diện trực quan (Timeline các việc cần làm, Biểu đồ Radar so sánh các kỹ năng).

---

## Tổng quan luồng hoạt động

```
Người dùng làm bài (TV1)
        ↓  gửi kết quả bài thi
Backend nhận & lưu log (TV2)
        ↓  đọc lịch sử làm bài
AI phân tích & gợi ý (TV3)
        ↓  trả kết quả về
Hiển thị gợi ý cho người dùng (TV1)
```

---

## 👤 TV1 — Frontend (React)

**Mục tiêu**: Ghi lại thời gian làm bài và hiển thị gợi ý từ AI sau khi nộp bài.

| # | Việc cần làm | Chi tiết | File |
|:---:|:---|:---|:---|
| 1 | **Đo thời gian mỗi câu** | Dùng `Date.now()` ghi lại thời điểm khi user bắt đầu chọn đáp án cho câu nào. Khi chuyển sang câu khác thì tính hiệu để ra số giây đã dành cho câu đó. | `QuizView.jsx` |
| 2 | **Đóng gói dữ liệu nộp bài** | Khi bấm "Nộp bài", tạo object gửi lên server gồm: `userId`, `subjectId`, và mảng `answers` trong đó mỗi phần tử có `question_id`, `selected` (đáp án chọn), `time_spent` (số giây). | `QuizView.jsx` |
| 3 | **Gọi API nộp bài** | Dùng `fetch` POST lên `http://localhost:3001/api/submit`. Nhận về `{ score, attemptId }` để hiển thị điểm ngay. Sau đó gọi thêm `GET /api/advice?userId=...` để lấy gợi ý từ AI. | `QuizView.jsx` |
| 4 | **Hiển thị kết quả AI** | Sau khi có response từ API gợi ý: hiển thị điểm số + một đoạn text ngắn từ AI (ví dụ: "Bạn đang yếu ở phần Event Loop — nên đọc lại Session 7"). Có nút "Làm lại" để thử bài mới. | `QuizView.jsx` |
| 5 | **Tạo Guest ID** | Khi app chạy lần đầu, kiểm tra `localStorage` xem đã có `user_id` chưa. Nếu chưa thì tạo một ID ngẫu nhiên và lưu lại để dùng cho các lần tiếp theo. | `App.jsx` hoặc `main.jsx` |

**Lưu ý**: Tạm thời hiển thị thông báo `"AI đang phân tích..."` trong khi chờ response (~2–3 giây).

---

## 👤 TV2 — Backend (Node.js + Express)

**Mục tiêu**: Dựng server tiếp nhận kết quả bài thi, lưu vào file, và cung cấp dữ liệu cho AI phân tích.

| # | Việc cần làm | Chi tiết | File |
|:---:|:---|:---|:---|
| 1 | **Khởi tạo project Node.js** | Tạo thư mục `quiz-backend/`. Chạy `npm init`. Cài `express` và `cors`. Tạo file `app.js` làm entry point, chạy trên port `3001`. | `app.js` |
| 2 | **API nhận bài thi** | Tạo route `POST /api/submit`. Nhận payload từ TV1, đối chiếu đáp án đúng (đọc từ file JSON câu hỏi), tính điểm, rồi ghi kết quả vào file log. Trả về `{ score, attemptId }`. | `routes/submit.js` |
| 3 | **Ghi log vào file** | Dùng `fs.appendFile` để ghi mỗi lượt thi thành **một dòng JSON** vào file `logs/attempts.jsonl`. Mỗi dòng lưu: `userId`, `subjectId`, `timestamp`, `score`, `answers[]` (gồm `question_id`, `is_correct`, `time_spent`). | `services/logService.js` |
| 4 | **Đọc lịch sử của user** | Viết hàm `getRecentAttempts(userId, limit)`: đọc file `.jsonl`, lọc theo `userId`, lấy `limit` dòng gần nhất. Cung cấp cho TV3 dùng để gọi AI. | `services/logService.js` |
| 5 | **API trả gợi ý AI** | Tạo route `GET /api/advice?userId=...`. Gọi hàm đọc lịch sử (Task 4), rồi chuyển sang gọi module AI của TV3, nhận về text gợi ý và trả về cho TV1. | `routes/advice.js` |

**Cấu trúc thư mục**:
```
quiz-backend/
├── app.js
├── package.json
├── logs/
│   └── attempts.jsonl
├── routes/
│   ├── submit.js
│   └── advice.js
└── services/
    └── logService.js
```

---

## 👤 TV3 — AI Integration (Gemini API)

**Mục tiêu**: Đọc lịch sử làm bài của user, gọi Gemini API để tạo gợi ý học tập cá nhân hóa.

| # | Việc cần làm | Chi tiết | File |
|:---:|:---|:---|:---|
| 1 | **Tóm tắt lịch sử làm bài** | Nhận mảng lịch sử từ TV2. Tính: tổng số câu đúng/sai theo từng môn/chủ đề, điểm trung bình qua các lần, những câu hay sai nhất. Đây là dữ liệu đầu vào cho AI. | `services/aiAdvisor.js` |
| 2 | **Kết nối Gemini API** | Cài `@google/generative-ai`. Khởi tạo client với API key từ file `.env`. Dùng model `gemini-2.0-flash`. | `services/aiAdvisor.js` |
| 3 | **Tạo Prompt gửi AI** | Viết hàm `buildPrompt(summary)`: chuyển dữ liệu tóm tắt thành đoạn text mô tả tình trạng học của user. Yêu cầu AI trả về gợi ý ngắn gọn trong khoảng 3–5 câu bằng tiếng Việt. **Không gửi điểm số thô** — cần gửi phân tích theo từng chủ đề. | `services/aiAdvisor.js` |
| 4 | **Gọi AI và lấy kết quả** | Gọi `model.generateContent(prompt)`. Xử lý trường hợp lỗi (API timeout, trả về text rỗng). Nếu lỗi thì trả về một câu gợi ý mặc định thay vì crash server. | `services/aiAdvisor.js` |
| 5 | **Export hàm cho TV2 dùng** | Export hàm `getAdvice(recentAttempts)` nhận vào mảng lịch sử, trả về chuỗi text gợi ý. TV2 sẽ gọi hàm này trong route `/api/advice`. | `services/aiAdvisor.js` |

**Ví dụ Prompt đơn giản**:
```
Bạn là trợ lý học tập. Dưới đây là kết quả làm bài trắc nghiệm của một sinh viên:
- Môn: Node.js & AI
- 3 lần làm gần nhất: 5/10, 6/10, 6/10
- Hay sai nhất: các câu về Event Loop và Async/Await

Hãy đưa ra 3 gợi ý ngắn gọn để cải thiện, bằng tiếng Việt.
```

---

## 👤 TV4 — Data & Testing

**Mục tiêu**: Chuẩn bị dữ liệu câu hỏi, hỗ trợ test hệ thống, và viết hướng dẫn chạy project.

| # | Việc cần làm | Chi tiết | File |
|:---:|:---|:---|:---|
| 1 | **Thêm tag chủ đề cho câu hỏi** | Mở các file `*.json` trong `database/questions/`. Thêm field `topic` cho mỗi câu (ví dụ: `"topic": "Event Loop"`, `"topic": "Express Middleware"`). TV2 sẽ dùng field này khi ghi log để phân loại câu đúng/sai theo chủ đề. | `database/questions/*.json` |
| 2 | **Tạo file câu hỏi môn mới** | Tạo file `nodejs_ai_questions.json` cho môn **Node.js & AI** (từ tài liệu `modern-server-side-development-nodejs-ai.md`). Tạo tối thiểu 20 câu, bao phủ các Session 1–10. Dùng đúng schema: `{ id, question, options[], answer, topic }`. | `database/questions/nodejs_ai_questions.json` |
| 3 | **Đăng ký môn học mới** | Mở `FilterModal.jsx` thêm `{ id: 'nodejs_ai', name: 'Node.js & AI' }` vào mảng `SUBJECTS`. Mở `PracticeDashboard.jsx` thêm case `'nodejs_ai'` vào hàm `fetchQuestionsData`. | `FilterModal.jsx`, `PracticeDashboard.jsx` |
| 4 | **Test thủ công toàn bộ luồng** | Chạy Frontend và Backend đồng thời. Làm một bài test thực tế, kiểm tra: (1) File `attempts.jsonl` có ghi đúng không, (2) API `/api/advice` có trả về text gợi ý từ AI không, (3) Giao diện hiển thị đúng không. Ghi lại lỗi tìm được. | Tài liệu test |
| 5 | **Viết README hướng dẫn chạy** | Viết file `README_SETUP.md` hướng dẫn cách cài và chạy cả Frontend lẫn Backend để các thành viên trong nhóm không bị mắc kẹt ở bước cài đặt. | `README_SETUP.md` |

---

## 🔗 Điểm kết nối giữa các thành viên

| Kết nối | Ai gửi | Ai nhận | Nội dung |
|:---|:---:|:---:|:---|
| Nộp bài thi | TV1 | TV2 | `POST /api/submit` với `{ userId, subjectId, answers[] }` |
| Kết quả & điểm | TV2 | TV1 | `{ score, attemptId }` |
| Dữ liệu lịch sử | TV2 | TV3 | Mảng các lần thi gần nhất của user (gọi nội bộ) |
| Text gợi ý AI | TV3 | TV2 | Chuỗi text gợi ý để TV2 trả về cho TV1 |
| Gợi ý hiển thị | TV2 | TV1 | `GET /api/advice` → `{ advice: "..." }` |
| Metadata câu hỏi | TV4 | TV2 | Field `topic` trong file `questions/*.json` (dùng khi ghi log) |
| Môn học mới | TV4 | TV1 | File `nodejs_ai_questions.json` + cập nhật `FilterModal.jsx` |

---

## 📅 Gợi ý tiến độ (2 tuần)

| Tuần | TV1 | TV2 | TV3 | TV4 |
|:---:|:---|:---|:---|:---|
| **Tuần 1** | Task 1, 2, 5 (đo giờ + gói payload + Guest ID) | Task 1, 2, 3 (khởi tạo server + API submit + ghi log) | Task 1, 2 (tóm tắt log + kết nối Gemini) | Task 1, 2 (gán tag câu hỏi + tạo file môn mới) |
| **Tuần 2** | Task 3, 4 (gọi API + hiển thị kết quả AI) | Task 4, 5 (đọc lịch sử + API advice) | Task 3, 4, 5 (viết prompt + gọi AI + export hàm) | Task 3, 4, 5 (đăng ký môn học + test + README) |
