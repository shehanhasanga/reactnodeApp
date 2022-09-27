module.exports = (sequelize, type) => {
    return sequelize.define('merchant', {
        id: {
            type: type.UUID,
            defaultValue: type.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            field: 'name',
            type: type.STRING(100)
        },
        email: {
            field: 'email',
            type: type.STRING(100)
        },
        phoneNumber: {
            field: 'phoneNumber',
            type: type.STRING(20)
        },
        brand: {
            field: 'brand',
            type: type.STRING(100)
        },
        business: {
            field: 'business',
            type: type.STRING(100)
        },
        isActive: {
            type: type.BOOLEAN,
            defaultValue: false
        },
        status: {
            type: type.ENUM({
                values: ['Waiting Approval', 'Rejected', 'Approved']
            }),
            default: 'Waiting Approval'
        }
    },
        {
        tableName: 'merchant'
    },
        {
        hooks: {}
    });
}
