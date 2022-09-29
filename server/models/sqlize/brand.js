
module.exports = (sequelize, type) => {
    return sequelize.define('brand', {
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
        image: {
            field: 'image',
            type: type.BLOB('long')
        },
        description: {
            field: 'description',
            type: type.STRING(100)
        },
        isActive: {
            field: 'isActive',
            type: type.BOOLEAN
        }
    }, {
        tableName: 'brand'
    }, {
        hooks: {

        }
    });
}
