const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');
const questionRoutes = require('./question.route');
const quizRoutes = require('./quiz.route');

const apiRoutes = [
    {
        path: '/auth',
        route: authRoutes,
    },
    {
        path: '/users',
        route: userRoutes,
    },
    {
        path: '/questions',
        route: questionRoutes,
    },
    {
        path: '/quiz',
        route: quizRoutes,
    }
];

apiRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
