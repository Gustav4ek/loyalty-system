const authMiddleware = require('../middlewares/auth.middleware');
const express = require('express');
const router = express.Router();
const sequelize = require('../config/db.config');
const db = require('../models/models'); // <= ВАЖНО
const { Achievement, UserAchievement } = db;
const { DataTypes } = require('sequelize');
router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const achievements = await Achievement.findAll({
      include: [{
        model: UserAchievement,
        as: 'userProgress',
        where: { userId: req.user.id },
        required: false,
        attributes: ['progress', 'isCompleted', 'completedAt']
      }],
      attributes: ['id', 'title', 'description', 'target', 'type', 'points', 'icon']
    });

    res.json(achievements);

  } catch (error) {
    console.error('Achievements Error:', error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      details: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
});

module.exports = router;