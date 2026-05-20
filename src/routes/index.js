const express = require('express');

const authRoutes = require('./auth.routes');

const postRoutes = require('./post.routes');

const engagementRoutes = require('./engagement.routes');

const router = express.Router();

router.use('/auth', authRoutes);

router.use('/posts', postRoutes);

router.use('/', engagementRoutes);

module.exports = router;
