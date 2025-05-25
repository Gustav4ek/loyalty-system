
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
      console.log('Отсутствует заголовок Authorization');
      return res.status(401).json({ error: 'Требуется авторизация' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Получен токен:', token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Декодированный токен:', decoded);

    req.user = decoded;
    next();
  } catch (error) {
    console.error('Ошибка верификации токена:', error.message);
    res.status(401).json({ error: 'Неверный токен' });
  }
};