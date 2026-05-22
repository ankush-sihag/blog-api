const express = require('express');

const authRoutes = require('./auth.routes');

const postRoutes = require('./post.routes');

const engagementRoutes = require('./engagement.routes');

const categoryRoutes = require('./category.routes');

const router = express.Router();

router.use('/auth', authRoutes);

router.use('/posts', postRoutes);

router.use('/', engagementRoutes);

router.use('/categories', categoryRoutes);

module.exports = router;
