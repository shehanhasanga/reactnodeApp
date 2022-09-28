const { ROLE_ADMIN, ROLE_MEMBER, ROLE_MERCHANT } = require('../../constants/index');

module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            type: type.UUID,
            defaultValue: type.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        email: {
            field: 'email',
            type: type.STRING(100)
        },
        phoneNumber: {
            field: 'phoneNumber',
            type: type.STRING(100)
        },
        firstName: {
            field: 'phoneNumber',
            type: type.STRING(100)
        },
        lastName: {
            field: 'phoneNumber',
            type: type.STRING(100)
        },
        password: {
            field: 'password',
            type: type.STRING(100)
        },
        googleId: {
            field: 'googleId',
            type: type.STRING(100)
        },
        facebookId: {
            field: 'facebookId',
            type: type.STRING(100)
        },
        avatar: {
            field: 'avatar',
            type: type.STRING(100)
        },
        role: {
            field: 'role',
            type: type.ENUM(ROLE_ADMIN, ROLE_MEMBER, ROLE_MERCHANT),
            defaultValue: ROLE_MEMBER
        },
        resetPasswordToken: {
            field: 'resetPasswordToken',
            type: type.STRING(100)
        },
        resetPasswordExpires: {
            field: "resetPasswordExpires",
            type: type.DATE
        }
    }, {
        tableName: 'user'
    }, {
        hooks: {

        }
    });
}
