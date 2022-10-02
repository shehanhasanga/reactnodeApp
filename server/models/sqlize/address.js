const { ROLE_ADMIN, ROLE_MEMBER, ROLE_MERCHANT } = require('../../constants/index');

module.exports = (sequelize, type) => {
    return sequelize.define('address', {
        id: {
            type: type.UUID,
            defaultValue: type.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        address: {
            field: 'address',
            type: type.STRING
        },
        city: {
            field: 'city',
            type: type.STRING(100)
        },
        state: {
            field: 'state',
            type: type.STRING(100)
        },
        country: {
            field: 'country',
            type: type.STRING(100)
        },
        zipCode: {
            field: 'zipCode',
            type: type.STRING(100)
        },
        isDefault: {
            field: 'isDefault',
            type: type.BOOLEAN,
            default: false
        }
    }, {
        tableName: 'address'
    }, {
        hooks: {

        }
    });
}
