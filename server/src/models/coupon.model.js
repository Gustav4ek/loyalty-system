module.exports = (sequelize, DataTypes) => {
  const Coupon = sequelize.define('Coupon', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    promotionId: DataTypes.INTEGER,
    code: { type: DataTypes.STRING, unique: true },
    status: DataTypes.ENUM('ACTIVE','USED','EXPIRED'),
    expiryAt: DataTypes.DATE
  });

  Coupon.associate = models => {
    Coupon.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Coupon.belongsTo(models.Promotion, { foreignKey: 'promotionId', as: 'promotion' });
  };

  return Coupon;
};