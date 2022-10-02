const { ROLE_ADMIN, ROLE_MEMBER, ROLE_MERCHANT } = require('../../constants/index');

module.exports = (sequelize, type) => {
    return sequelize.define('review', {
        id: {
            type: type.UUID,
            defaultValue: type.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        title: {
            field: 'title',
            type: type.STRING
        },
        rating: {
            field: 'rating',
            type: type.INTEGER
        },
        review: {
            field: 'review',
            type: type.STRING(100)
        },
        isRecommended: {
            field: 'isRecommended',
            type: type.BOOLEAN,
            default: true
        },
        status: {
            field: 'status',
            type: type.ENUM('Waiting Approval', 'Rejected', 'Approved'),
            default: 'Waiting Approval'
        }
    }, {
        tableName: 'review'
    }, {
        hooks: {

        }
    });
}
