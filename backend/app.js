const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./src/core/config/database');

// Khởi tạo kết nối Database
connectDB();

const routes = require('./src/routes');

const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({
    origin: 'http://localhost:5173', // Port mặc định của React Vite
    credentials: true // Bắt buộc bật để gửi nhận HTTP-only Cookie
}));
app.use(express.json());
app.use(cookieParser());

// Mount v1 API Routes
app.use('/api', routes);

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'ScoreUp API is running!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
