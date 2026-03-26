// pages/_app.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { initTheme } from '../lib/theme';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    initTheme();

    // 🔥 Безопасный трекинг: не блокирует работу если API не отвечает
    const handleRouteChange = async (path) => {
      if (typeof window === 'undefined') return;
      
      try {
        await fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path }),
          keepalive: true, // не блокирует навигацию
        });
      } catch (err) {
        // 🔥 Игнорируем ошибки — Vercel Speed Insights уже собирает метрики
        console.debug('Analytics tracking skipped:', err);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    handleRouteChange(router.pathname);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return (
    <>
      <Component {...pageProps} />
      <SpeedInsights />
    </>
  );
}

export default MyApp;