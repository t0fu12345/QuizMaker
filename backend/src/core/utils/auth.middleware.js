const jwt = require('jsonwebtoken');

// Middleware này được kẹp vào trước các route cần bảo vệ
const verifyToken = (req, res, next) => {
    // 1. Đọc token từ cookie
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "Không tìm thấy token. Vui lòng đăng nhập lại." });
    }

    try {
        // 2. Giải mã token
        const secret = process.env.JWT_SECRET || 'super_secret_key_123';
        const decoded = jwt.verify(token, secret);
        
        // 3. Gắn thông tin user vào req để các hàm phía sau dùng
        req.user = decoded; // { userId: "...", role: "user" }
        
        next(); // Cho phép đi tiếp vào Controller
    } catch (error) {
        return res.status(403).json({ error: "Token không hợp lệ hoặc đã hết hạn" });
    }
};

module.exports = {
    verifyToken
};
