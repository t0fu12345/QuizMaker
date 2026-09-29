const User = require('./user.model');
const Attempt = require('../quiz/attempt.model');

const getUserProfile = async (userId) => {
    // 1. Lấy thông tin user (loại bỏ mật khẩu)
    const user = await User.findById(userId).select('-password');
    if (!user) throw new Error('Không tìm thấy người dùng');

    // 2. Lấy toàn bộ lịch sử thi (bảng Attempt) của user này, xếp mới nhất lên đầu
    const history = await Attempt.find({ user: userId }).sort({ createdAt: -1 });

    return {
        user,
        history
    };
};

module.exports = {
    getUserProfile
};
