const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'user'
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      middleName: DataTypes.STRING,
      phone: DataTypes.STRING,
      gender: {
        type: DataTypes.ENUM('M', 'F'),
        defaultValue: 'M'
      },
      tokenVersion: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      loyaltyLevel: {
        type: DataTypes.ENUM('BASE','STANDARD', 'PREMIUM', 'VIP'),
        defaultValue: 'BASE'
      },
      lifetimePoints: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      loyaltyPoints: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
        field: 'loyaltyPoints'
      },
      birthDate: {
        type: DataTypes.DATEONLY,
        field: 'birth_date'
      },
      cardNumber: {
        type: DataTypes.STRING(20),
        field: 'card_number',
        defaultValue: ''
      },
      tripCount: {
        type: DataTypes.INTEGER,
        field: 'tripCount'
      },
      lastBirthdayBonus: {
        type: DataTypes.DATEONLY,
        field: 'lastBirthdayBonus',
        defaultValue: null
      }
  }, {
    hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        }
      }
  });

  User.associate = models => {
    User.hasMany(models.LoyaltyPoint, {
      foreignKey: 'userId',
      as: 'userLoyaltyPoints'
    });
    User.hasMany(models.Order, {
      foreignKey: 'userId',
      as: 'orders'
    });
    User.belongsToMany(models.Achievement, {
      through: models.UserAchievement,
      foreignKey: 'userId',
      otherKey: 'achievementId',
      as: 'achievementProgress'
    });
  };


  

 


  return User;
};