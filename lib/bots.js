// lib/bots.js
// Импорт твоих реальных данных

// Импортируем под другим именем, чтобы не было конфликта
import { bots as botsData } from '../data/bots'; 

// Экспортируем как `bots` для удобства
export const bots = botsData;

// ========================================
// УТИЛИТЫ
// ========================================

// Найти бота по ID
export function findBotById(id) {
  return bots.find(bot => String(bot.id) === String(id));
}

// Поиск по назанию/юзернейму
export function searchBots(query) {
  if (!query) return bots;
  const q = query.toLowerCase();
  return bots.filter(bot => 
    bot.name.toLowerCase().includes(q) || 
    bot.username.toLowerCase().includes(q)
  );
}

// Фильтр по категории
export function filterByCategory(category) {
  if (!category) return bots;
  return bots.filter(bot => bot.category === category);
}

// Получить уникальные категории
export function getCategories() {
  return [...new Set(bots.map(bot => bot.category))];
}

// Получить статистику
export function getStats() {
  return {
    total: bots.length,
    verified: bots.filter(b => b.verified).length,
    categories: getCategories().length,
  };
}