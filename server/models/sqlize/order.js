
module.exports = (sequelize, type) => {
    return sequelize.define('order', {
        id: {
            type: type.UUID,
            defaultValue: type.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        total: {
            field: 'total',
            type: type.INTEGER,
            defaultValue: 0
        }
    }, {
        tableName: 'order'
    }, {
        hooks: {

        }
    });
}
