// Lumina-App/pages/api/bots.js
import botsDB from '../../data/bots.js';

export default function handler(req, res) {
  // Разрешаем CORS (чтобы Electron мог запрашивать)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  
  // Отправляем данные
  res.status(200).json(botsDB);
}