import '../styles/globals.css';
import Head from 'next/head';

/**
 * Основной компонент приложения
 */
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Основные мета-теги */}
        <title>Tegbi Catalog — Каталог Telegram-ботов</title>
        <meta name="description" content="Каталог проверенных бесплатных Telegram-ботов для бизнеса и личного использования" />
        <meta name="keywords" content="Telegram, боты, каталог, автоматизация, AI, бизнес" />
        <meta name="author" content="seraviellex PROJECTS" />
        
        {/* Open Graph / Facebook / Telegram / WhatsApp */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tegbi.vercel.app" />
        <meta property="og:title" content="Tegbi Catalog — Каталог Telegram-ботов" />
        <meta property="og:description" content="Каталог проверенных бесплатных Telegram-ботов" />
        <meta property="og:image" content="https://tegbi.vercel.app/og-image.png" />
        <meta property="og:site_name" content="Tegbi Catalog" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://tegbi.vercel.app" />
        <meta name="twitter:title" content="Tegbi Catalog" />
        <meta name="twitter:description" content="Каталог Telegram-ботов" />
        <meta name="twitter:image" content="https://tegbi.vercel.app/og-image.png" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Тема */}
        <meta name="theme-color" content="#3B82F6" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;