// pages/api/analytics.js
// 🔥 УПРОЩЁННАЯ ВЕРСИЯ: не пишет в файлы (Vercel не позволяет)

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'POST') {
    // 🔥 Просто возвращаем успех — реальные метрики собирает Vercel Speed Insights
    return res.status(200).json({ success: true });
  }
  
  if (req.method === 'GET') {
    // 🔥 Возвращаем пустую статистику (или используй Vercel Analytics API)
    return res.status(200).json({
      success: true,
      data: {  // ✅ КЛЮЧ "data:" ДОБАВЛЕН!
        pageViews: [],
        uniqueVisitors: 0,
        popularPages: [],
      },
    });
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}