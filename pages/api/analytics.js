// pages/api/analytics.js
import { trackPageView, getAnalytics, getStats } from '../../lib/analytics';

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'POST') {
    // Трекинг просмотра
    const { path } = req.body;
    const userAgent = req.headers['user-agent'] || '';
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';

    await trackPageView(path, userAgent, ip);

    return res.status(200).json({ success: true });
  }

  if (method === 'GET') {
    // Получение статистики
    const { days = 7 } = req.query;
    const data = await getAnalytics();
    const stats = getStats(data, parseInt(days));

    return res.status(200).json({
      success: true,
      data: stats,
      meta: {
        period: `${days} days`,
        timestamp: new Date().toISOString(),
      },
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}