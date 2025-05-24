const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true' ? { 
        require: true,
        rejectUnauthorized: false 
      } : false
    },
    define: {
      quoteIdentifiers: true,
      underscored: false 
    },
    
    logging: process.env.NODE_ENV === 'development' ? console.log : false
  }
);

// Проверка подключения
sequelize.authenticate()
  .then(() => console.log('✅ Database connection established'))
  .catch(err => console.error('❌ Database connection error:', err));

module.exports = sequelize;