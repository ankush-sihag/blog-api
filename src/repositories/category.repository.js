const Category = require('../models/category.model');
const category = require('../models/category.model');

const createCategory = async (data) => {
    return Category.create(data);
};

const getAllCategories = async (id) => {
    return Category.find()
        .sort({ createdAt: -1 });
};

const getCategoryById = async (id) => {
    return Category.findById(id);
};

const getCategoryBySlug = async (slug) => {
    return Category.findOne({ slug });
};

const updateCategory = async (id, data) => {
    return Category.findByIdAndUpdate(id, data, {new: true});
};

const deleteCategory = async (id) => {
    return Category.findByIdAndDelete(id);
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    getCategoryBySlug,
    updateCategory,
    deleteCategory
};