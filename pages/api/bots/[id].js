// pages/api/bots/[id].js
// GET /api/bots/5 — детали конкретного бота

import { findBotById } from '../../../lib/bots';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  const bot = findBotById(id);

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
    data: bot, // полный объект
    meta: {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    },
  });
}