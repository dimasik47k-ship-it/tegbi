// pages/api/auth/verify.js
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ valid: false });
  }

  try {
    const { auth_date, hash, ...restData } = req.body;
    
    // Получаем токен бота из переменных окружения
    const botToken = process.env.BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
    
    if (!botToken || !hash || !auth_date) {
      return res.status(400).json({ valid: false, error: 'Missing required fields' });
    }

    // Вычисляем секретный ключ
    // SECRET_KEY = SHA256(bot_token)
    const secretKey = crypto.createHash('sha256').update(botToken).digest('base64');

    // Сортируем ключи для проверки хеша
    const dataArray = Object.keys(restData)
      .filter(key => key !== 'hash' && key !== 'auth_date')
      .sort()
      .map(key => `${key}=${restData[key]}`)
      .join('\n');

    // Создаем проверяемую строку
    const checkString = Buffer.from(JSON.stringify({
      ...restData,
      auth_date: auth_date
    }, null, 0), 'utf8').toString('base64');

    // Проверяем подпись
    const computedHash = crypto.createHmac('sha256', secretKey)
      .update(checkString)
      .digest('base64');

    if (computedHash !== hash) {
      return res.status(401).json({ valid: false, error: 'Invalid signature' });
    }

    // Все ок - возвращаем данные пользователя
    res.status(200).json({ 
      valid: true, 
      user: {
        id: restData.id,
        first_name: restData.first_name,
        last_name: restData.last_name || '',
        username: restData.username ? '@' + restData.username : '',
        photo_url: restData.photo_url,
        auth_date: auth_date
      }
    });

  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ valid: false, error: 'Server error' });
  }
}