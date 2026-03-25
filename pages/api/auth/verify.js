import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ valid: false, error: 'Method not allowed' });
  }

  try {
    const { id_token, code, redirect_uri } = req.body;

    // Получаем Client ID и Secret
    const client_id = process.env.TELEGRAM_CLIENT_ID;
    const client_secret = process.env.TELEGRAM_CLIENT_SECRET;
    
    if (!client_id) {
      console.error('TELEGRAM_CLIENT_ID не настроен');
      return res.status(500).json({ valid: false, error: 'Server configuration error' });
    }

    let token = id_token;

    // Если есть код, обмениваем его на токен
    if (code && !id_token) {
      if (!client_secret) {
        return res.status(500).json({ valid: false, error: 'Client secret not configured' });
      }

      const tokenResponse = await fetch('https://oauth.telegram.org/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: redirect_uri || process.env.NEXT_PUBLIC_SITE_URL || 'https://tegbi.vercel.app',
          client_id: client_id,
          client_secret: client_secret,
        }),
      });

      const tokenData = await tokenResponse.json();
      
      if (!tokenData.id_token) {
        console.error('Token exchange failed:', tokenData);
        return res.status(401).json({ valid: false, error: 'Failed to exchange code for token' });
      }
      
      token = tokenData.id_token;
    }

    if (!token) {
      return res.status(400).json({ valid: false, error: 'No token provided' });
    }

    // Получаем публичные ключи Telegram
    const jwksResponse = await fetch('https://oauth.telegram.org/.well-known/jwks.json');
    const jwks = await jwksResponse.json();

    // Находим подходящий ключ
    const decodedHeader = JSON.parse(Buffer.from(token.split('.')[0], 'base64').toString());
    const key = jwks.keys.find(k => k.kid === decodedHeader.kid);

    if (!key) {
      return res.status(401).json({ valid: false, error: 'Key not found' });
    }

    // Верифицируем токен
    jwt.verify(token, {
      issuer: 'https://oauth.telegram.org',
      audience: String(client_id),
      algorithms: ['RS256']
    }, (err, decoded) => {
      if (err) {
        console.error('JWT verification failed:', err.message);
        return res.status(401).json({ valid: false, error: 'Invalid or expired token' });
      }

      // Преобразуем данные в удобный формат
      const userData = {
        id: decoded.sub,
        name: decoded.name,
        first_name: decoded.name?.split(' ')[0],
        last_name: decoded.name?.split(' ')[1] || '',
        username: decoded.preferred_username,
        photo_url: decoded.picture,
        phone_number: decoded.phone_number,
        auth_date: decoded.iat,
        sub: decoded.sub
      };

      res.status(200).json({ valid: true, user: userData });
    });

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({ valid: false, error: 'Server error during verification' });
  }
}