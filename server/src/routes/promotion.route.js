const express = require('express');
const router = express.Router();
const PromotionService = require('../services/promotion.service');
const authMiddleware = require('../middlewares/auth.middleware');

router.use(authMiddleware);
router.get('/', async (req, res) => {
  const serv = new PromotionService();
  const promos = await serv.listAvailable(req.user.id);
  res.json(promos);
});

router.post('/:id/redeem', async (req, res) => {
  try {
    const serv = new PromotionService();
    const result = await serv.redeem(req.user.id, req.params.id);
    res.json({ success: true, ...result });
  } catch(e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;