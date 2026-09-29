import { fetchApi } from './api';

/**
 * Lấy thông tin user hiện tại từ LocalStorage
 * (Lưu ý: Token JWT thực sự nằm ở HTTP-Only Cookie, ta chỉ lưu thông tin user ở LocalStorage để hiển thị UI)
 */
export const getCurrentUser = () => {
  try {
    const localUserRaw = localStorage.getItem('scoreup_current_user');
    if (localUserRaw) {
      return JSON.parse(localUserRaw);
    }
  } catch {
    // fallback
  }
  return null;
};

/**
 * Đăng nhập: Gọi API thật của Backend
 */
export const loginUser = async (identifier, password) => {
  try {
    const trimmedId = identifier.trim();
    
    // Gọi API Backend
    const data = await fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username: trimmedId, password })
    });

    // Backend trả về data.user, ta cần gắn thêm stats ảo để UI (Dashboard) không bị lỗi
    // vì Backend hiện tại chỉ lưu username, chưa lưu thống kê (stats).
    const userToSave = {
      ...data.user,
      displayName: data.user.username,
      stats: {
        completedQuizzes: 0,
        correctRate: 0,
        streakDays: 1,
        history: []
      }
    };

    localStorage.setItem('scoreup_current_user', JSON.stringify(userToSave));
    localStorage.setItem('userId', userToSave.username);

    return {
      success: true,
      user: userToSave
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || error.error || 'Sai tên đăng nhập hoặc mật khẩu.'
    };
  }
};

/**
 * Đăng ký: Gọi API thật của Backend, sau đó tự động Đăng nhập
 */
export const registerUser = async ({ username, email, password, displayName }) => {
  try {
    const trimmedUsername = username.trim();
    
    // 1. Gọi API Đăng ký
    await fetchApi('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username: trimmedUsername, password })
    });

    // 2. Tự động Đăng nhập luôn để lấy Cookie Token
    const loginResult = await loginUser(trimmedUsername, password);
    if (loginResult.success) {
      return loginResult;
    } else {
      throw new Error("Đăng ký thành công nhưng tự động đăng nhập thất bại.");
    }
  } catch (error) {
    return {
      success: false,
      message: error.message || error.error || 'Tên đăng nhập này có thể đã tồn tại.'
    };
  }
};

/**
 * Đăng xuất: Gọi API xóa Cookie và xóa LocalStorage
 */
export const clearCurrentUserSession = async () => {
  try {
    await fetchApi('/auth/logout', { method: 'POST' });
  } catch (err) {
    console.error("Lỗi khi đăng xuất backend:", err);
  } finally {
    localStorage.removeItem('scoreup_current_user');
    localStorage.setItem('userId', 'guest_' + Date.now().toString(36));
  }
};

/**
 * Hàm tạm thời (Mock) để UI Dashboard không bị sập trước khi làm Giai đoạn 4
 */
export const recordQuizForCurrentUser = ({ subject, score, totalQuestions, correctCount }) => {
  const currentUser = getCurrentUser();
  if (!currentUser) return;
  
  if (!currentUser.stats) {
    currentUser.stats = { completedQuizzes: 0, correctRate: 0, streakDays: 1, history: [] };
  }

  const prevCompleted = currentUser.stats.completedQuizzes || 0;
  const newCompleted = prevCompleted + 1;
  const currentRate = currentUser.stats.correctRate || 0;
  const thisRate = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const newAvgRate = Math.round((currentRate * prevCompleted + thisRate) / newCompleted);
  const today = new Date().toISOString().split('T')[0];

  currentUser.stats.completedQuizzes = newCompleted;
  currentUser.stats.correctRate = newAvgRate;
  
  if (!Array.isArray(currentUser.stats.history)) {
    currentUser.stats.history = [];
  }

  currentUser.stats.history.unshift({
    subject: subject || 'Luyện đề',
    score: score,
    rate: thisRate,
    totalQuestions,
    correctCount,
    date: today
  });

  localStorage.setItem('scoreup_current_user', JSON.stringify(currentUser));
};
