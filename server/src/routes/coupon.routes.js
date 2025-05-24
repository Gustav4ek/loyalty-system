const express = require('express');
const router = express.Router();
const { Coupon } = require('../models/coupon.model');
const auth = require('../middlewares/auth.middleware');

router.post('/check', auth('partner'), async (req, res) => {
  const { code } = req.body;
  const coupon = await Coupon.findOne({ 
    where: { code },
    include: [User] 
  });

  if (!coupon) return res.status(404).json({ error: 'Купон не найден' });
  if (!coupon.is_active) return res.status(400).json({ error: 'Купон уже использован' });
  if (new Date() > coupon.expires_at) return res.status(400).json({ error: 'Срок действия купона истек' });

  await coupon.update({ is_active: false });
  res.json({ message: 'Купон успешно активирован', user: coupon.User.email });
});