// pages/api/bots/index.js
// GET /api/bots — список всех ботов
// Поддерживает: ?category=... & ?q=... & ?page=... & ?limit=...

import { bots, searchBots, filterByCategory } from '../../../lib/bots';

export default function handler(req, res) {
  // Только GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let result = [...bots];

  // 🔍 Поиск по названию
  if (req.query.q) {
    result = searchBots(req.query.q);
  }

  // 🏷️ Фильтр по категории
  if (req.query.category) {
    result = filterByCategory(req.query.category);
  }

  // 📄 Пагинация
  const page = parseInt(req.query.page) || 1;
  const limit = Math.min(parseInt(req.query.limit) || 20, 100);
  const start = (page - 1) * limit;
  const end = start + limit;

  const paginated = result.slice(start, end);

  // ✅ Возвращаем ТОЛЬКО публичные поля (без welcomeMessage/guideMarkdown)
  const publicBots = paginated.map(bot => ({
    id: bot.id,
    name: bot.name,
    username: bot.username,
    category: bot.category,
    avatar: bot.avatar,
    verified: bot.verified,
    verifiedDate: bot.verifiedDate,
    // 🔒 welcomeMessage и guideMarkdown НЕ отдаём через API списка
  }));

  return res.status(200).json({
    success: true,
    data: {
      bots: publicBots,
      pagination: {
        current_page: page,
        per_page: limit,
        total: result.length,
        total_pages: Math.ceil(result.length / limit),
      },
    },
    meta: {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    },
  });
}