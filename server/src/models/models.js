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
db.Promotion = require('./promotion.model')(sequelize, Sequelize.DataTypes)
db.Coupon = require('./coupon.model')(sequelize, Sequelize.DataTypes)


Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
