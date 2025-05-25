const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const db = require('../models/models');
const { Order, User, Coupon } = db;
const LoyaltyService = require('../services/loyalty.service');
const AchievementService = require('../services/achievements.service');

const calculatePoints = (order) => {
  let basePoints = order.distance * 0.1;

  switch (order.seatType) {
    case 'Купе':
      basePoints *= 1.2;
      break;
    case 'Бизнес':
    case 'Сидячий':
      basePoints *= 1.4;
      break;
    case 'Плацкарт':
      basePoints *= 1.1;
      break;
  }

  return Math.round(basePoints);
};

const isEligibleForBirthdayBonus = (user) => {
  if (!user.birthDate || user.loyaltyLevel === 'BASE') return false;

  const now = new Date();
  const lastBonusYear = user.lastBirthdayBonus
    ? new Date(user.lastBirthdayBonus).getFullYear()
    : 0;

  return isWithinBirthdayMonth(user.birthDate) && lastBonusYear !== now.getFullYear();
};

const isWithinBirthdayMonth = (date) => {
  const now = new Date();
  const birthDate = new Date(date);
  return birthDate.getMonth() === now.getMonth();
};

const parseDuration = (durationStr) => {
  const hours = parseInt(durationStr.match(/(\d+)ч/)?.[1] || 0);
  const minutes = parseInt(durationStr.match(/(\d+)мин/)?.[1] || 0);
  return hours * 60 + minutes;
};

exports.createOrder = async (req, res) => {
  console.log('[START] Order processing');
  const transaction = await sequelize.transaction();
  const loyaltyService = new LoyaltyService();

  try {
    const user = await User.findByPk(req.user.id, {
      transaction,
      attributes: ['id', 'birthDate', 'loyaltyLevel', 'tripCount', 'lastBirthdayBonus', 'cardNumber'],
    });

    if (user.cardNumber.length === 0) throw new Error('У вас не привязана карта');

    const newTripCount = (user.tripCount || 0) + 1;
    await User.update({ tripCount: newTripCount }, {
      where: { id: user.id },
      transaction
    });

    const currentBalance = await loyaltyService.getBalance(user.id);

    const pointsUsed = req.body.pointsUsed || 0;
    if (pointsUsed > 0) {
      if (currentBalance < pointsUsed) throw new Error('Недостаточно баллов');
      await loyaltyService.addPointsTransaction(
        user.id,
        -pointsUsed,
        `Списание за заказ ${req.body.trainNumber}`,
        transaction
      );
    }

    let routeDiscount = 0;

    let usedCoupon = null;
    if (req.body.route === 'Гомель — Витебск') {
      usedCoupon = await Coupon.findOne({
        where: {
          userId: user.id,
          promotionId: 5,
          status: 'ACTIVE'
        },
        transaction
      });

      if (usedCoupon) {
        routeDiscount = 0.2;
      }
    }

    const basePrice = req.body.price;
    const discountPrice = basePrice * (1 - routeDiscount);
    const finalPrice = discountPrice - pointsUsed * 0.05;

    const order = await Order.create({
      ...req.body,
      userId: user.id,
      finalPrice: finalPrice.toFixed(2),
      durationMinutes: parseDuration(req.body.duration),
      loyaltyLevel: user.loyaltyLevel
    }, { transaction });

    let earnedPoints = 0;
    const bonuses = [];

    if (pointsUsed === 0) {
      earnedPoints = calculatePoints(req.body);

      if (isEligibleForBirthdayBonus(user)) {
        earnedPoints = Math.round(earnedPoints * 1.4);
        bonuses.push('birthday');

        await User.update(
          { lastBirthdayBonus: new Date() },
          {
            where: { id: user.id },
            transaction
          }
        );
      }

      if (newTripCount % 10 === 0 && ['STANDARD', 'PREMIUM', 'VIP'].includes(user.loyaltyLevel)) {
        earnedPoints = Math.round(earnedPoints * 1.4);
        bonuses.push('10th_trip');
      }

      await loyaltyService.addPoints(
        user.id,
        earnedPoints,
        `Начисление за поездку ${req.body.trainNumber}`,
        transaction
      );
    }

    if (usedCoupon) {
      usedCoupon.status = 'USED';
      await usedCoupon.save({ transaction });
    }

    await transaction.commit();

    await AchievementService.checkTripAchievements(user.id, order);
    await AchievementService.checkMonthlyAchievement(user.id);
    await AchievementService.checkRoutesAchievement(user.id);

    res.status(201).json({
      ...order.toJSON(),
      bonuses,
      earnedPoints: pointsUsed === 0 ? earnedPoints : 0
    });

  } catch (error) {
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }

    console.error('Transaction error:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });

    res.status(500).json({
      error: error.message.includes('timeout')
        ? 'Сервер не отвечает. Попробуйте позже'
        : error.message,
      code: error.code || 'TRANSACTION_FAILED',
      details: error.stack
    });
  } finally {
    if (transaction && transaction.finished !== 'commit') {
      await transaction.rollback();
    }
  }
};


  exports.getUserOrders = async (req, res) => {
    try {
      const orders = await Order.findAll({
        where: { userId: req.user.id },
        order: [['createdAt', 'DESC']],
        attributes: [
          'id',
          'trainNumber',
          'route',
          'departure',
          'arrival',
          'duration',
          'type',
          'price',
          'finalPrice',
          'seatType',
          'pointsUsed',
          'createdAt',
          'departureDate',
          'arrivalDate',
          'durationMinutes',
          'loyaltyLevel'
        ],
        raw: true
      });

      const formattedOrders = orders.map(order => ({
        ...order,
        departureDate: order.departureDate?.toISOString(),
        arrivalDate: order.arrivalDate?.toISOString()
      }));
  
      res.json(formattedOrders);
    } catch (error) {
      console.error('Ошибка:', error);
      res.status(500).json({ 
        error: 'Ошибка при получении заказов',
        code: 'ORDERS_FETCH_ERROR'
      });
    }
  };