// Developer-provisioned Admin Registry
// NOTE: These accounts are strictly managed by developers and cannot be registered publicly via the web interface.

export const DEV_ADMIN_ACCOUNTS = [
  {
    username: 'admin',
    email: 'admin@scoreup.edu.vn',
    password: 'Password123!',
    displayName: 'Quản Trị Viên Hệ Thống',
    role: 'admin',
    isDevProvisioned: true,
    createdAt: '2025-01-01T00:00:00.000Z',
    permissions: ['manage_questions', 'manage_users', 'view_analytics'],
    stats: {
      completedQuizzes: 45,
      correctRate: 98,
      streakDays: 30,
      history: [
        { subject: 'Kiểm duyệt đề thi', score: 100, date: '2025-09-26' }
      ]
    }
  },
  {
    username: 'scoreup_dev',
    email: 'developer@scoreup.edu.vn',
    password: 'Password123!',
    displayName: 'Lead Developer',
    role: 'admin',
    isDevProvisioned: true,
    createdAt: '2025-01-01T00:00:00.000Z',
    permissions: ['all'],
    stats: {
      completedQuizzes: 60,
      correctRate: 100,
      streakDays: 45,
      history: [
        { subject: 'Toàn bộ ngân hàng đề', score: 100, date: '2025-09-26' }
      ]
    }
  }
];

// Reserved keywords and patterns that cannot be registered by regular users
export const RESERVED_ADMIN_PATTERNS = [
  /^admin$/i,
  /^administrator$/i,
  /^root$/i,
  /^moderator$/i,
  /^scoreup_admin$/i,
  /^scoreup_dev$/i,
  /^dev_/i,
  /@scoreup\.admin$/i,
  /@admin\.scoreup/i
];

/**
 * Check if a username or email is reserved for admins
 */
export const isAdminReserved = (username = '', email = '') => {
  const cleanUsername = username.trim().toLowerCase();
  const cleanEmail = email.trim().toLowerCase();

  // Check explicit admin usernames & emails
  for (const admin of DEV_ADMIN_ACCOUNTS) {
    if (admin.username.toLowerCase() === cleanUsername || admin.email.toLowerCase() === cleanEmail) {
      return true;
    }
  }

  // Check reserved patterns
  for (const pattern of RESERVED_ADMIN_PATTERNS) {
    if (pattern.test(cleanUsername) || pattern.test(cleanEmail)) {
      return true;
    }
  }

  return false;
};

/**
 * Retrieve dev admin matching credentials
 */
export const getDevAdmin = (identifier = '', password = '') => {
  const cleanId = identifier.trim().toLowerCase();
  return DEV_ADMIN_ACCOUNTS.find(
    (acc) =>
      (acc.username.toLowerCase() === cleanId || acc.email.toLowerCase() === cleanId) &&
      acc.password === password
  );
};
