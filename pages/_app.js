import { useEffect } from 'react';
import { initTheme } from '../lib/theme';
import '../styles/globals.css'; // 🔥 ДОБАВЬ ЭТУ СТРОКУ!

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    initTheme();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;