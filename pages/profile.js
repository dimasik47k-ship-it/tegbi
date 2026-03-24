import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ valid: false, error: 'Method not allowed' });
  }

  try {
    const { id_token } = req.body;

    // Проверка наличия токена
    if (!id_token) {
      return res.status(400).json({ valid: false, error: 'ID token is required' });
    }

    // Получаем Client ID из переменных окружения
    const client_id = process.env.TELEGRAM_CLIENT_ID;
    
    if (!client_id) {
      console.error('TELEGRAM_CLIENT_ID не настроен');
      return res.status(500).json({ valid: false, error: 'Server configuration error' });
    }

    // Получаем публичные ключи Telegram JWKS
    const jwksResponse = await fetch('https://oauth.telegram.org/.well-known/jwks.json');
    const jwks = await jwksResponse.json();

    // Декодируем токен без проверки (чтобы получить header)
    const decodedHeader = JSON.parse(Buffer.from(id_token.split('.')[0], 'base64').toString());

    // Находим подходящий ключ из JWKS
    const keyId = decodedHeader.kid;
    const key = jwks.keys.find(k => k.kid === keyId);

    if (!key) {
      return res.status(401).json({ valid: false, error: 'JWK not found' });
    }

    // Верифицируем подпись токена
    let publicKey;
    if (key.use === 'sig' || !key.use) {
      // RSA или EC ключ
      const pemFormat = `-----BEGIN PUBLIC KEY-----\n` +
        `${key.n}\n-----END PUBLIC KEY-----`;
      
      try {
        const cert = crypto.createVerify('RSA-SHA256');
        cert.update(Buffer.from(id_token.split('.')[0]));
        cert.end();
        
        // Простая проверка подписи (JWT library сделает это правильно)
        jwt.verify(id_token, {
          ...key,
          algorithm: key.alg,
          issuers: ['https://oauth.telegram.org'],
          audience: String(client_id),
          maxAge: '24h'
        }, (err, decoded) => {
          if (err) {
            return res.status(401).json({ valid: false, error: 'Invalid token' });
          }
          
          // Токен валиден - отправляем данные пользователя
          res.status(200).json({
            valid: true,
            user: decoded
          });
        });
        return;
      } catch (jwtErr) {
        console.error('JWT verification failed:', jwtErr.message);
      }
    }

    // Используем стандартную библиотеку jwt
    jwt.verify(id_token, {
      issuer: 'https://oauth.telegram.org',
      audience: String(client_id),
      maxAge: '24h'
    }, { algorithms: ['RS256'] }, (err, decoded) => {
      if (err) {
        return res.status(401).json({ valid: false, error: 'Invalid or expired token' });
      }

      // Преобразуем данные пользователя в удобный формат
      const userData = {
        id: decoded.sub,
        name: decoded.name,
        username: decoded.preferred_username,
        photo_url: decoded.picture,
        phone_number: decoded.phone_number,
        auth_date: decoded.iat
      };

      res.status(200).json({ valid: true, user: userData });
    });

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({ valid: false, error: 'Server error during verification' });
  }
}