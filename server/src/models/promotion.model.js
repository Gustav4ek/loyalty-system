module.exports = (sequelize, DataTypes) => {
    const Promotion = sequelize.define('Promotion', {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      type: DataTypes.ENUM('route','points','seatType'),
      conditionValue: DataTypes.STRING,
      pointsCost: DataTypes.INTEGER,
      isUnlimited: DataTypes.BOOLEAN,
      startAt: DataTypes.DATE,
      endAt: DataTypes.DATE,
      loyaltyRequired: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isIn: [['BASE', 'STANDARD', 'PREMIUM', 'VIP']]
        }
      },
      discountPercent: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 0,
          max: 100
        }
      }
    });
  
    Promotion.associate = models => {
      Promotion.hasMany(models.Coupon, { foreignKey: 'promotionId', as: 'coupons' });
    };
  
    return Promotion;
  };