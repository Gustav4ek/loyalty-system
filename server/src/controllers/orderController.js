const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const db = require('../models/models');
const { Order, User } = db;
const LoyaltyService = require('../services/loyalty.service')
const AchievementService = require('../services/achievements.service');

// Вспомогательная функция для расчета баллов
const calculatePoints = (order) => {
  let basePoints = order.distance * 0.1;
  
  switch(order.seatType) {
    case 'Купе':
      basePoints *= 1.2;
      break;
    case 'Бизнес':
      basePoints *= 1.4;
      break;
    case 'Сидячий':
      basePoints *= 1.4;
      break;
    case 'Плацкарт':
        basePoints*= 1.1;
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

  // Проверяем что бонус не получали в текущем году
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
    // 1. Получение пользователя
    console.log('[STEP 1] Fetching user');
    const user = await User.findByPk(req.user.id, { 
      transaction,
      attributes: ['id', 'birthDate', 'loyaltyLevel', 'tripCount', 'lastBirthdayBonus'],
    });

    // 2. Обновление счетчика поездок
    console.log('[STEP 2] Updating trip count');
    const newTripCount = (user.tripCount || 0) + 1;
    await User.update({ tripCount: newTripCount },
      {
        where: { id: user.id }, // Явное указание условия
        transaction
      });

    // 3. Проверка баланса
    console.log('[STEP 3] Checking balance');
    const currentBalance = await loyaltyService.getBalance(req.user.id);
    
    // 4. Обработка списания баллов
    const pointsUsed = req.body.pointsUsed || 0;
    if (pointsUsed > 0) {
      if (currentBalance < pointsUsed) throw new Error('Недостаточно баллов');
      console.log('[STEP 4] Deducting points');
     await loyaltyService.addPointsTransaction(
        user.id,
        -pointsUsed,
        `Списание за заказ ${req.body.trainNumber}`,
        transaction
      );
    }

    // 5. Создание заказа
    console.log('[STEP 5] Creating order');
    const order = await Order.create({
      ...req.body,
      userId: user.id,
      finalPrice: (req.body.price - (pointsUsed * 0.05)).toFixed(2),
      durationMinutes: parseDuration(req.body.duration),
      loyaltyLevel: user.loyaltyLevel
    }, { transaction });

    // 6. Начисление баллов
    let earnedPoints = 0;
    const bonuses = [];
    if (pointsUsed === 0) {
      console.log('[STEP 6] Calculating points');
      earnedPoints = calculatePoints(req.body);

      // Логирование промежуточных данных
      console.log('Pre-bonus points:', earnedPoints);
      console.log('User status:', user.loyaltyLevel);
      console.log('Trip count:', newTripCount);

      if (isEligibleForBirthdayBonus(user)) {
        earnedPoints = Math.round(earnedPoints * 1.4);
        bonuses.push('birthday');
        
        // Обновляем дату последнего получения бонуса
        await User.update(
          { lastBirthdayBonus: new Date() },
          { 
            where: { id: user.id },
            transaction 
          }
        );
      }

      // Бонус за 10 поездок
      if (newTripCount % 10 === 0 && ['STANDARD', 'PREMIUM', 'VIP'].includes(user.loyaltyLevel)) {
        console.log('Applying 10th trip bonus');
        earnedPoints = Math.round(earnedPoints * 1.4);
        bonuses.push('10th_trip');
      }

      console.log('Final points:', earnedPoints);
      await loyaltyService.addPoints(
        user.id,
        earnedPoints,
        `Начисление за поездку ${req.body.trainNumber}`,
        transaction
      );
    }

    // 7. Фиксация транзакции

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
    // 8. Откат транзакции при ошибке
    console.error('[ERROR]', error);
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }

    console.error('Transaction error:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    
    // Улучшенное сообщение об ошибке
    const errorMessage = error.message.includes('timeout') 
      ? 'Сервер не отвечает. Попробуйте позже' 
      : error.message;

    res.status(500).json({
      error: errorMessage,
      code: error.code || 'TRANSACTION_FAILED',
      details: error.stack
    });
  } finally {
  
     if (transaction.finished !== 'commit') {
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
  
      // Преобразование дат в ISO формат
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