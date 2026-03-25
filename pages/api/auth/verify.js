import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ valid: false, error: 'Method not allowed' });
  }

  try {
    const { id_token, code, redirect_uri, state } = req.body;

    const client_id = process.env.TELEGRAM_CLIENT_ID;
    const client_secret = process.env.TELEGRAM_CLIENT_SECRET;
    
    if (!client_id) {
      console.error('❌ TELEGRAM_CLIENT_ID не настроен');
      return res.status(500).json({ valid: false, error: 'Server configuration error' });
    }

    let token = id_token;

    // Если есть код - обмениваем на токен
    if (code && !id_token) {
      if (!client_secret) {
        console.warn('⚠️ TELEGRAM_CLIENT_SECRET не настроен, пробуем без него');
      }

      const tokenUrl = 'https://oauth.telegram.org/token';
      const params = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri || process.env.NEXT_PUBLIC_SITE_URL || 'https://tegbi.vercel.app/profile',
        client_id: client_id,
      });

      if (client_secret) {
        params.append('client_secret', client_secret);
      }

      console.log('🔑 Обмениваем код на токен...');
      
      const tokenResponse = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
      });

      const tokenData = await tokenResponse.json();
      
      if (!tokenResponse.ok) {
        console.error('❌ Ошибка обмена токена:', tokenData);
        return res.status(401).json({ 
          valid: false, 
          error: tokenData.error_description || 'Failed to exchange code for token' 
        });
      }

      if (!tokenData.id_token) {
        console.error('❌ Нет id_token в ответе:', tokenData);
        return res.status(401).json({ valid: false, error: 'No id_token in response' });
      }
      
      token = tokenData.id_token;
      console.log('✅ Токен получен');
    }

    if (!token) {
      return res.status(400).json({ valid: false, error: 'No token provided' });
    }

    // Получаем публичные ключи Telegram
    const jwksResponse = await fetch('https://oauth.telegram.org/.well-known/jwks.json');
    const jwks = await jwksResponse.json();

    // Декодируем header токена
    const decodedHeader = JSON.parse(Buffer.from(token.split('.')[0], 'base64').toString());
    const key = jwks.keys.find(k => k.kid === decodedHeader.kid);

    if (!key) {
      console.error('❌ Key not found for kid:', decodedHeader.kid);
      return res.status(401).json({ valid: false, error: 'Key not found' });
    }

    // Конвертируем JWK в PEM
    const pem = jwkToPem(key);

    // Верифицируем токен
    const decoded = jwt.verify(token, pem, {
      issuer: 'https://oauth.telegram.org',
      audience: String(client_id),
      algorithms: ['RS256']
    });

    console.log('✅ Токен верифицирован:', decoded);

    // Формируем данные пользователя
    const userData = {
      id: decoded.sub,
      name: decoded.name,
      first_name: decoded.name?.split(' ')[0],
      last_name: decoded.name?.split(' ')?.slice(1).join(' ') || '',
      username: decoded.preferred_username,
      photo_url: decoded.picture,
      phone_number: decoded.phone_number,
      auth_date: decoded.iat,
      sub: decoded.sub
    };

    res.status(200).json({ valid: true, user: userData });

  } catch (error) {
    console.error('❌ Token verification error:', error.message);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ valid: false, error: 'Token expired' });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ valid: false, error: 'Invalid token' });
    }
    
    res.status(500).json({ valid: false, error: 'Server error during verification' });
  }
}