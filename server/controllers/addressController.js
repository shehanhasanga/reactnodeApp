
const {
    logger
} = require('../config/logger/log4js.init');

const AddressService =  require("../services/addressService")
const addressService = new AddressService()

const sendErrorResponse = (error, res) => {
    if(error.statusCode){
        return res.status(e.statusCode).json({ error: e.message });
    } else {
        return res.status(e.statusCode).json({ error: e.message });
    }
}

exports.addAddress = async function (req, res, next) {
    const user = req.user;
    try{
        let addressDoc =  await addressService.addAddress(req.body, user.id)
        res.status(200).json({
            success: true,
            message: `Address has been added successfully!`,
            address: addressDoc
        });
    }catch (e) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }

}

exports.getAddressByUser = async function (req, res, next) {
    const user = req.user;
    try {
        let addresses = await addressService.findAddressByUserId(user.id)
        res.status(200).json({
            addresses
        });
    }catch (e) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

exports.getAddress = async function (req, res, next) {
    const addressId = req.params.id;
    try {
        let addressDoc = await addressService.getAddress(addressId)
        res.status(200).json({
            address: addressDoc
        });
    }catch (e) {
        res.status(404).json({
            message: `Cannot find Address with the id: ${addressId}.`
        });
    }
}


exports.updateAddress = async function (req, res, next) {
    const addressId = req.params.id;
    const update = req.body;

    try {
        let addressDoc = await addressService.updateAddress(update, addressId)
        res.status(200).json({
            success: true,
            message: 'Address has been updated successfully!'
        });
    }catch (e) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }

}

exports.deleteAddress = async function (req, res, next) {
    const  id =  req.params.id
    try{
        let success = await addressService.deleteAddress(id)
        res.status(200).json({
            success: true,
            message: `Address has been deleted successfully!`
        });
    }catch (e) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

