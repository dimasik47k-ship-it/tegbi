// lib/bots.js
// Импорт твоих реальных данных (адаптируй путь под свой проект)

import { bots } from '../data/bots'; 

export const bots = botsData || [];

// Утилита: найти бота по ID
export function findBotById(id) {
  return bots.find(bot => String(bot.id) === String(id));
}

// Утилита: поиск по названию/юзернейму
export function searchBots(query) {
  const q = query.toLowerCase();
  return bots.filter(bot => 
    bot.name.toLowerCase().includes(q) || 
    bot.username.toLowerCase().includes(q)
  );
}

// Утилита: фильтры по категории
export function filterByCategory(category) {
  if (!category) return bots;
  return bots.filter(bot => bot.category === category);
}

// Утилита: получить уникальные категории
export function getCategories() {
  return [...new Set(bots.map(bot => bot.category))];
}