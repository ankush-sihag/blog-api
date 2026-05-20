const { body } = require(
    'express-validator'
);

const createCommentValidator = [

    body('content')
        .notEmpty()
        .withMessage(
            'Comment content is required'
        )
        .isLength({ min: 2 })
        .withMessage(
            'Comment must be at least 2 characters'
        )
];

const updateCommentValidator = [

    body('content')
        .notEmpty()
        .withMessage(
            'Comment content is required'
        )
        .isLength({ min: 2 })
        .withMessage(
            'Comment must be at least 2 characters'
        )
];

module.exports = {
    createCommentValidator,
    updateCommentValidator
};