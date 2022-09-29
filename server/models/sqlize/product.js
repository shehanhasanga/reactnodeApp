
module.exports = (sequelize, type) => {
    return sequelize.define('product', {
        id: {
            type: type.UUID,
            defaultValue: type.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        sku: {
            field: 'sku',
            type: type.STRING(100)
        },
        name: {
            field: 'name',
            type: type.STRING(100)
        },
        imageUrl: {
            field: 'imageUrl',
            type: type.STRING
        },
        imageKey: {
            field: 'imageKey',
            type: type.STRING(100)
        },
        description: {
            field: 'description',
            type: type.STRING(100)
        },
        quantity: {
            field: 'quantity',
            type: type.INTEGER
        },
        price: {
            field: 'price',
            type: type.INTEGER
        },
        taxable: {
            field: 'taxable',
            type: type.BOOLEAN,
            default : false
        },
        isActive: {
            field: 'isActive',
            type:  type.BOOLEAN,
            default: true
        }
    }, {
        tableName: 'product'
    }, {
        hooks: {

        }
    });
}
