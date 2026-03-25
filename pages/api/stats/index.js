// pages/api/stats/index.js
import botsDB from '../../../data/bots.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const categories = [...new Set(botsDB.map(b => b.category))];
  const verifiedCount = botsDB.filter(b => b.verified).length;

  // Считаем по категориям
  const byCategory = {};
  categories.forEach(cat => {
    byCategory[cat] = botsDB.filter(b => b.category === cat).length;
  });

  return res.status(200).json({
    success: true,
    data: {
      total_bots: botsDB.length,
      verified_bots: verifiedCount,
      categories_count: categories.length,
      by_category: byCategory,
    },
    meta: {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    },
  });
}