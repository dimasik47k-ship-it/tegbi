import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function UpdatesPage() {
  const [visibleCards, setVisibleCards] = useState([]);

  // Анимация появления при скролле
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => [...prev, entry.target.id]);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.update-card').forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const updates = [
    {
      version: '1.2.0',
      date: '2026-01-20',
      title: 'Живые темы и умный поиск',
      description: 'Полный редизайн интерфейса с тёмной темой и мгновенным поиском',
      image: 'theme-search',
      features: [
        'Автоматическое переключение светлой/тёмной темы',
        'Live Search с подсказками при вводе',
        'Плавные анимации переходов'
      ],
      type: 'major',
    },
    {
      version: '1.1.0',
      date: '2026-01-15',
      title: 'Мобильное приложение [Beta]',
      description: 'Нативное приложение для Android с автообновлением контента',
      image: 'mobile',
      features: [
        'Приложение для Android 7.0+',
        'Автоматическая загрузка новых ботов',
        'Открытие ссылок в Telegram',
        'Оптимизированный интерфейс для телефонов'
      ],
      type: 'major',
    },
    {
      version: '1.0.0',
      date: '2026-01-01',
      title: 'Официальный запуск Tegbi Catalog',
      description: 'Первая стабильная версия каталога Telegram-ботов',
      image: 'launch',
      features: [
        'Каталог из 10+ проверенных ботов',
        'Приложение для Windows',
        'Веб-версия для всех устройств',
        'Автообновление контента'
      ],
      type: 'launch',
    },
  ];

  const getSVGIcon = (type) => {
    switch (type) {
      case 'major':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'feature':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        );
      case 'launch':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getIllustration = (imageType) => {
    switch (imageType) {
      case 'theme-search':
        return (
          <svg className="w-full h-48" viewBox="0 0 400 200" fill="none">
            <rect x="50" y="40" width="300" height="120" rx="12" fill="#E5E7EB" className="dark:fill-gray-700"/>
            <rect x="70" y="60" width="120" height="32" rx="8" fill="#3B82F6"/>
            <rect x="70" y="105" width="260" height="8" rx="4" fill="#9CA3AF" className="dark:fill-gray-500"/>
            <rect x="70" y="120" width="200" height="8" rx="4" fill="#9CA3AF" className="dark:fill-gray-500"/>
            <circle cx="320" cy="76" r="12" fill="none" stroke="#6B7280" strokeWidth="3"/>
            <line x1="328" y1="84" x2="336" y2="92" stroke="#6B7280" strokeWidth="3" strokeLinecap="round"/>
            <circle cx="360" cy="50" r="20" fill="#10B981" opacity="0.2"/>
            <circle cx="40" cy="150" r="15" fill="#8B5CF6" opacity="0.2"/>
          </svg>
        );
      case 'mobile':
        return (
          <svg className="w-full h-48" viewBox="0 0 400 200" fill="none">
            <rect x="125" y="20" width="150" height="160" rx="16" fill="#E5E7EB" className="dark:fill-gray-700"/>
            <rect x="135" y="35" width="130" height="130" rx="8" fill="#3B82F6"/>
            <circle cx="200" cy="155" r="6" fill="#6B7280"/>
            <rect x="155" y="50" width="90" height="12" rx="4" fill="white" opacity="0.9"/>
            <rect x="155" y="70" width="70" height="8" rx="3" fill="white" opacity="0.7"/>
            <rect x="155" y="85" width="80" height="8" rx="3" fill="white" opacity="0.7"/>
            <circle cx="180" cy="115" r="10" fill="white" opacity="0.9"/>
            <circle cx="220" cy="115" r="10" fill="white" opacity="0.9"/>
            <path d="M100 100 L125 80 L125 120 Z" fill="#10B981" opacity="0.3"/>
            <path d="M300 100 L275 80 L275 120 Z" fill="#8B5CF6" opacity="0.3"/>
          </svg>
        );
      case 'api':
        return (
          <svg className="w-full h-48" viewBox="0 0 400 200" fill="none">
            <rect x="40" y="60" width="100" height="80" rx="8" fill="#3B82F6" opacity="0.9"/>
            <rect x="150" y="60" width="100" height="80" rx="8" fill="#10B981" opacity="0.9"/>
            <rect x="260" y="60" width="100" height="80" rx="8" fill="#8B5CF6" opacity="0.9"/>
            <path d="M140 100 L150 100" stroke="#6B7280" strokeWidth="3" strokeDasharray="4 4"/>
            <path d="M250 100 L260 100" stroke="#6B7280" strokeWidth="3" strokeDasharray="4 4"/>
            <text x="90" y="105" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">GET</text>
            <text x="200" y="105" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">POST</text>
            <text x="310" y="105" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">JSON</text>
            <circle cx="200" cy="40" r="12" fill="#F59E0B" opacity="0.3"/>
            <circle cx="50" cy="160" r="10" fill="#EC4899" opacity="0.3"/>
          </svg>
        );
      case 'launch':
        return (
          <svg className="w-full h-48" viewBox="0 0 400 200" fill="none">
            <path d="M200 160 L200 40" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round"/>
            <circle cx="200" cy="40" r="16" fill="#3B82F6"/>
            <circle cx="200" cy="40" r="8" fill="white"/>
            <path d="M180 160 L160 180" stroke="#10B981" strokeWidth="3" strokeLinecap="round"/>
            <path d="M220 160 L240 180" stroke="#10B981" strokeWidth="3" strokeLinecap="round"/>
            <circle cx="160" cy="180" r="6" fill="#10B981"/>
            <circle cx="240" cy="180" r="6" fill="#10B981"/>
            <rect x="80" y="80" width="60" height="40" rx="6" fill="#8B5CF6" opacity="0.8"/>
            <rect x="260" y="80" width="60" height="40" rx="6" fill="#F59E0B" opacity="0.8"/>
            <text x="110" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">PC</text>
            <text x="290" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">WEB</text>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Head>
        <title>Обновления | Tegbi Catalog</title>
        <meta name="description" content="История обновлений и новых функций Tegbi Catalog" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Header */}
        <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
                  Обновления
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">История версий</p>
              </div>
            </div>
            <a href="/" className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              На главную
            </a>
          </div>
        </header>

        {/* Main */}
        <main className="max-w-4xl mx-auto px-4 py-12">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Что нового в Tegbi
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Следите за развитием проекта. Мы постоянно добавляем новые функции и улучшаем существующие.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-transparent hidden md:block"></div>

            {/* Updates */}
            {updates.map((update, index) => (
              <div
                key={update.version}
                id={`update-${index}`}
                className={`update-card relative mb-12 transition-all duration-700 ${
                  visibleCards.includes(`update-${index}`)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 top-8 w-4 h-4 -translate-x-1/2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-4 border-white dark:border-gray-800 hidden md:block"></div>

                {/* Card */}
                <div className={`ml-0 md:ml-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow`}>
                  {/* Illustration */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 p-6">
                    {getIllustration(update.image)}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                        update.type === 'major' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                        update.type === 'feature' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
                        'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                      }`}>
                        {getSVGIcon(update.type)}
                        <span className="ml-1">
                          {update.type === 'major' ? 'Важное' :
                           update.type === 'feature' ? 'Функция' : 'Запуск'}
                        </span>
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                        v{update.version}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(update.date).toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {update.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {update.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3">
                      {update.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Хотите быть в курсе?</h3>
              <p className="mb-6 opacity-90">Подпишитесь на наш Telegram-канал с обновлениями</p>
              <a
                href="https://t.me/seraviellex"
                className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.44-.42-1.38-.88.03-.24.37-.49 1.03-.75 4.04-1.76 6.74-2.92 8.09-3.48 3.85-1.6 4.64-1.89 5.17-1.89.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.13-.03.26z"/>
                </svg>
                Подписаться
              </a>
            </div>
          </div>
        </main>

        {/* Футер с улучшенным дизайном */}
<footer className="bg-white/80 backdrop-blur-sm border-t border-gray-100 dark:bg-gray-800/80 dark:border-gray-700 py-8 mt-16">
  <div className="container mx-auto px-4 text-center">
    
    {/* Ссылки на страницы */}
    <div className="flex justify-center gap-6 mb-4">
      <Link 
        href="/about" 
        className="text-sm text-tg-muted hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
      >
        О проекте
      </Link>
      <span className="text-sm text-gray-300 dark:text-gray-600">•</span>
      <Link 
        href="/privacy" 
        className="text-sm text-tg-muted hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
      >
        Политика конфиденциальности
      </Link>
      <span className="text-sm text-gray-300 dark:text-gray-600">•</span>
      <Link 
        href="/terms" 
        className="text-sm text-tg-muted hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
      >
        Условия использования
      </Link>
    </div>
    
    {/* Копирайт */}
    <p className="text-tg-muted dark:text-gray-400">
      © {new Date().getFullYear()} seraviellex PROJECTS. Все права защищены.
    </p>
    
    {/* Контакты */}
    <p className="text-tg-muted dark:text-gray-400 mt-2 text-sm">
      Связь с разработчиком:{' '}
      <a 
        href="https://t.me/seraviellex" 
        className="text-tg-primary hover:underline dark:text-blue-400"
      >
        @seraviellex
      </a>
    </p>
    
  </div>
</footer>
      </div>
    </>
  );
}