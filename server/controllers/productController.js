const Productservice = require("../services/productService");
const ProductService = new Productservice()
const { s3Upload } = require('../utils/storage');
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

exports.searchProductByName = async function (req, res, next) {
    const name = req.params.name;
    try{
        const data = await ProductService.searchProductByName(user)
        res.status(200).json({
            products: data
        });
    }catch (e) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }


}
exports.getProduct = async function (req, res, next) {
    try {
        const productId = req.params.id;
        const productDoc = await ProductService.getProduct(productId)
        if (!productDoc) {
            return res.status(404).json({
                message: 'No product found.'
            });
        }
        res.status(200).json({
            product: productDoc
        });
    }catch (e) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

exports.updateProduct = async function (req, res, next) {
    try {
        const productId = req.params.id;
        const updateData = req.body.product;
        const query = { _id: productId };
        const { sku, slug } = req.body.product;
        const productDoc = await ProductService.updateProduct(productId, updateData)
        res.status(200).json({
            success: true,
            message: 'Product has been updated successfully!'
        });
    }catch (e) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

exports.deleteProduct = async function (req, res, next) {
    try {
        const productId = req.params.id
        await ProductService.deleteProduct(productId)
        res.status(200).json({
            success: true,
            message: `Product has been deleted successfully!`
        });
    }catch (e) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}
exports.updateActive = async function (req, res, next) {
    try {
        const productId = req.params.id;
        const update = req.body.product;
        const query = { _id: productId };
        const productDoc = await ProductService.updateActivate(productId, update.isActive)
        res.status(200).json({
            success: true,
            message: 'Product has been updated successfully!'
        });
    }catch (e) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }

}

exports.getProducts = async function (req, res, next) {
    try {
        const products = await ProductService.getAllProducts()
        res.status(200).json({
            products
        });
    }catch (e) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

exports.getAllProducts = async function (req, res, next) {
    try{
        const products = await ProductService.getAllProducts()
        res.status(200).json({
            products
        });
    }catch (e) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

exports.addProduct = async function (req, res, next) {
    try {
        const sku = req.body.sku;
        const name = req.body.name;
        const description = req.body.description;
        const quantity = req.body.quantity;
        const price = req.body.price;
        const taxable = req.body.taxable;
        const isActive = req.body.isActive;
        const brand = req.body.brand;
        const image = req.file;
        const productData = {
            sku, name, description, quantity, price, taxable, isActive, brand
        }
        if (!sku) {
            return res.status(400).json({error: 'You must enter sku.'});
        }

        if (!description || !name) {
            return res
                .status(400)
                .json({error: 'You must enter description & name.'});
        }

        if (!quantity) {
            return res.status(400).json({error: 'You must enter a quantity.'});
        }

        if (!price) {
            return res.status(400).json({error: 'You must enter a price.'});
        }

        // const foundProduct = await Product.findOne({sku});
        //
        // if (foundProduct) {
        //     return res.status(400).json({error: 'This sku is already in use.'});
        // }

        const product = await ProductService.addProduct(productData, image)
        res.status(200).json({
            success: true,
            message: `Product has been added successfully!`,
            product: product
        });
    } catch (e) {
        return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}
