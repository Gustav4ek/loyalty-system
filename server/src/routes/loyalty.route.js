const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');
const LoyaltyService = require('../services/loyalty.service');
const db = require('../models/models'); // <= ВАЖНО
const { User } = db;
const sequelize = require('../config/db.config');
const { DataTypes } = require('sequelize');

router.use(authMiddleware);

router.get('/balance', async (req, res) => {
  try {
    const service = new LoyaltyService();
    const data = await service.getLoyaltyData(req.user.id);
    
    res.json({
      currentBalance: data.currentBalance,
      loyaltyLevel: data.loyaltyLevel,
      lifetimePoints: data.lifetimePoints,
      nextLevel: data.nextLevel
    });
  } catch (error) {
    console.error('Balance error:', error);
    res.status(500).json({ 
      error: 'Ошибка получения баланса',
      details: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
});

router.post('/add-points', 
  [
    check('amount').isInt({ min: -10000, max: 10000 }),
    check('description').optional().trim()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const service = new LoyaltyService();
      console.log('User ID from request:', req.user?.id);
      await service.addPoints(
        req.user.id,
        req.body.amount,
        req.body.description || "Тестовое начисление"
      );
      
      const newBalance = await service.getBalance(req.user.id);
      res.json({ 
        success: true,
        newBalance: newBalance
      });
    } catch (error) {
      console.error('Add points error:', error);
      res.status(500).json({ 
        error: 'Ошибка начисления баллов',
        details: process.env.NODE_ENV === 'development' ? error.message : null
      });
    }
  }
);

router.get('/lifetime-points', async (req, res) => {
    try {
      const service = new LoyaltyService();
      const points = await service.getLifetimePoints(req.user.id);
      res.json({ points });
    } catch (error) {
      res.status(500).json({ error: 'Ошибка получения данных' });
    }
  });

  router.get('/history', async (req, res) => {
    try {
      const service = new LoyaltyService();
      const history = await service.getFullHistory(req.user.id);
      res.json(history);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка получения истории' });
    }
  });

module.exports = router;