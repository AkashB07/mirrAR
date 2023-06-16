const Sequelize = require('sequelize');
const sequelize = require('../util/database');

//Creating Variant table
const Variant = sequelize.define('variant', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sku: {
        type: Sequelize.STRING,
        allowNull: false
    },
    additionalCost: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    count: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = Variant;