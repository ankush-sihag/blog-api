const express = require('express');

const {
    toggleLike,
    toggleBookmark
} = require(
    '../controllers/engagement.controller'
);

const {
    protect
} = require(
    '../middleware/auth.middleware'
);

const router = express.Router();

router.post(
    '/posts/:postId/like',
    protect,
    toggleLike
);

router.post(
    '/posts/:postId/bookmark',
    protect,
    toggleBookmark
);

module.exports = router;