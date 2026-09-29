const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../users/user.model');

const registerUser = async (username, password) => {
    // 1. Kiểm tra user đã tồn tại chưa
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        throw new Error('Tên đăng nhập đã tồn tại');
    }

    // 2. Mã hoá mật khẩu (Hash)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Tạo user mới
    const newUser = new User({
        username,
        password: hashedPassword
    });

    await newUser.save();
    return { message: "Đăng ký thành công", userId: newUser._id };
};

const loginUser = async (username, password) => {
    // 1. Tìm user trong DB
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('Sai tên đăng nhập hoặc mật khẩu');
    }

    // 2. Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Sai tên đăng nhập hoặc mật khẩu');
    }

    // 3. Tạo JWT Token
    // Nếu trong .env chưa có JWT_SECRET, dùng chuỗi mặc định (chỉ dùng cho Dev)
    const secret = process.env.JWT_SECRET || 'super_secret_key_123';
    const token = jwt.sign(
        { userId: user._id, role: user.role }, 
        secret, 
        { expiresIn: '7d' } // Token sống 7 ngày
    );

    return { token, user: { id: user._id, username: user.username, role: user.role } };
};

module.exports = {
    registerUser,
    loginUser
};
