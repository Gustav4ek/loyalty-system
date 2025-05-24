

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      trainNumber: DataTypes.STRING,
      route: DataTypes.STRING,
      departure: DataTypes.STRING,
      arrival: DataTypes.STRING,
      duration: DataTypes.STRING,
      type: DataTypes.STRING,
      price: DataTypes.DECIMAL(10, 2),
      seatType: DataTypes.STRING,
      departureDate: DataTypes.DATE,
      arrivalDate: DataTypes.DATE,
      userId: DataTypes.INTEGER,
      pointsUsed: DataTypes.INTEGER,
    finalPrice: DataTypes.DECIMAL(10, 2),
    distance: DataTypes.INTEGER,
    durationMinutes: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    loyaltyLevel: {
      type: DataTypes.ENUM('BASE', 'STANDARD', 'PREMIUM', 'VIP'),
      defaultValue: 'BASE'
    }
    });
  
    Order.associate = models => {
      Order.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    };
  
    return Order;
  };