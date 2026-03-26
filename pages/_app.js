// Добавь в pages/_app.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { initTheme } from '../lib/theme';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    initTheme();

    // Трекинг просмотров
    const handleRouteChange = (path) => {
      if (typeof window !== 'undefined') {
        fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path }),
        }).catch(console.error);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    handleRouteChange(router.pathname); // Первый просмотр

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