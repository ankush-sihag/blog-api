const { body } = require(
    'express-validator'
);

const createCategoryValidator = [

    body('name')
        .notEmpty()
        .withMessage(
            'Category name is required'
        )
        .isLength({ min: 3 })
        .withMessage(
            'Category name must be at least 3 characters'
        ),

    body('description')
        .optional()
        .isLength({ min: 10 })
        .withMessage(
            'Description should be at least 10 characters'
        )
];

const updateCategoryValidator = [

    body('name')
        .optional()
        .isLength({ min: 3 })
        .withMessage(
            'Category name must be at least 3 characters'
        ),

    body('description')
        .optional()
        .isLength({ min: 10 })
        .withMessage(
            'Description should be at least 10 characters'
        )
];

module.exports = {
    createCategoryValidator,
    updateCategoryValidator
};