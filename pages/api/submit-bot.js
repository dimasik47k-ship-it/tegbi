// pages/api/submit-bot.js
export default async function handler(req, res) {
  // Только POST запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, username, description, category, avatar, contact } = req.body;

  // Валидация
  if (!name || !username || !description) {
    return res.status(400).json({ message: 'Заполните обязательные поля' });
  }

  // Токен бота и Chat ID (из переменных окружения)
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('Telegram credentials not configured');
    return res.status(500).json({ message: 'Ошибка конфигурации' });
  }

  // Формируем сообщение
  const message = `
🤖 <b>Новая заявка на бота!</b>

📛 <b>Название:</b> ${name}
🔗 <b>Username:</b> @${username.replace('@', '')}
📝 <b>Описание:</b> ${description}
🏷 <b>Категория:</b> ${category || 'Не указана'}
🖼 <b>Аватар:</b> ${avatar || 'Не указан'}
👤 <b>Контакт:</b> ${contact || 'Не указан'}

📅 <b>Дата:</b> ${new Date().toLocaleString('ru-RU')}
🌐 <b>С сайта:</b> tegbi.vercel.app/botcreate
  `.trim();

  // Отправляем в Telegram
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'HTML'
        })
      }
    );

    const data = await response.json();

    if (data.ok) {
      return res.status(200).json({ 
        success: true, 
        message: 'Заявка отправлена!' 
      });
    } else {
      console.error('Telegram API error:', data);
      return res.status(500).json({ 
        success: false, 
        message: 'Ошибка отправки в Telegram' 
      });
    }
  } catch (error) {
    console.error('Submission error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Ошибка сервера' 
    });
  }
}