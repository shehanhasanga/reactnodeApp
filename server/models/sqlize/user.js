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
        }
    }, {
        tableName: 'user',
        timestamps: false
    }, {
        hooks: {

        }
    });
}
