
const {
    logger
} = require('../config/logger/log4js.init');

const BrandService =  require("../services/brandService")
const brandService = new BrandService()

const sendErrorResponse = (error, res) => {
    if(error.statusCode){
        return res.status(e.statusCode).json({ error: e.message });
    } else {
        return res.status(e.statusCode).json({ error: e.message });
    }
}

exports.addBrand = async function (req, res, next) {
    const name = req.body.name;
    const description = req.body.description;
    const isActive = req.body.isActive;
    if (!description || !name) {
        return res
            .status(400)
            .json({ error: 'You must enter description & name.' });
    }
    let brand = {
        name: name,
        description : description,
        isActive: isActive
    }
    try{
        const data = await brandService.addBrand(brand)
        res.status(200).json({
            success: true,
            message: `Brand has been added successfully!`,
            brand: data
        });
    }catch (e) {
        sendErrorResponse(e, res)
    }

}

exports.getBrandList = async function (req, res, next) {
    try {
        let brands = await brandService.getBrandList()
        res.status(200).json({
            brands
        });
    }catch (e) {
        res.status(400).json({
            e: 'Your request could not be processed. Please try again.'
        });
    }
}

exports.getBrandListSelect = async function (req, res, next) {
    try {
        let brands = await brandService.getBrandList()
        res.status(200).json({
            brands
        });
    }catch (e) {
        res.status(400).json({
            e: 'Your request could not be processed. Please try again.'
        });
    }
}

exports.getBrand = async function (req, res, next) {
    try{
        const brandId = req.params.id;
        let brandDoc = await brandService.getBrand(brandId)
        if (!brandDoc) {
            res.status(404).json({
                message: `Cannot find brand with the id: ${brandId}.`
            });
        }
        res.status(200).json({
            brand: brandDoc
        });
    }catch (e) {
        res.status(400).json({
            e: 'Your request could not be processed. Please try again.'
        });
    }
}

exports.updateBrand = async function (req, res, next) {
    const brandId = req.params.id;
    const update = req.body.brand;
    const query = { _id: brandId };

    try {
        let brandDoc = await brandService.updateBrand(update, brandId)
        res.status(200).json({
            success: true,
            message: 'Brand has been updated successfully!'
        });
    }catch (e) {
        res.status(400).json({
            e: 'Your request could not be processed. Please try again.'
        });
    }

}

exports.activateBrand = async function (req, res, next) {
    const brandId = req.params.id;
    const update = req.body.brand;
    const query = { _id: brandId };
    try{
        let brandDoc = await brandService.updateActivate(update.isActive, brandId)
        res.status(200).json({
            success: true,
            message: 'Brand has been updated successfully!'
        });
    }catch (e) {
        res.status(400).json({
            e: 'Your request could not be processed. Please try again.'
        });
    }

}
exports.deleteBrand = async function (req, res, next) {
    const  id =  req.params.id
    try{
        let success = await brandService.deleteBrand(id)
        res.status(200).json({
            success,
            message: `Brand has been deleted successfully!`
        });
    }catch (e) {
        res.status(400).json({
            e: 'Your request could not be processed. Please try again.'
        });
    }
}

