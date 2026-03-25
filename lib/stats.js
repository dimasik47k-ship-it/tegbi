// Уникальный счётчик просмотров (без повторений)
export function trackProfileView(userId) {
  if (typeof window === 'undefined') return;
  
  const viewedProfiles = JSON.parse(localStorage.getItem('viewed_profiles') || '{}');
  const today = new Date().toDateString();
  
  // Проверяем, смотрел ли уже этот пользователь сегодня
  if (!viewedProfiles[userId] || viewedProfiles[userId] !== today) {
    // Увеличиваем счётчик
    const stats = JSON.parse(localStorage.getItem('profile_stats') || '{}');
    stats[userId] = (stats[userId] || 0) + 1;
    localStorage.setItem('profile_stats', JSON.stringify(stats));
    
    // Запоминаем что смотрели сегодня
    viewedProfiles[userId] = today;
    localStorage.setItem('viewed_profiles', JSON.stringify(viewedProfiles));
  }
}

// Получение статистики
export function getProfileStats(userId) {
  if (typeof window === 'undefined') return { views: 0, lastActive: null };
  
  const stats = JSON.parse(localStorage.getItem('profile_stats') || '{}');
  const lastActive = localStorage.getItem(`last_active_${userId}`);
  
  return {
    views: stats[userId] || 0,
    lastActive: lastActive ? new Date(lastActive) : null,
  };
}

// Обновление последней активности
export function updateLastActive(userId) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`last_active_${userId}`, new Date().toISOString());
}