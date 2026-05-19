const express = require('express');

const {
    createPost,
    getPosts
} = require('../controllers/post.controller');

const {
    protect
} = require('../middleware/auth.middleware');

const {
    createPostValidator
} = require('../validators/post.validator');

const validate = require('../validators/validationResult.validator');

const router = express.Router();

router.get('/', getPosts);

router.post(
    '/',
    protect,
    createPostValidator,
    validate,
    createPost
);

module.exports = router;