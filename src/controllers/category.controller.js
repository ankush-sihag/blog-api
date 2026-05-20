const asyncHandler = require(
    '../middleware/async.middleware'
);

const categoryService = require(
    '../services/category.service'
);

const ApiResponse = require(
    '../utils/ApiResponse'
);

const createCategory = asyncHandler(
    async (req, res) => {

        const category =
            await categoryService.createNewCategory(
                req.body
            );

        res.status(201).json(
            new ApiResponse(
                201,
                'Category created successfully',
                category
            )
        );
    }
);

const getCategories = asyncHandler(
    async (req, res) => {

        const categories =
            await categoryService.getAllCategories();

        res.status(200).json(
            new ApiResponse(
                200,
                'Categories fetched successfully',
                categories
            )
        );
    }
);

const getCategory = asyncHandler(
    async (req, res) => {

        const category =
            await categoryService.getSingleCategory(
                req.params.id
            );

        res.status(200).json(
            new ApiResponse(
                200,
                'Category fetched successfully',
                category
            )
        );
    }
);

const updateCategory = asyncHandler(
    async (req, res) => {

        const updatedCategory =
            await categoryService.updateSingleCategory(
                req.params.id,
                req.body
            );

        res.status(200).json(
            new ApiResponse(
                200,
                'Category updated successfully',
                updatedCategory
            )
        );
    }
);

const deleteCategory = asyncHandler(
    async (req, res) => {

        await categoryService.deleteSingleCategory(
            req.params.id
        );

        res.status(200).json(
            new ApiResponse(
                200,
                'Category deleted successfully'
            )
        );
    }
);

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
};