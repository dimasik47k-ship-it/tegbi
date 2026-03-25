import { useEffect } from 'react';
import { initTheme } from '../lib/theme';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    initTheme(); // Применяем тему при загрузке приложения
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;