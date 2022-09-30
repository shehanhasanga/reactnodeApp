
module.exports = (sequelize, type) => {
    return sequelize.define('category', {
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
            type: type.BLOB
        },
        description: {
            field: 'image',
            type: type.STRING(100)
        },
        isActive: {
            type: type.BOOLEAN,
            default: true
        }
    }, {
        tableName: 'category'
    }, {
        hooks: {

        }
    });
}
