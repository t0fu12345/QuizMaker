const userService = require('./user.service');

const getProfile = async (req, res) => {
    try {
        const userId = req.user.userId; // Middleware đã gắn sẵn ID
        const profile = await userService.getUserProfile(userId);
        res.status(200).json(profile);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    getProfile
};
