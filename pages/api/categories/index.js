// pages/api/categories/index.js
// GET /api/categories — список уникальных категорий

import { getCategories, bots } from '../../../lib/bots';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const categories = getCategories();

  // Считаем количество ботов в каждой категории
  const withCount = categories.map(cat => ({
    name: cat,
    count: bots.filter(b => b.category === cat).length,
  }));

  return res.status(200).json({
    success: true,
    data: {
      categories: withCount,
      total: categories.length,
    },
    meta: {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    },
  });
}