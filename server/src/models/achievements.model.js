module.exports = (sequelize, DataTypes) => {
  const Achievement = sequelize.define('Achievement', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    target: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM(
        'TRIPS', 
        'SEAT_TYPE', 
        'MONTHLY', 
        'FRIENDS', 
        'ROUTES'
      ),
      allowNull: false
    },
    seatType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Achievement.associate = models => {
    Achievement.hasMany(models.UserAchievement, {
      foreignKey: 'achievementId',
      as: 'userProgress'    // можно использовать то же имя, что и для belongsToMany
    });
    Achievement.belongsToMany(models.User, {
      through: models.UserAchievement,
      foreignKey: 'achievementId',
      otherKey: 'userId',
      as: 'users'
    });
  };

  return Achievement;
};