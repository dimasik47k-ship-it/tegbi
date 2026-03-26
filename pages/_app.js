import { useEffect } from 'react';
import { initTheme } from '../lib/theme';
import { SpeedInsights } from '@vercel/speed-insights/next'; // 🔥 Импортируем
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    initTheme();
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <SpeedInsights /> {/* 🔥 Добавляем компонент */}
    </>
  );
}

export default MyApp;