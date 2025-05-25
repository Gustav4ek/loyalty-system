const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const db = require('../models/models'); // <= ВАЖНО
const { User } = db;
const { check, validationResult } = require('express-validator');
const sequelize = require('../config/db.config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const LoyaltyService = require('../services/loyalty.service');

const CODE_LENGTH = 8;
const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

async function generateUniqueReferralCode() {
  while (true) {
    let code = '';
    for (let i = 0; i < CODE_LENGTH; i++) {
      const randomIndex = crypto.randomInt(0, CHARSET.length);
      code += CHARSET[randomIndex];
    }
    const existingUser = await User.findOne({ where: { referralCode: code } });
    if (!existingUser) {
      return code;
    }
  }
}

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
      console.log(req.body);
      const { email, password, referralCode } = req.body;
      console.log(referralCode);
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email уже зарегистрирован' });
      }

      let newReferralCode = await generateUniqueReferralCode();
      let referredByUser = null;
    if (referralCode) {
      referredByUser = await User.findOne({ where: { referralCode } });
      if (referredByUser) {
        try {
          const transaction = await sequelize.transaction();
          const service = new LoyaltyService();
          await service.addPoints(referredByUser.id, 10, 'Приглашенный друг', transaction)
          await transaction.commit();
        } catch(err) {
          if (transaction && !transaction.finished) {
            await transaction.rollback();
          }
        }
     
      }
    }

      const user = await User.create({
        email,
        password,
        referralCode: newReferralCode,
        referredById: referredByUser ? referredByUser.id : null,
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Неверный email или пароль' });
      }
    
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Неверный email или пароль' });
      }

      const token = jwt.sign(
        { 
          id: user.id,
          role: user.role 
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

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