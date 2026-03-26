// lib/analytics.js
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const ANALYTICS_FILE = 'data/analytics.json';

// Инициализация файла аналитики
export async function initAnalytics() {
  try {
    await readFile(ANALYTICS_FILE, 'utf8');
  } catch (error) {
    // Файл не существует — создаём
    const initialData = {
      pageViews: [],
      visitors: new Set(),
      events: [],
      createdAt: new Date().toISOString(),
    };
    await writeFile(ANALYTICS_FILE, JSON.stringify(initialData, null, 2));
  }
}

// Запись просмотра страницы
export async function trackPageView(path, userAgent, ip) {
  const data = await getAnalytics();
  
  const view = {
    path,
    timestamp: new Date().toISOString(),
    userAgent,
    ip: hashIP(ip), // Хешируем IP для приватности
    referrer: '',
  };

  data.pageViews.push(view);
  
  // Храним только последние 10000 записей
  if (data.pageViews.length > 10000) {
    data.pageViews = data.pageViews.slice(-10000);
  }

  await saveAnalytics(data);
  return view;
}

// Хеширование IP (для приватности)
function hashIP(ip) {
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

// Получить аналитику
export async function getAnalytics() {
  try {
    const fileData = await readFile(ANALYTICS_FILE, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    return {
      pageViews: [],
      visitors: [],
      events: [],
      createdAt: new Date().toISOString(),
    };
  }
}

// Сохранить аналитику
export async function saveAnalytics(data) {
  await writeFile(ANALYTICS_FILE, JSON.stringify(data, null, 2));
}

// Получить статистику за период
export function getStats(data, days = 7) {
  const now = new Date();
  const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  const recentViews = data.pageViews.filter(
    (view) => new Date(view.timestamp) > cutoffDate
  );

  const uniqueVisitors = new Set(recentViews.map((v) => v.ip)).size;
  const totalViews = recentViews.length;

  // Популярные страницы
  const pageCounts = {};
  recentViews.forEach((view) => {
    pageCounts[view.path] = (pageCounts[view.path] || 0) + 1;
  });

  const popularPages = Object.entries(pageCounts)
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Просмотры по дням
  const viewsByDay = {};
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = date.toISOString().split('T')[0];
    viewsByDay[dateStr] = 0;
  }

  recentViews.forEach((view) => {
    const dateStr = view.timestamp.split('T')[0];
    if (viewsByDay[dateStr] !== undefined) {
      viewsByDay[dateStr]++;
    }
  });

  return {
    totalViews,
    uniqueVisitors,
    popularPages,
    viewsByDay,
    averagePerDay: Math.round(totalViews / days),
  };
}