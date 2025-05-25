const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const db = require('../models/models');
const { Promotion, Coupon } = db;

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const coupons = await Coupon.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Promotion,
          as: 'promotion',
          attributes: ['title', 'description']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(coupons);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении купонов' });
  }
});

router.get('/active', async (req, res) => {
    try {
      const activeCoupons = await Coupon.findAll({
        where: {
          userId: req.user.id,
          status: 'ACTIVE',
          promotionId: 5
        },
        include: [
          {
            model: Promotion,
            as: 'promotion',
            attributes: ['title', 'description']
          }
        ],
        order: [['createdAt', 'DESC']]
      });
  
      res.json(activeCoupons);
    } catch (err) {
      console.error('Ошибка при получении активных купонов:', err);
      res.status(500).json({ error: 'Ошибка при получении активных купонов' });
    }
  });

router.post('/check', async (req, res) => {
    try {
      const { code } = req.body;
      if (!code) return res.status(400).json({ error: 'Код купона обязателен' });
  
      const coupon = await Coupon.findOne({ where: { code } });
  
      if (!coupon) {
        return res.status(404).json({ error: 'Купон не найден' });
      }
  
      if (coupon.status !== 'ACTIVE') {
        return res.status(400).json({ error: 'Купон уже использован или недействителен' });
      }
  
      if (new Date(coupon.expiryAt) < new Date()) {
        return res.status(400).json({ error: 'Срок действия купона истёк' });
      }
  
      coupon.status = 'USED';
      await coupon.save();
  
      return res.json({ message: 'Купон активирован и помечен как использованный' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка при проверке купона' });
    }
  });

module.exports = router;
