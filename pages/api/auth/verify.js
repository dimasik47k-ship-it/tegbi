import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ valid: false, error: 'Method not allowed' });
  }

  try {
    const { hash, auth_date, ...userData } = req.body;

    // Проверка обязательных полей
    if (!hash || !auth_date) {
      return res.status(400).json({ 
        valid: false, 
        error: 'Отсутствуют обязательные поля (hash, auth_date)' 
      });
    }

    // Получаем токен бота из переменных окружения
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    
    if (!botToken) {
      console.error('TELEGRAM_BOT_TOKEN не настроен');
      return res.status(500).json({ 
        valid: false, 
        error: 'Ошибка конфигурации сервера' 
      });
    }

    // Проверяем что данные свежие (не старше 24 часов)
    const authTime = new Date(auth_date * 1000);
    const now = new Date();
    const hoursDiff = (now - authTime) / (1000 * 60 * 60);

    if (hoursDiff > 24) {
      return res.status(401).json({ 
        valid: false, 
        error: 'Данные устарели (прошло более 24 часов)' 
      });
    }

    // Вычисляем секретный ключ: SHA256(bot_token)
    const secretKey = crypto
      .createHash('sha256')
      .update(botToken)
      .digest();

    // Формируем строку для проверки (ключи сортируются)
    const dataCheckString = Object.keys(userData)
      .sort()
      .map(key => `${key}=${userData[key]}`)
      .join('\n');

    // Вычисляем хеш
    const computedHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    // Сравниваем хеши
    if (computedHash !== hash) {
      console.error('❌ Hash не совпадает');
      console.error('Ожидался:', hash);
      console.error('Получен:', computedHash);
      return res.status(401).json({ 
        valid: false, 
        error: 'Неверная подпись данных' 
      });
    }

    // Всё ок - возвращаем данные пользователя
    const userProfile = {
      id: userData.id,
      first_name: userData.first_name,
      last_name: userData.last_name || '',
      username: userData.username || '',
      photo_url: userData.photo_url || '',
      auth_date: userData.auth_date
    };

    res.status(200).json({ 
      valid: true, 
      user: userProfile 
    });

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({ 
      valid: false, 
      error: 'Ошибка сервера при проверке' 
    });
  }
}