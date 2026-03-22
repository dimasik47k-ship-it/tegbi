import { useState, useMemo, useEffect } from 'react';
import bots from '../data/bots';

export default function BotSearch({ onFilter }) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Получаем все уникальные категории
  const categories = useMemo(() => {
    const cats = [...new Set(bots.map(bot => bot.category))];
    return ['all', ...cats];
  }, []);

  // Фильтрация ботов
  const filteredBots = useMemo(() => {
    return bots.filter(bot => {
      const matchesSearch = query === '' || 
        bot.name.toLowerCase().includes(query.toLowerCase()) ||
        bot.username.toLowerCase().includes(query.toLowerCase()) ||
        (bot.description && bot.description.toLowerCase().includes(query.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || bot.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [query, selectedCategory]);

  // Уведомляем родительский компонент об изменении результатов
  useEffect(() => {
    if (onFilter) {
      onFilter(filteredBots);
    }
  }, [filteredBots, onFilter]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      
      {/* Поисковая строка */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Найти бота по названию или описанию..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-6 py-4 pl-14 text-lg rounded-2xl border-2 border-gray-200 
                       focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 
                       transition-all duration-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Очистить поиск"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Фильтр по категориям */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
            selectedCategory === 'all'
              ? 'bg-blue-500 text-white shadow-lg scale-105'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          Все
        </button>
        {categories.filter(cat => cat !== 'all').map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === cat
                ? 'bg-blue-500 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Счётчик результатов */}
      <div className="mb-4 text-gray-600 dark:text-gray-400">
        Найдено: <span className="font-bold text-blue-600">{filteredBots.length}</span> из {bots.length}
      </div>

      {/* Пустой результат */}
      {filteredBots.length === 0 && query && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Попробуй изменить запрос или выбрать другую категорию
          </p>
        </div>
      )}
    </div>
  );
}