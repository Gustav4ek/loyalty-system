const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./src/config/db.config');
const authRoutes = require('./src/routes/auth.routes');
const User = require('./src/models/user.model');
require('dotenv').config();
const profileRoutes = require('./src/routes/profile.routes');
const loyaltyRoutes = require('./src/routes/loyalty.route')
const { DataTypes } = require('sequelize');
const ordersRoutes = require('./src/routes/orders.routes')
const achievementsRoutes = require('./src/routes/achievements.routes')
const promotionRoutes = require( './src/routes/promotion.route');
const couponsRoutes = require('./src/routes/coupons.routes');
require('./src/models/user.model');
require('./src/models/achievements.model');
require('./src/models/userAchievements.model');
const db = require('./src/models/models');

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


async function initializeDatabase() {
  try {
    await db.sequelize.authenticate();
    console.log('Подключение к БД успешно');
    await db.sequelize.sync({ alter: true });
    console.log('Таблицы успешно созданы!');
    
  } catch (error) {
    console.error('Ошибка инициализации БД:', error);
  }
}

async function startServer() {
  await initializeDatabase();

app.use('/api/auth', authRoutes);
app.use('/api/users', profileRoutes);
app.use('/api/points', loyaltyRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/achievements', achievementsRoutes)
app.use('/api/promotions', promotionRoutes)
app.use('/api/coupons', couponsRoutes)

const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
  });
}

startServer()