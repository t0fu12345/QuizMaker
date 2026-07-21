# ScoreUp - Quiz Maker & Practice Dashboard 🚀

![ScoreUp Banner](https://github.com/t0fu12345/QuizMaker/blob/main/stitch/screen.png?raw=true)

> **ScoreUp** là nền tảng luyện tập trắc nghiệm và ôn luyện kiến thức, được thiết kế với giao diện Dark Mode tối giản, hiện đại (Glassmorphism) nhằm mang lại trải nghiệm học tập tập trung nhất.

## 🌍 Xem Trực Tiếp (Live Demo)
Trang web đang được tự động triển khai bằng GitHub Pages. Bạn có thể xem kết quả trực tiếp tại đây:
👉 **[Truy cập ScoreUp Live Demo](https://t0fu12345.github.io/QuizMaker/)**

---

## 🛠 Công Nghệ Sử Dụng
Dự án được xây dựng dựa trên các công nghệ hiện đại nhất dành cho Web:
- **[React 19](https://react.dev/)**: Thư viện UI cốt lõi.
- **[Vite](https://vitejs.dev/)**: Trình đóng gói (bundler) cực nhanh.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: CSS Framework được thiết lập chuẩn xác để tạo ra giao diện Glassmorphism mượt mà.
- **[React Router v7](https://reactrouter.com/)**: Xử lý điều hướng đa trang (SPA).
- **[Lucide React](https://lucide.dev/)**: Hệ thống icon vector tối giản.
- **GitHub Actions**: Tự động hóa quá trình Build & Deploy lên GitHub Pages.

## 📁 Cấu Trúc Dự Án
- `quiz-maker/`: Mã nguồn chính của ứng dụng web React.
  - `src/components/`: Chứa các mảnh ghép giao diện (Header, Sidebar, HeroBanner, FilterCard,...).
  - `src/layouts/`: Bố cục trang tổng quát của Dashboard.
  - `src/pages/`: Các trang chính như Luyện tập (PracticeDashboard).
  - `database/`: Chứa dữ liệu JSON trích xuất tự động từ các tài liệu môn học (PDF) thông qua AI.
- `stitch/`: Chứa các tài nguyên thiết kế ban đầu (`DESIGN.md`, `screen.png`).

## 🚀 Chạy Chế Độ Phát Triển (Local Development)

Nếu bạn muốn chạy dự án này trên máy tính cá nhân:

1. Đảm bảo bạn đã cài đặt [Node.js](https://nodejs.org/).
2. Sao chép (clone) kho chứa này về máy:
   ```bash
   git clone https://github.com/t0fu12345/QuizMaker.git
   ```
3. Di chuyển vào thư mục dự án và cài đặt thư viện:
   ```bash
   cd QuizMaker/quiz-maker
   npm install
   ```
4. Khởi động server lập trình:
   ```bash
   npm run dev
   ```
5. Mở trình duyệt tại đường dẫn `http://localhost:5173`.

---
*Được phát triển tự động kết hợp với AI Agent từ thiết kế UI ban đầu.*
