

const ErrorTypes =  {
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    PASSWORD_INCORRECT : 'PASSWORD_INCORRECT',
    USER_IS_ALREADY_EXISTS : "USER_IS_ALREADY_EXISTS",
    EMAIL_NOT_FOUND : "EMAIL_NOT_FOUND",
    USER_NOT_FOUND_BY_EMAIL : "USER_NOT_FOUND_BY_EMAIL",
    USER_RESET_TOKEN_EXPIRED : "USER_RESET_TOKEN_EXPIRED",
    OLD_PASSWORD_INCORRECT : "OLD_PASSWORD_INCORRECT",
    BRAND_NOT_FOUND : "BRAND_NOT_FOUND",
    PRODUCT_SKU_IS_ALREADY_EXISTS : "PRODUCT_SKU_IS_ALREADY_EXISTS",
    PRODUCT_IS_NOT_FOUND : "PRODUCT_IS_NOT_FOUND",
    CATEGORY_IS_NOT_FOUND : "CATEGORY_IS_NOT_FOUND"
}

const ErrorCodes = {
    [ErrorTypes.USER_NOT_FOUND] : {
        message : "User is not found in the database",
        status : 400
    },
    [ErrorTypes.PASSWORD_INCORRECT] :{
        message : "Username and password are not matched",
        status : 400
    },
    [ErrorTypes.USER_IS_ALREADY_EXISTS] : {
        message : "User is already exists",
        status : 400
    },
    [ErrorTypes.EMAIL_NOT_FOUND] : {
        message : "You must enter an email address.",
        status : 400
    },
    [ErrorTypes.USER_NOT_FOUND_BY_EMAIL] : {
        message : "No user found for this email address.",
        status : 400
    },
    [ErrorTypes.USER_RESET_TOKEN_EXPIRED] : {
        message : "Your token has expired. Please attempt to reset your password again..",
        status : 400
    },
    [ErrorTypes.OLD_PASSWORD_INCORRECT] : {
        message :  'Please enter your correct old password.',
        status : 400
    }  ,
    [ErrorTypes.BRAND_NOT_FOUND] : {
        message :  'Could not found the brand.',
        status : 400
    },
    [ErrorTypes.PRODUCT_SKU_IS_ALREADY_EXISTS] : {
        message :  'Sku or slug is already in use.',
        status : 400
    },
    [ErrorTypes.PRODUCT_IS_NOT_FOUND] : {
        message :  'Product is not available in the system.',
        status : 400
    },
    [ErrorTypes.CATEGORY_IS_NOT_FOUND] : {
        message :  'No Category found.',
        status : 400
    }
}
class BaseError extends Error {
    static errorTypes = ErrorTypes

    constructor (type) {
        let messsage = ErrorCodes[type].message
        super(messsage)
        this.type =  type;
        this.statusCode =  ErrorCodes[type].status;
    }
}

module.exports = BaseError;
