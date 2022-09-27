// const Mongoose = require('mongoose');
// const { ROLE_ADMIN, ROLE_MEMBER, ROLE_MERCHANT } = require('../constants');
//
// const { Schema } = Mongoose;
//
// // User Schema
// const UserSchema = new Schema({
//   email: {
//     type: String,
//     required: () => {
//       return this.provider !== 'email' ? false : true;
//     }
//   },
//   phoneNumber: {
//     type: String
//   },
//   firstName: {
//     type: String
//   },
//   lastName: {
//     type: String
//   },
//   password: {
//     type: String
//   },
//   merchant: {
//     type: Schema.Types.ObjectId,
//     ref: 'Merchant',
//     default: null
//   },
//   provider: {
//     type: String,
//     required: true,
//     default: 'email'
//   },
//   googleId: {
//     type: String
//   },
//   facebookId: {
//     type: String
//   },
//   avatar: {
//     type: String
//   },
//   role: {
//     type: String,
//     default: ROLE_MEMBER,
//     enum: [ROLE_ADMIN, ROLE_MEMBER, ROLE_MERCHANT]
//   },
//   resetPasswordToken: { type: String },
//   resetPasswordExpires: { type: Date },
//   updated: Date,
//   created: {
//     type: Date,
//     default: Date.now
//   }
// });
//
// module.exports = Mongoose.model('User', UserSchema);
const db = require("../config/connection.js");
const {
    v4: uuidv4
} = require('uuid');
const {
    logger
} = require('../config/logger/log4js.init');
const util = require('../utils/basicUtils')


exports.addUser = async (user) => {

}
exports.getUserByEmail = async (email) => {
    logger.debug("[user_model] :: loginUser() : Start");
    var dbQuery = `SELECT * FROM user WHERE Email= '${util.replaceQuotes(email)}' AND IsDeleted = 0`;
    var result = await db.query(dbQuery);
    logger.trace("[user_model] :: loginUser() : End");
    return result;
}
exports.getUserById  = async (id) => {
    logger.debug("[user_model] :: loginUser() : Start");
    var dbQuery = `SELECT * FROM user WHERE UserId= '${util.replaceQuotes(id)}' AND IsDeleted = 0`;
    var result = await db.query(dbQuery);
    logger.trace("[user_model] :: loginUser() : End");
    return result;
}

