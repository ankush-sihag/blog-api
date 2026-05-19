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

const {
    createPostValidator,
    updatePostValidator
} = require('../validators/post.validator');

const validate = require(
    '../validators/validationResult.validator'
);

const router = express.Router();

router.get('/', getPosts);

router.get('/:id', getPost);

router.post(
    '/',
    protect,
    createPostValidator,
    validate,
    createPost
);

router.put(
    '/:id',
    protect,
    updatePostValidator,
    validate,
    updatePost
);

router.delete(
    '/:id',
    protect,
    deletePost
);

module.exports = router;