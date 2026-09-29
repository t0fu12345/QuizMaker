const BASE_URL = 'http://localhost:3001/api';

/**
 * Wrapper cho hàm fetch gốc, tự động thêm base URL và credentials
 * @param {string} endpoint - Đường dẫn API (ví dụ: '/auth/login')
 * @param {object} options - Cấu hình fetch (method, headers, body...)
 * @returns {Promise<any>} - Dữ liệu JSON trả về từ Backend
 */
export const fetchApi = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  
  // Tự động cấu hình headers và credentials
  const defaultOptions = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    // BẮT BUỘC: Cho phép gửi/nhận Cookie bảo mật chứa Token JWT
    credentials: 'include'
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    // Đọc raw data
    let data;
    try {
      data = await response.json();
    } catch {
      data = { message: 'Đã xảy ra lỗi hệ thống (Không thể parse JSON)' };
    }

    // Nếu mã lỗi không phải 2xx, quăng lỗi để catch bên ngoài
    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'Lỗi kết nối đến server',
        data
      };
    }

    return data;
  } catch (error) {
    console.error(`[API Error] ${endpoint}:`, error);
    throw error;
  }
};
