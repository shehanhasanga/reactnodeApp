

module.exports = (sequelize, type) => {
    return sequelize.define('productcategory', {

    }, {
        tableName: 'productcategory'
    }, {
        hooks: {

        }
    });
}
