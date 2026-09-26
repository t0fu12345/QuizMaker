const authService = require('./auth.service');

const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Vui lòng nhập đủ username và password" });
        }

        const result = await authService.registerUser(username, password);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Vui lòng nhập đủ username và password" });
        }

        const result = await authService.loginUser(username, password);

        // Đặt JWT vào HTTP-Only Cookie
        res.cookie('token', result.token, {
            httpOnly: true, // Trình duyệt không thể đọc cookie này bằng JS (chống XSS)
            secure: process.env.NODE_ENV === 'production', // Chạy https trên production
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 ngày
        });

        res.status(200).json({ 
            message: "Đăng nhập thành công", 
            user: result.user 
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

const logout = (req, res) => {
    // Xoá cookie
    res.clearCookie('token');
    res.status(200).json({ message: "Đã đăng xuất" });
};

module.exports = {
    register,
    login,
    logout
};
