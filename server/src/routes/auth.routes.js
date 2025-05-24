const express = require('express');
const router = express.Router();
const db = require('../models/models'); // <= ВАЖНО
const { User } = db;
const { check, validationResult } = require('express-validator');
const sequelize = require('../config/db.config');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Регистрация
router.post('/register', 
  [
    check('email').isEmail().normalizeEmail({
        gmail_remove_dots: false,
      gmail_remove_subaddress: false,
      outlookdotcom_remove_subaddress: false,
      yahoo_remove_subaddress: false,
      icloud_remove_subaddress: false
    }),
    check('password').isLength({ min: 6 })
  ],
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email уже зарегистрирован' });
      }

      const user = await User.create({
        email,
        password,
        role: 'user'
      });

      res.status(201).json({
        id: user.id,
        email: user.email,
        role: user.role
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  }
);

router.post('/login', 
  [
    check('email').isEmail().normalizeEmail({
        gmail_remove_dots: false,
      gmail_remove_subaddress: false,
      outlookdotcom_remove_subaddress: false,
      yahoo_remove_subaddress: false,
      icloud_remove_subaddress: false
    }),
    check('password').exists()
  ],
  async (req, res) => {
    // Валидация входных данных
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      // 1. Поиск пользователя по email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Неверный email или пароль' });
      }
    
      // 2. Проверка пароля
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Неверный email или пароль' });
      }

      // 3. Генерация JWT токена
      const token = jwt.sign(
        { 
          id: user.id,
          role: user.role 
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // 4. Отправка ответа
      res.json({
        token,
        role: user.role,
        email: user.email
      });

    } catch (error) {
      console.error('Ошибка входа:', error);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  }
);

module.exports = router;