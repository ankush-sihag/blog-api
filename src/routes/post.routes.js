const express = require('express');

const {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost
} = require('../controllers/post.controller');

const {
    protect
} = require('../middleware/auth.middleware');

const checkPostOwnership = require('../middleware/postOwner.middleware');

const {
    createPostValidator,
    updatePostValidator
} = require('../validators/post.validator');

const validate = require(
    '../validators/validationResult.validator'
);

const commentRoutes = require('./comment.routes');

const upload = require('../middleware/upload.middleware');

const router = express.Router();

router.use(
    '/:postId/comments',
    commentRoutes
);

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags:
 *       - Posts
 *     responses:
 *       200:
 *         description: Posts fetched successfully
 */

router.get('/', getPosts);

router.get('/:id', getPost);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create new post
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Post created successfully
 */

router.post(
    '/',
    protect,
    upload.single('thumbnail'),
    createPostValidator,
    validate,
    createPost
);

router.put(
    '/:id',
    protect,
    checkPostOwnership,
    updatePostValidator,
    validate,
    updatePost
);

router.delete(
    '/:id',
    protect,
    checkPostOwnership,
    deletePost
);

module.exports = router;