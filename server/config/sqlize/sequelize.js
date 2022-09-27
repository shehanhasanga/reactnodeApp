const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('ecommerce', 'root', '', {
	host: process.env.DB_HOST || 'localhost',
	dialect: process.env.DB_DIALECT || 'mysql',
	pool: {
		max: parseInt('50'),
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	logging: false
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize
db.user = require('../../models/sqlize/user')(sequelize, Sequelize);
db.merchant = require('../../models/sqlize/merchant')(sequelize, Sequelize);
db.merchant.hasOne(db.user);
db.user.belongsTo(db.merchant);

// Initialize data input models
// db.district = require('../models/district')(sequelize, Sequelize);
// db.status = require('../models/status')(sequelize, Sequelize);
// db.projectType = require('../models/projectType')(sequelize, Sequelize);
// db.fundingSource = require('../models/fundingSource')(sequelize, Sequelize);
// db.repair = require('../models/repair')(sequelize, Sequelize);
// db.reconstruction = require('../models/reconstruction')(sequelize, Sequelize);
// db.rehabilitation = require('../models/rehabilitation')(sequelize, Sequelize);
// db.reconfundingsource = require('../models/reconfundingsource')(sequelize, Sequelize);
// db.rehabType = require('../models/rehabType')(sequelize, Sequelize);
// db.repairType = require('../models/repairType')(sequelize, Sequelize);
// db.appConfig = require('../models/appConfig')(sequelize, Sequelize);
// db.availableFunds = require('../models/availableFunds')(sequelize, Sequelize);
// db.financialReports = require('../models/financialReports')(sequelize, Sequelize);

// db.role = require('../models/role')(sequelize, Sequelize);
// Initialize service related models
// const rehabilitationService = RehabilitationServiceModel(sequelize, Sequelize);
// const reconstructionService = ReconstructionServiceModel(sequelize, Sequelize);
// const repairServiceModel = RepairServiceModel(sequelize, Sequelize);

// Define relationships among tables, Examples are


// db.userrole = sequelize.define('userrole', {}, {
// 	tableName: 'userrole'
// })
// db.user.belongsToMany(db.role, {
// 	through: db.userrole,
// 	foreignKey: 'UserId'
// })
// db.role.belongsToMany(db.user, {
// 	through: db.userrole,
// 	foreignKey: 'RoleId'
// })
// db.recondistrict = sequelize.define('recondistrict', {}, {
// 	tableName: 'recondistrict'
// })
// db.reconstruction.belongsToMany(db.district, {
// 	through: db.recondistrict,
// 	foreignKey: 'ReconstructionId'
// })
// db.district.belongsToMany(db.reconstruction, {
// 	through: db.recondistrict,
// 	foreignKey: 'DistrictId'
// })
// db.reconstruction.belongsTo(db.status, {
// 	foreignKey: 'StatusId'
// })
// db.reconstruction.belongsTo(db.projectType, {
// 	foreignKey: 'ProjectTypeId'
// })
//
// db.reconstruction.belongsToMany(db.fundingSource, {
// 	through: db.reconfundingsource,
// 	foreignKey: 'ReconstructionId'
// });
// db.fundingSource.belongsToMany(db.reconstruction, {
// 	through: db.reconfundingsource,
// 	foreignKey: 'FundingSourceId'
// });
//
// db.rehabdistrict = sequelize.define('rehabdistrict', {}, {
// 	tableName: 'rehabdistrict'
// })
// db.rehabilitation.belongsToMany(db.district, {
// 	through: db.rehabdistrict,
// 	foreignKey: 'RehabilitationId'
// })
// db.district.belongsToMany(db.rehabilitation, {
// 	through: db.rehabdistrict,
// 	foreignKey: 'DistrictId'
// })
// db.rehabilitation.belongsTo(db.status, {
// 	foreignKey: 'StatusId'
// })
// db.rehabilitation.belongsTo(db.projectType, {
// 	foreignKey: 'ProjectTypeId'
// })
// db.rehabilitation.belongsTo(db.rehabType, {
// 	foreignKey: 'RehabilitationTypeId'
// })
//
// db.repairdistrict = sequelize.define('repairdistrict', {}, {
// 	tableName: 'repairdistrict'
// })
// db.repair.belongsToMany(db.district, {
// 	through: db.repairdistrict,
// 	foreignKey: 'RepairId'
// })
// db.district.belongsToMany(db.repair, {
// 	through: db.repairdistrict,
// 	foreignKey: 'DistrictId'
// })
// db.repair.belongsTo(db.status, {
// 	foreignKey: 'StatusId'
// })
// db.repair.belongsTo(db.projectType, {
// 	foreignKey: 'ProjectTypeId'
// })
// db.repair.belongsTo(db.repairType, {
// 	foreignKey: 'RepairTypeId'
// })
// db.repair.belongsTo(db.fundingSource, {
// 	foreignKey: 'FundingSourceId'
// })

// Synchronize tables
sequelize.sync({
		alter: false
	})
	.then(() => {
		console.log(`Database & tables created!`)

		// db.status.bulkCreate([{
		// 	id: 1,
		// 	status: 'Active'
		// }, {
		// 	id: 2,
		// 	status: 'Completed'
		// }]).catch(function (errors) {
		//
		// })

		// db.projectType.bulkCreate([{
		// 		id: 1,
		// 		projectType: 'Reconstruction',
		// 		displayOrderNo: 3
		// 	}, {
		// 		id: 2,
		// 		projectType: 'Rehabilitation',
		// 		displayOrderNo: 2
		// 	},
		// 	{
		// 		id: 3,
		// 		projectType: 'Repair',
		// 		displayOrderNo: 1
		// 	}
		// ]).catch(function (errors) {
		//
		// })
		//
		// db.rehabType.bulkCreate([{
		// 	id: 1,
		// 	rehabilitationType: 'Rehabilitation'
		// }]).catch(function (errors) {
		//
		// })
		//
		// db.repairType.bulkCreate([{
		// 	id: 1,
		// 	repairType: 'Pothole'
		// }]).catch(function (errors) {
		//
		// })
		//
		// db.appConfig.bulkCreate([{
		// 	id: 1,
		// 	entry: 'KMZLocation',
		// 	entryValue: 'http://184.73.224.75/cofhous/test-v3/kmzall/'
		// }]).catch(function (errors) {
		//
		// })
		//
		// db.fundingSource.bulkCreate([{
		// 		id: 1,
		// 		fundingSource: 'Combined Utility Service',
		// 		shortName: 'cus',
		// 		colorCode: '#688197'
		// 	}, {
		// 		id: 2,
		// 		fundingSource: 'Property Taxes',
		// 		shortName: 'adValorem',
		// 		colorCode: '#F88D2B'
		// 	},
		// 	{
		// 		id: 3,
		// 		fundingSource: 'Third Party',
		// 		shortName: 'thirdParty',
		// 		colorCode: '#00BED6'
		// 	},
		// 	{
		// 		id: 4,
		// 		fundingSource: 'Drainage Fee',
		// 		shortName: 'drainageCharge',
		// 		colorCode: '#33A70F'
		// 	},
		// 	{
		// 		id: 5,
		// 		fundingSource: 'Impact Fees',
		// 		shortName: 'ImpactFees',
		// 		colorCode: '#001F60'
		// 	},
		// 	{
		// 		id: 6,
		// 		fundingSource: 'Not Determined',
		// 		shortName: 'tbdDDSRF',
		// 		colorCode: '#53565A'
		// 	}
		// ]).catch(function (errors) {
		//
		// })
		//
		//
		// db.district.bulkCreate([{
		// 		id: 1,
		// 		district: 'A'
		// 	}, {
		// 		id: 2,
		// 		district: 'B'
		// 	},
		// 	{
		// 		id: 3,
		// 		district: 'C'
		// 	},
		// 	{
		// 		id: 4,
		// 		district: 'D'
		// 	},
		// 	{
		// 		id: 5,
		// 		district: 'E'
		// 	}, {
		// 		id: 6,
		// 		district: 'F'
		// 	}, {
		// 		id: 7,
		// 		district: 'G'
		// 	}, {
		// 		id: 8,
		// 		district: 'H'
		// 	}, {
		// 		id: 9,
		// 		district: 'I'
		// 	}, {
		// 		id: 10,
		// 		district: 'J'
		// 	}, {
		// 		id: 11,
		// 		district: 'K'
		// 	}
		// ]).catch(function (errors) {
		//
		// })
	});




module.exports = {
	db
}
