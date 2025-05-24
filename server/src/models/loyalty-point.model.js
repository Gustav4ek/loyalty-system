module.exports = (sequelize, DataTypes) => {
  const LoyaltyPoint = sequelize.define('LoyaltyPoints', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('ACCRUAL', 'REDEMPTION'),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: true,

  });

  LoyaltyPoint.associate = models => {
    LoyaltyPoint.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return LoyaltyPoint;
};