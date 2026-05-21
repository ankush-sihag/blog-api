const express = require('express');

const {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
} = require(
    '../controllers/category.controller'
);

const {
    protect,
    authorize
} = require(
    '../middleware/auth.middleware'
);

const {
    createCategoryValidator,
    updateCategoryValidator
} = require(
    '../validators/category.validator'
);

const validate = require(
    '../validators/validationResult.validator'
);

const router = express.Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: Categories fetched successfully
 */

router.get(
    '/',
    getCategories
);

router.get(
    '/:id',
    getCategory
);

router.post(
    '/',
    protect,
    authorize('admin'),
    createCategoryValidator,
    validate,
    createCategory
);

router.put(
    '/:id',
    protect,
    authorize('admin'),
    updateCategoryValidator,
    validate,
    updateCategory
);

router.delete(
    '/:id',
    protect,
    authorize('admin'),
    deleteCategory
);

module.exports = router;