const CategoryService = require("../services/categoryService");
const categoryService = new CategoryService()
const {
    logger
} = require('../config/logger/log4js.init');


const sendErrorResponse = (error, res) => {
    if(error.statusCode){
        return res.status(e.statusCode).json({ error: e.message });
    } else {
        return res.status(e.statusCode).json({ error: e.message });
    }
}

exports.addCategory = async function (req, res, next) {
    const name = req.body.name;
    const description = req.body.description;
    const products = req.body.products;
    const isActive = req.body.isActive;
    if (!description || !name) {
        return res
            .status(400)
            .json({ error: 'You must enter description & name.' });
    }
    try{
        const category = {name,description, products, isActive}
        const data = await categoryService.addCategory(category)
        res.status(200).json({
            success: true,
            message: `Category has been added successfully!`,
            category: data
        });
    }catch (e) {
        return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }


}


exports.getCategoryList = async function (req, res, next) {
    try{
        const categories = await categoryService.getCategoryList()
        res.status(200).json({
            categories
        });
    }catch (e) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

exports.getCategory = async function (req, res, next) {
    const categoryId = req.params.id;
    try{
        const category = await categoryService.getCategory(categoryId)
        res.status(200).json({
            category: category
        });
    } catch (e) {
        sendErrorResponse(e, res)
    }
}
exports.updateCategory = async function (req, res, next) {
    try {
        const categoryId = req.params.id;
        const update = req.body.category;
        const category = await categoryService.updateCategory(update, categoryId)
        res.status(200).json({
            success: true,
            message: 'Category has been updated successfully!'
        });

    }catch (e) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

exports.isActivate = async function (req, res, next) {
    try {
        const categoryId = req.params.id;
        const update = req.body.category;
        const category = await categoryService.activateCategory(update.isActive, categoryId)
        res.status(200).json({
            success: true,
            message: 'Category has been updated successfully!'
        })

    }catch (e) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

exports.deleteCategory = async function (req, res, next) {
    try {
        const categoryId = req.params.id;
        const category = await categoryService.deleteCategory( categoryId)
    }catch (e) {

    }
}
