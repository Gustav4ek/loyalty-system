const express = require('express');
const router = express.Router();
const db = require('../models/models'); // <= ВАЖНО
const { User } = db;
const { check, validationResult } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/db.config');
const { DataTypes } = require('sequelize');


router.use(authMiddleware);

router.get('/me', async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: [
        'id',
        'firstName',
        'lastName',
        'middleName',
        'email',
        'phone',
        'gender',
        'birthDate',
        'cardNumber',
        'loyaltyLevel',
        'createdAt'
      ]
    });

    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    res.json(user);
  } catch (error) {
    console.error('Ошибка получения профиля:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Обновление данных профиля
router.put('/me', 
  [
    check('birthDate').optional().isISO8601().toDate(),
    check('phone').optional().isMobilePhone()
  ],
  async (req, res) => {
    console.log('Received data:', req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ details: errors.array() });
    }

    try {
      const allowedFields = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        middleName: req.body.middleName,
        phone: req.body.phone,
        gender: req.body.gender,
        birthDate: req.body.birthDate,
      };

      const [updatedCount] = await User.update(allowedFields, {
        where: { id: req.user.id },
        individualHooks: true
      });

      if (updatedCount === 0) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      const updatedUser = await User.findByPk(req.user.id, {
        attributes: { exclude: ['password', 'cardNumber'] }
      });

      res.json(updatedUser);
    } catch (error) {
      console.error('Ошибка обновления профиля:', error);
      res.status(500).json({ error: 'Ошибка обновления' });
    }
  }
);

router.post('/me/card',
  [
    check('cardNumber')
      .isLength({ min: 4, max: 4 }).withMessage('Должно быть 4 последние цифры')
      .isNumeric().withMessage('Должны быть только цифры')
      .custom(value => {
        if (!/^\d{4}$/.test(value)) {
          throw new Error('Неверный формат карты');
        }
        return true;
      })
  ],
  async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id);
      
      if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      // Обновляем карту НА ЭКЗЕМПЛЯРЕ пользователя
      await user.update({ 
        cardNumber: req.body.cardNumber.slice(-4)
      });

      res.json({ 
        success: true,
        cardNumber: user.cardNumber,  // Используем уже обновленный экземпляр
        message: 'Карта успешно привязана'
      });

    } catch (error) {
      console.error('Ошибка:', error);
      res.status(500).json({ 
        error: 'Ошибка сервера',
        details: error.message
      });
    }
  }
);

// POST /api/users/change-password - Смена пароля
router.post('/change-password', async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    
    const isValid = await bcrypt.compare(oldPassword, user.password);
    if (!isValid) {
      return res.status(400).json({ error: 'Неверный текущий пароль' });
    }
    
    user.password = newPassword;
    await user.save();
    const newTokenVersion = user.tokenVersion + 1;
    await user.update({ tokenVersion: newTokenVersion });

    res.json({ 
      message: 'Пароль успешно изменен',
      tokenVersion: newTokenVersion 
    });
  } catch (error) {
    console.error('Ошибка смены пароля:', error);
    res.status(500).json({ error: 'Ошибка смены пароля' });
  }
});

module.exports = router;