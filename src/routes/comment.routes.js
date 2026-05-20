const express = require('express');

const {
    createComment,
    getComments,
    getComment,
    updateComment,
    deleteComment
} = require(
    '../controllers/comment.controller'
);

const {
    protect
} = require(
    '../middleware/auth.middleware'
);

const checkCommentOwnership =
    require(
        '../middleware/commentOwner.middleware'
    );

const {
    createCommentValidator,
    updateCommentValidator
} = require(
    '../validators/comment.validator'
);

const validate = require(
    '../validators/validationResult.validator'
);

const router = express.Router({
    mergeParams: true
});

router.get(
    '/',
    getComments
);

router.post(
    '/',
    protect,
    createCommentValidator,
    validate,
    createComment
);

router.get(
    '/:id',
    getComment
);

router.put(
    '/:id',
    protect,
    checkCommentOwnership,
    updateCommentValidator,
    validate,
    updateComment
);

router.delete(
    '/:id',
    protect,
    checkCommentOwnership,
    deleteComment
);

module.exports = router;