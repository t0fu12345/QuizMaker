import { DEV_ADMIN_ACCOUNTS, isAdminReserved, getDevAdmin } from '../config/adminRegistry';

// Cookie Helpers
export const setCookie = (name, value, days = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
};

export const getCookie = (name) => {
  const matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'));
  return matches ? decodeURIComponent(matches[1]) : null;
};

export const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
};

// Default registered student accounts
const DEFAULT_STUDENT_ACCOUNTS = [
  {
    username: 'scoreup_learner',
    email: 'exam_taker@scoreup.edu.vn',
    password: 'Password123!',
    displayName: 'Học Viên Tiêu Biểu',
    role: 'student',
    createdAt: new Date('2025-01-10').toISOString(),
    stats: {
      completedQuizzes: 14,
      correctRate: 85,
      streakDays: 5,
      history: [
        { subject: 'ReactJS', score: 90, date: '2025-09-24' },
        { subject: 'HTML5/CSS3', score: 80, date: '2025-09-25' }
      ]
    }
  }
];

export const getStoredUsers = () => {
  try {
    const raw = localStorage.getItem('scoreup_accounts');
    if (!raw) {
      localStorage.setItem('scoreup_accounts', JSON.stringify(DEFAULT_STUDENT_ACCOUNTS));
      return DEFAULT_STUDENT_ACCOUNTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_STUDENT_ACCOUNTS;
  } catch {
    return DEFAULT_STUDENT_ACCOUNTS;
  }
};

export const saveStoredUsers = (users) => {
  localStorage.setItem('scoreup_accounts', JSON.stringify(users));
};

export const getCurrentUser = () => {
  // Check cookie first
  const cookieUsername = getCookie('auth_token');
  if (!cookieUsername) {
    return null;
  }

  const cleanCookie = cookieUsername.toLowerCase();

  // Check Dev Admin Accounts first
  const devAdmin = DEV_ADMIN_ACCOUNTS.find(
    a => a.username.toLowerCase() === cleanCookie || a.email.toLowerCase() === cleanCookie
  );
  if (devAdmin) {
    try {
      const adminStats = localStorage.getItem('scoreup_admin_stats_' + devAdmin.username);
      if (adminStats) {
        return { ...devAdmin, stats: JSON.parse(adminStats) };
      }
    } catch {
      // fallback
    }
    return devAdmin;
  }

  // Check Registered Accounts
  const users = getStoredUsers();
  const found = users.find(u => u.username.toLowerCase() === cleanCookie || u.email.toLowerCase() === cleanCookie);
  if (found) {
    return found;
  }

  // Fallback to localStorage session if present
  try {
    const localUserRaw = localStorage.getItem('scoreup_current_user');
    if (localUserRaw) {
      const localUser = JSON.parse(localUserRaw);
      return users.find(u => u.username === localUser.username) || localUser;
    }
  } catch {
    // fallback
  }

  return null;
};

export const setCurrentUserSession = (user) => {
  setCookie('auth_token', user.username, 7);
  setCookie('auth_email', user.email, 7);
  localStorage.setItem('scoreup_current_user', JSON.stringify(user));
  localStorage.setItem('userId', user.username);
};

export const clearCurrentUserSession = () => {
  deleteCookie('auth_token');
  deleteCookie('auth_email');
  localStorage.removeItem('scoreup_current_user');
  localStorage.setItem('userId', 'guest_' + Date.now().toString(36));
};

export const loginUser = (identifier, password) => {
  const trimmedId = identifier.trim().toLowerCase();

  // 1. Check Developer-Provisioned Admin Accounts
  const devAdmin = getDevAdmin(trimmedId, password);
  if (devAdmin) {
    // Load custom admin stats if any
    try {
      const savedStats = localStorage.getItem('scoreup_admin_stats_' + devAdmin.username);
      const activeAdmin = savedStats ? { ...devAdmin, stats: JSON.parse(savedStats) } : devAdmin;
      setCurrentUserSession(activeAdmin);
      return {
        success: true,
        user: activeAdmin
      };
    } catch {
      setCurrentUserSession(devAdmin);
      return {
        success: true,
        user: devAdmin
      };
    }
  }

  // Check if identifier is an admin account with wrong password
  const isAdminMatch = DEV_ADMIN_ACCOUNTS.some(
    a => a.username.toLowerCase() === trimmedId || a.email.toLowerCase() === trimmedId
  );
  if (isAdminMatch) {
    return {
      success: false,
      message: 'Mật khẩu Quản trị viên (Admin) không chính xác. Vui lòng kiểm tra lại.'
    };
  }

  // 2. Check Standard Registered Accounts
  const users = getStoredUsers();
  const user = users.find(
    u => u.username.toLowerCase() === trimmedId || u.email.toLowerCase() === trimmedId
  );

  if (!user) {
    return {
      success: false,
      message: 'Tài khoản không tồn tại. Vui lòng kiểm tra lại email hoặc tên đăng nhập, hoặc đăng ký tài khoản mới.'
    };
  }

  if (user.password !== password) {
    return {
      success: false,
      message: 'Mật khẩu không chính xác. Vui lòng thử lại.'
    };
  }

  setCurrentUserSession(user);
  return {
    success: true,
    user
  };
};

export const registerUser = ({ username, email, password, displayName }) => {
  const trimmedUsername = username.trim();
  const trimmedEmail = email.trim().toLowerCase();

  // 1. Guard against registering reserved Admin credentials
  if (isAdminReserved(trimmedUsername, trimmedEmail)) {
    return {
      success: false,
      message: 'Tài khoản hoặc email này được dành riêng cho Quản Trị Viên (Admin do Developers cấp). Bạn không thể tự đăng ký tài khoản này!'
    };
  }

  const users = getStoredUsers();

  // 2. Check if username already exists
  if (users.some(u => u.username.toLowerCase() === trimmedUsername.toLowerCase())) {
    return {
      success: false,
      message: 'Tên người dùng này đã được đăng ký. Vui lòng chọn tên khác.'
    };
  }

  // 3. Check if email already exists
  if (users.some(u => u.email.toLowerCase() === trimmedEmail)) {
    return {
      success: false,
      message: 'Email này đã gắn liền với một tài khoản khác. Hãy thử đăng nhập.'
    };
  }

  const newUser = {
    username: trimmedUsername,
    email: trimmedEmail,
    password: password,
    displayName: displayName || trimmedUsername,
    role: 'student',
    createdAt: new Date().toISOString(),
    stats: {
      completedQuizzes: 0,
      correctRate: 0,
      streakDays: 1,
      history: []
    }
  };

  users.push(newUser);
  saveStoredUsers(users);
  setCurrentUserSession(newUser);

  return {
    success: true,
    user: newUser
  };
};

export const recordQuizForCurrentUser = ({ subject, score, totalQuestions, correctCount }) => {
  const currentUser = getCurrentUser();
  if (!currentUser) return;

  // Handle Dev Admin Accounts
  if (currentUser.isDevProvisioned) {
    const stats = currentUser.stats || { completedQuizzes: 0, correctRate: 0, streakDays: 1, history: [] };
    const prevCompleted = stats.completedQuizzes || 0;
    const newCompleted = prevCompleted + 1;
    const currentRate = stats.correctRate || 0;
    const thisRate = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const newAvgRate = Math.round((currentRate * prevCompleted + thisRate) / newCompleted);
    const today = new Date().toISOString().split('T')[0];

    stats.completedQuizzes = newCompleted;
    stats.correctRate = newAvgRate;
    stats.history = stats.history || [];
    stats.history.unshift({
      subject: subject || 'Luyện đề',
      score,
      rate: thisRate,
      totalQuestions,
      correctCount,
      date: today
    });

    localStorage.setItem('scoreup_admin_stats_' + currentUser.username, JSON.stringify(stats));
    localStorage.setItem('scoreup_current_user', JSON.stringify({ ...currentUser, stats }));
    return;
  }

  const users = getStoredUsers();
  const userIndex = users.findIndex(u => u.username.toLowerCase() === currentUser.username.toLowerCase());
  if (userIndex === -1) return;

  const user = users[userIndex];
  if (!user.stats) {
    user.stats = { completedQuizzes: 0, correctRate: 0, streakDays: 1, history: [] };
  }

  const prevCompleted = user.stats.completedQuizzes || 0;
  const newCompleted = prevCompleted + 1;
  const currentRate = user.stats.correctRate || 0;
  const thisRate = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const newAvgRate = Math.round((currentRate * prevCompleted + thisRate) / newCompleted);

  const today = new Date().toISOString().split('T')[0];
  const lastQuizDate = user.stats.history && user.stats.history.length > 0 ? user.stats.history[0].date : null;
  let streak = user.stats.streakDays || 1;
  if (lastQuizDate && lastQuizDate !== today) {
    const diffDays = Math.round((new Date(today) - new Date(lastQuizDate)) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      streak += 1;
    }
  }

  user.stats.completedQuizzes = newCompleted;
  user.stats.correctRate = newAvgRate;
  user.stats.streakDays = streak;
  if (!Array.isArray(user.stats.history)) {
    user.stats.history = [];
  }

  user.stats.history.unshift({
    subject: subject || 'Luyện đề',
    score: score,
    rate: thisRate,
    totalQuestions,
    correctCount,
    date: today
  });

  users[userIndex] = user;
  saveStoredUsers(users);
  localStorage.setItem('scoreup_current_user', JSON.stringify(user));
};
