const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Coupon = sequelize.define('Coupon', {
  code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Coupon;