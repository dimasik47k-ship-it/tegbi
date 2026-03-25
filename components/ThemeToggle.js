import { useState, useEffect } from 'react';
import { THEMES, initTheme, setTheme, getSystemTheme } from '../lib/theme';

export default function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState(THEMES.AUTO);

  useEffect(() => {
    // Инициализация
    const theme = initTheme();
    setCurrentTheme(theme);

    // Слушаем изменения от других компонентов
    const handleThemeChange = (e) => {
      setCurrentTheme(e.detail.theme);
    };
    window.addEventListener('themeChanged', handleThemeChange);

    // Слушаем изменение системной темы (для auto-режима)
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = () => {
      if (currentTheme === THEMES.AUTO) {
        applyTheme(THEMES.AUTO);
      }
    };
    mediaQuery.addEventListener('change', handleSystemChange);

    return () => {
      window.removeEventListener('themeChanged', handleThemeChange);
      mediaQuery.removeEventListener('change', handleSystemChange);
    };
  }, [currentTheme]);

  // Переключение: light → dark → auto → light
  const toggleTheme = () => {
    const next = currentTheme === THEMES.LIGHT 
      ? THEMES.DARK 
      : currentTheme === THEMES.DARK 
        ? THEMES.AUTO 
        : THEMES.LIGHT;
    
    setTheme(next);
    setCurrentTheme(next);
  };

  // Определяем, какую иконку показать
  const isDarkMode = currentTheme === THEMES.DARK || 
    (currentTheme === THEMES.AUTO && getSystemTheme() === THEMES.DARK);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:scale-105"
      aria-label={`Тема: ${currentTheme}. Нажми для смены`}
      title={`Тема: ${currentTheme === 'light' ? 'Светлая' : currentTheme === 'dark' ? 'Тёмная' : 'Авто'}`}
    >
      {/* Иконка: Солнце / Луна / Авто */}
      {currentTheme === THEMES.AUTO ? (
        // 🔄 Авто (комбинированная иконка)
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ) : isDarkMode ? (
        // 🌙 Луна
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ) : (
        // ☀️ Солнце
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
    </button>
  );
}