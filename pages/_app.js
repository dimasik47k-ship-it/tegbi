// pages/_app.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { initTheme } from '../lib/theme';
import { SpeedInsights } from '@vercel/speed-insights/next';
import ProjectClosedIntro from '../components/ProjectClosedIntro';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [introComplete, setIntroComplete] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    initTheme();

    // Безопасный трекинг
    const handleRouteChange = async (path) => {
      if (typeof window === 'undefined') return;
      try {
        await fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path }),
          keepalive: true,
        });
      } catch (e) {
        // Игнорируем
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    handleRouteChange(router.pathname);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router]);

  // Если интро завершено — показываем сайт
  if (showIntro && !introComplete) {
    return <ProjectClosedIntro onComplete={() => {
      setIntroComplete(true);
      setShowIntro(false);
    }} />;
  }

  return (
    <>
      <Component {...pageProps} />
      <SpeedInsights />
    </>
  );
}

export default MyApp;