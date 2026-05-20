const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        description: {
            type: true,
            default: ''
        }
    },
    {
        timestamps: true
    }
);

categorySchema.index({
    name: 'text'
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;