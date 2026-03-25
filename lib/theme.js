// lib/theme.js
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
};

export function getSystemTheme() {
  if (typeof window === 'undefined') return THEMES.LIGHT;
  return window.matchMedia('(prefers-color-scheme: dark)').matches 
    ? THEMES.DARK 
    : THEMES.LIGHT;
}

export function applyTheme(theme) {
  if (typeof window === 'undefined') return;
  
  const html = document.documentElement;
  
  if (theme === THEMES.AUTO) {
    const system = getSystemTheme();
    html.classList.toggle('dark', system === THEMES.DARK);
  } else {
    html.classList.toggle('dark', theme === THEMES.DARK);
  }
}

export function initTheme() {
  if (typeof window === 'undefined') return THEMES.AUTO;
  
  const saved = localStorage.getItem('theme');
  const theme = saved || THEMES.AUTO;
  
  applyTheme(theme);
  return theme;
}

export function setTheme(theme) {
  if (!Object.values(THEMES).includes(theme)) return;
  
  localStorage.setItem('theme', theme);
  applyTheme(theme);
  
  // Уведомляем другие компоненты об изменении
  window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
}