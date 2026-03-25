// pages/api/stats/index.js
// GET /api/stats — статистика каталога

import { bots, getCategories } from '../../../lib/bots';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const categories = getCategories();
  const verifiedCount = bots.filter(b => b.verified).length;

  // Считаем ботов по категориям
  const byCategory = {};
  categories.forEach(cat => {
    byCategory[cat] = bots.filter(b => b.category === cat).length;
  });

  return res.status(200).json({
    success: true,
    data: {
      total_bots: bots.length,
      verified_bots: verifiedCount,
      categories_count: categories.length,
      by_category: byCategory,
      last_bot_id: bots.length > 0 ? bots[bots.length - 1].id : null,
    },
    meta: {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    },
  });
}