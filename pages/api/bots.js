// pages/api/bots.js
import botsDB from '../../data/bots.js'; // ✅ Без фигурных скобок!

export default function handler(req, res) {
  // CORS для мобильного приложения
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Только GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 🔥 ЗАЩИТА: проверяем что данные — массив
  const bots = Array.isArray(botsDB) ? botsDB : [];
  
  if (bots.length === 0) {
    console.warn('⚠️ Боты не загружены или пустой массив');
  }

  // 🔍 Поиск по названию/юзернейму
  let filtered = [...bots];
  if (req.query.q) {
    const query = req.query.q.toLowerCase();
    filtered = filtered.filter(bot => 
      bot.name?.toLowerCase().includes(query) || 
      bot.username?.toLowerCase().includes(query)
    );
  }

  // 🏷️ Фильтр по категории
  if (req.query.category) {
    filtered = filtered.filter(bot => bot.category === req.query.category);
  }

  // 📄 Пагинация
  const page = parseInt(req.query.page) || 1;
  const limit = Math.min(parseInt(req.query.limit) || 20, 100);
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  // 🔒 Только публичные поля (без welcomeMessage/guideMarkdown)
  const publicBots = paginated.map(bot => ({
    id: bot.id,
    name: bot.name,
    username: bot.username,
    category: bot.category,
    avatar: bot.avatar,
    verified: bot.verified || false,
    verifiedDate: bot.verifiedDate || null,
  }));

  // Кэширование на 60 секунд
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

  return res.status(200).json({
    success: true,
    data: {
      bots: publicBots,
      pagination: {
        current_page: page,
        per_page: limit,
        total: filtered.length,
        total_pages: Math.ceil(filtered.length / limit),
      },
    },
    meta: {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    },
  });
}