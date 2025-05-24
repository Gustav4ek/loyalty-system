const Sequelize = require('sequelize');
const sequelize = require('../config/db.config');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user.model')(sequelize, Sequelize.DataTypes);
db.Achievement = require('./achievements.model')(sequelize, Sequelize.DataTypes);
db.UserAchievement = require('./userAchievements.model')(sequelize, Sequelize.DataTypes);
db.LoyaltyPoint = require('./loyalty-point.model')(sequelize, Sequelize.DataTypes)
db.Order = require('./orders.model')(sequelize, Sequelize.DataTypes)

// Выполняем ассоциации
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
