const { body } = require('express-validator');

const createPostValidator = [

    body('title')
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 5 })
        .withMessage(
            'Title must be at least 5 characters'
        ),

    body('content')
        .notEmpty()
        .withMessage('Content is required')
        .isLength({ min: 20 })
        .withMessage(
            'Content must be at least 20 characters'
        ),

    body('status')
        .optional()
        .isIn(['draft', 'published'])
        .withMessage(
            'Status must be draft or published'
        )
];

const updatePostValidator = [

    body('title')
        .optional()
        .isLength({ min: 5 })
        .withMessage(
            'Title must be at least 5 characters'
        ),

    body('content')
        .optional()
        .isLength({ min: 20 })
        .withMessage(
            'Content must be at least 20 characters'
        ),

    body('status')
        .optional()
        .isIn(['draft', 'published'])
        .withMessage(
            'Invalid status value'
        )
];

module.exports = {
    createPostValidator,
    updatePostValidator
};