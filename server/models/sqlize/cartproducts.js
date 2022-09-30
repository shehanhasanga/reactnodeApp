
module.exports = (sequelize, type) => {
    return sequelize.define('cartproducts', {
        id: {
            type: type.UUID,
            defaultValue: type.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        quantity: {
            field: 'quantity',
            type: type.INTEGER
        },
        purchasePrice: {
            field: 'purchasePrice',
            type: type.INTEGER,
            defaultValue: 0
        },
        totalPrice: {
            field: 'totalPrice',
            type: type.INTEGER,
            defaultValue: 0
        },
        priceWithTax: {
            field: 'priceWithTax',
            type: type.INTEGER,
            defaultValue: 0
        },
        totalTax: {
            field: 'totalTax',
            type: type.INTEGER,
            defaultValue: 0
        },
        status: {
            field: 'status',
            type: type.ENUM('Not processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'),
            defaultValue: 'Not processed'
        }
    }, {
        tableName: 'cartproducts'
    }, {
        hooks: {

        }
    });
}
