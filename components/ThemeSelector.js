import { useEffect } from 'react';
import { THEMES, setTheme, applyTheme, getSystemTheme } from '../lib/theme';

export default function ThemeSelector({ value, onChange }) {
  const themes = [
    { id: THEMES.LIGHT, label: 'Светлая', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )},
    { id: THEMES.DARK, label: 'Тёмная', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    )},
    { id: THEMES.AUTO, label: 'Авто', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    )},
  ];

  const handleSelect = (themeId) => {
    setTheme(themeId);
    onChange?.(themeId);
  };

  // Синхронизация с внешним изменением темы
  useEffect(() => {
    const handleThemeChange = (e) => {
      onChange?.(e.detail.theme);
    };
    window.addEventListener('themeChanged', handleThemeChange);
    return () => window.removeEventListener('themeChanged', handleThemeChange);
  }, [onChange]);

  return (
    <div className="grid grid-cols-3 gap-3">
      {themes.map((theme) => {
        const isActive = value === theme.id;
        const isSystemDark = getSystemTheme() === THEMES.DARK;
        const shouldShowDark = theme.id === THEMES.DARK || 
          (theme.id === THEMES.AUTO && isSystemDark);

        return (
          <button
            key={theme.id}
            onClick={() => handleSelect(theme.id)}
            className={`
              py-3 px-2 rounded-xl font-medium transition-all duration-200 
              flex flex-col items-center gap-2 text-sm
              ${isActive 
                ? 'bg-blue-500 text-white shadow-lg scale-105 ring-2 ring-blue-300' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }
              ${shouldShowDark ? 'dark' : ''}
            `}
          >
            <span className={`${isActive ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`}>
              {theme.icon}
            </span>
            <span>{theme.label}</span>
            {theme.id === THEMES.AUTO && (
              <span className="text-xs opacity-70">
                {isSystemDark ? '🌙' : '☀️'}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}