
module.exports = (sequelize, type) => {
    return sequelize.define('cartitem', {
        id: {
            type: type.UUID,
            defaultValue: type.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    }, {
        tableName: 'cartitem'
    }, {
        hooks: {

        }
    });
}
