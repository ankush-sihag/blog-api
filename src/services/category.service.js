const categoryRepository = require(
    '../repositories/category.repository'
);

const generateSlug = require(
    '../utils/generateSlug'
);

const ApiError = require(
    '../utils/ApiError'
);

const createNewCategory = async (
    data
) => {

    const slug = generateSlug(
        data.name
    );

    const existingCategory =
        await categoryRepository.getCategoryBySlug(
            slug
        );

    if (existingCategory) {

        throw new ApiError(
            400,
            'Category already exists'
        );
    }

    const category =
        await categoryRepository.createCategory({
            ...data,
            slug
        });

    return category;
};

const getAllCategories = async () => {

    return categoryRepository.getAllCategories();
};

const getSingleCategory = async (
    categoryId
) => {

    const category =
        await categoryRepository.getCategoryById(
            categoryId
        );

    if (!category) {

        throw new ApiError(
            404,
            'Category not found'
        );
    }

    return category;
};

const updateSingleCategory = async (
    categoryId,
    data
) => {

    const existingCategory =
        await categoryRepository.getCategoryById(
            categoryId
        );

    if (!existingCategory) {

        throw new ApiError(
            404,
            'Category not found'
        );
    }

    if (data.name) {

        const slug = generateSlug(
            data.name
        );

        const duplicateCategory =
            await categoryRepository.getCategoryBySlug(
                slug
            );

        if (
            duplicateCategory &&
            duplicateCategory._id.toString() !==
            categoryId
        ) {

            throw new ApiError(
                400,
                'Category with similar name already exists'
            );
        }

        data.slug = slug;
    }

    const updatedCategory =
        await categoryRepository.updateCategory(
            categoryId,
            data
        );

    return updatedCategory;
};

const deleteSingleCategory = async (
    categoryId
) => {

    const existingCategory =
        await categoryRepository.getCategoryById(
            categoryId
        );

    if (!existingCategory) {

        throw new ApiError(
            404,
            'Category not found'
        );
    }

    await categoryRepository.deleteCategory(
        categoryId
    );

    return;
};

module.exports = {
    createNewCategory,
    getAllCategories,
    getSingleCategory,
    updateSingleCategory,
    deleteSingleCategory
};