import { jwtVerify, createRemoteJWKSet } from 'jose';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ valid: false, error: 'Method not allowed' });
  }

  // Теперь мы ожидаем id_token, а не hash и сырые данные
  const { id_token } = req.body;

  if (!id_token) {
    return res.status(400).json({ valid: false, error: 'Missing id_token' });
  }

  // Ваш Client ID (цифровой ID бота из BotFather)
  // Лучше хранить его в .env, например: TELEGRAM_CLIENT_ID=1234567890
  const clientId = process.env.TELEGRAM_CLIENT_ID; 

  if (!clientId) {
    console.error('TELEGRAM_CLIENT_ID is not set in environment variables');
    return res.status(500).json({ valid: false, error: 'Server configuration error' });
  }

  try {
    // 1. Указываем URL, где лежат публичные ключи Telegram
    const JWKS = createRemoteJWKSet(new URL('https://oauth.telegram.org/.well-known/jwks.json'));

    // 2. Проверяем JWT токен
    const { payload } = await jwtVerify(id_token, JWKS, {
      issuer: 'https://oauth.telegram.org', // Обязательная проверка по документации
      audience: clientId,                   // Токен должен быть выдан именно для вашего Client ID
    });

    // Если код дошел сюда, значит токен подлинный, не истек, и подписан самим Telegram!
    // Данные пользователя лежат внутри payload.

    const verifiedUser = {
      id: payload.id, // Уникальный ID пользователя в Telegram
      first_name: payload.name, // Имя
      username: payload.preferred_username, // Юзернейм (без @)
      photo_url: payload.picture, // Ссылка на аватарку
      auth_date: payload.iat, // Время авторизации
    };

    return res.status(200).json({ valid: true, user: verifiedUser });

  } catch (error) {
    console.error('Ошибка проверки JWT токена:', error.message);
    return res.status(401).json({ valid: false, error: 'Invalid or expired token' });
  }
}