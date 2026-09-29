import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';
import MainDashboard from './pages/MainDashboard';
import PracticeDashboard from './pages/PracticeDashboard';
import ComingSoonPage from './pages/ComingSoonPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import VerifyOTP from './pages/auth/VerifyOTP';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="verify-otp" element={<VerifyOTP />} />
        </Route>
        
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<MainDashboard />} />
          <Route path="practice" element={<PracticeDashboard />} />
          
          {/* General Placeholder routes */}
          <Route 
            path="leaderboard" 
            element={
              <ComingSoonPage 
                title="Bảng Xếp Hạng Học Viên" 
                subtitle="Vinh danh những học viên có chuỗi ngày học tập và điểm số ấn tượng nhất trên toàn hệ thống."
                icon="Trophy"
                badge="SẮP RA MẮT"
                features={[
                  "Bảng xếp hạng theo Tuần & Tháng",
                  "Huy hiệu thành tích & Danh hiệu học tập",
                  "Thi đua thành tích cùng bạn bè và nhóm học tập",
                  "Phần thưởng tích lũy kinh nghiệm mỗi ngày"
                ]}
              />
            } 
          />
          <Route 
            path="hints" 
            element={
              <ComingSoonPage 
                title="Gợi Ý & Mẹo Làm Bài" 
                subtitle="Kho tàng bí quyết, phương pháp giải nhanh và mẹo ghi nhớ kiến thức trọng tâm."
                icon="Lightbulb"
                badge="SẮP RA MẮT"
                features={[
                  "Giải thích chi tiết phương pháp làm từng dạng đề",
                  "Tổng hợp công thức & khái niệm cốt lõi theo từng môn",
                  "Gợi ý AI phân tích và khắc phục điểm yếu của bạn",
                  "Thư viện mẹo nhớ nhanh cho lập trình viên"
                ]}
              />
            } 
          />
          <Route 
            path="exam" 
            element={
              <ComingSoonPage 
                title="Phòng Thi Mô Phỏng" 
                subtitle="Trải nghiệm làm bài thi chuẩn cấu trúc với áp lực thời gian thực tế."
                icon="PenTool"
                badge="SẮP RA MẮT"
                features={[
                  "Đề thi chuẩn cấu trúc với đồng hồ đếm ngược",
                  "Cơ chế tự động thu bài khi hết thời gian",
                  "Chấm điểm tức thì và phân tích năng lực chi tiết",
                  "Chứng nhận kết quả thi đạt chuẩn ScoreUp"
                ]}
              />
            } 
          />
          <Route 
            path="studio" 
            element={
              <ComingSoonPage 
                title="ScoreUp Studio" 
                subtitle="Không gian sáng tạo và tùy biến các bộ đề cá nhân hóa theo phong cách của riêng bạn."
                icon="Sparkles"
                badge="BETA"
                features={[
                  "Tự tạo bộ câu hỏi thẻ ghi nhớ (Flashcards)",
                  "Chia sẻ bộ đề ôn tập cùng cộng đồng",
                  "Trợ lý AI tạo câu hỏi từ bài giảng và tài liệu",
                  "Tùy chỉnh giao diện làm bài theo sở thích"
                ]}
              />
            } 
          />

          {/* Admin Exclusive routes */}
          <Route 
            path="admin/students" 
            element={
              <ComingSoonPage 
                title="Giám Sát Học Viên (Students Monitor)" 
                subtitle="Theo dõi tiến độ, hoạt động trực tuyến và hiệu suất làm bài của học viên theo thời gian thực."
                icon="Users"
                badge="ADMIN EXCLUSIVE"
                isAdminOnly={true}
                features={[
                  "Theo dõi trực tuyến các phiên làm bài của thí sinh",
                  "Phát hiện rời màn hình và cảnh báo gian lận thi cử",
                  "Lịch sử chi tiết tất cả các lượt làm bài của từng học viên",
                  "Gửi thông báo & nhắc nhở trực tiếp tới học viên"
                ]}
              />
            } 
          />
          <Route 
            path="admin/questions" 
            element={
              <ComingSoonPage 
                title="Ngân Hàng Câu Hỏi & Đề Thi (CRUD)" 
                subtitle="Hệ thống tạo mới, chỉnh sửa, xóa và quản trị ngân hàng câu hỏi đa dạng chủ đề."
                icon="Database"
                badge="CRUD SYSTEM"
                isAdminOnly={true}
                features={[
                  "Thêm, sửa, xóa câu hỏi trắc nghiệm (Single/Multi-choice)",
                  "Phân loại theo môn học (React, JavaScript, HTML, CSS)",
                  "Tạo đáp án kèm giải thích chi tiết & hình ảnh minh họa",
                  "Chế độ Xem Trước (Live Preview) câu hỏi trước khi xuất bản"
                ]}
              />
            } 
          />
          <Route 
            path="admin/analytics" 
            element={
              <ComingSoonPage 
                title="Thống Kê & Báo Cáo Chuyên Sâu" 
                subtitle="Tổng hợp dữ liệu học tập, tỷ lệ chính xác và phân tích biểu đồ tiến độ toàn diện."
                icon="TrendingUp"
                badge="ADMIN ANALYTICS"
                isAdminOnly={true}
                features={[
                  "Biểu đồ phân bố điểm số và xếp loại thí sinh",
                  "Thống kê những câu hỏi có tỷ lệ sai nhiều nhất",
                  "Báo cáo thời gian trung bình hoàn thành mỗi đề",
                  "Xuất báo cáo PDF & Excel định kỳ cho giảng viên"
                ]}
              />
            } 
          />
          <Route 
            path="admin/exams" 
            element={
              <ComingSoonPage 
                title="Quản Lý Kỳ Thi & Phòng Thi" 
                subtitle="Lên lịch tổ chức kỳ thi, quản lý mã truy cập phòng thi và thời gian làm bài."
                icon="ShieldCheck"
                badge="EXAM CONTROL"
                isAdminOnly={true}
                features={[
                  "Tạo phòng thi với mã PIN và mật khẩu riêng biệt",
                  "Hẹn giờ tự động mở đề thi và đóng nộp bài",
                  "Phân bổ danh sách học viên theo phòng thi",
                  "Tùy chọn xáo trộn ngẫu nhiên đề & thứ tự đáp án"
                ]}
              />
            } 
          />
          <Route 
            path="admin/import-export" 
            element={
              <ComingSoonPage 
                title="Nhập / Xuất Dữ Liệu Toàn Diện" 
                subtitle="Sao lưu dữ liệu đề thi, danh sách học viên và bảng điểm nhanh chóng qua file Excel/JSON."
                icon="ArrowUpDown"
                badge="DATA SYNC"
                isAdminOnly={true}
                features={[
                  "Nhập ngân hàng câu hỏi hàng loạt từ file Excel (.xlsx, .csv)",
                  "Xuất toàn bộ bảng điểm học viên sang Excel",
                  "Sao lưu (Backup) cơ sở dữ liệu đề thi hệ thống",
                  "Đồng bộ kết quả sang Google Sheets / LMS trường học"
                ]}
              />
            } 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
