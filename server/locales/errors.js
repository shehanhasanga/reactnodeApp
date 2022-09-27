

const ErrorTypes =  {
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    PASSWORD_INCORRECT : 'PASSWORD_INCORRECT',
}

const ErrorCodes = {
    [ErrorTypes.USER_NOT_FOUND] : {
        message : "User is not found in the database",
        status : 400
    },
    [ErrorTypes.PASSWORD_INCORRECT] :{
        message : "Username and password are not matched"
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
