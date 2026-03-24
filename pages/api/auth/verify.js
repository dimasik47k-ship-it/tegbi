import crypto from 'crypto';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ valid: false });
  }

  const { hash, ...userData } = req.body;
  
  // Токен бота (из .env)
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  if (!botToken) {
    console.error('BOT_TOKEN not set');
    return res.status(500).json({ valid: false });
  }

  // Проверяем hash
  const dataCheckString = Object.keys(userData)
    .sort()
    .map(key => `${key}=${userData[key]}`)
    .join('\n');

  const secretKey = crypto
    .createHash('sha256')
    .update(botToken)
    .digest();

  const computedHash = crypto
    .createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');

  const isValid = computedHash === hash;

  if (isValid) {
    // Проверяем что данные свежие (не старше 24 часов)
    const authDate = new Date(userData.auth_date * 1000);
    const now = new Date();
    const hoursDiff = (now - authDate) / (1000 * 60 * 60);

    if (hoursDiff > 24) {
      return res.status(401).json({ valid: false, error: 'Data expired' });
    }

    res.status(200).json({ valid: true, user: userData });
  } else {
    res.status(401).json({ valid: false, error: 'Invalid hash' });
  }
}