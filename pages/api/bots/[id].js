// pages/api/bots/[id].js
import botsDB from '../../../data/bots.js'; // ✅ Без фигурных скобок!

export default function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { id } = req.query;
  const bot = botsDB.find(b => String(b.id) === String(id));

  if (!bot) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'BOT_NOT_FOUND',
        message: `Бот с ID "${id}" не найден`,
      },
    });
  }

  // ✅ Отдаём ВСЕ поля (включая welcomeMessage и guideMarkdown)
  return res.status(200).json({
    success: true,
    data: bot,
    meta: {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    },
  });
}