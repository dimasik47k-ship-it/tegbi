import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// ========================================
// 🎨 КОМПОНЕНТ БЕЙДЖА (УНИВЕРСАЛЬНЫЙ)
// ========================================
function Badge({ type, children, gradient = false, className = '' }) {
  const baseStyles = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all';
  
  const variants = {
    // Основные типы
    major: gradient 
      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25' 
      : 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
    feature: gradient
      ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/25'
      : 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
    launch: gradient
      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/25'
      : 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300',
    
    // Статусы разработки
    beta: gradient
      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/25 animate-pulse'
      : 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
    'in-dev': gradient
      ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25'
      : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300',
    test: gradient
      ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/25'
      : 'bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300',
    soon: gradient
      ? 'bg-gradient-to-r from-gray-400 to-gray-600 text-white opacity-80'
      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
    
    // Предупреждения
    warning: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 border border-red-200 dark:border-red-800',
    info: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300',
  };

  const icons = {
    major: <StarIcon />,
    feature: <SparklesIcon />,
    launch: <RocketIcon />,
    beta: <FlaskIcon />,
    'in-dev': <CodeIcon />,
    test: <BeakerIcon />,
    soon: <ClockIcon />,
    warning: <AlertIcon />,
    info: <InfoIcon />,
  };

  return (
    <span className={`${baseStyles} ${variants[type] || variants.info} ${className}`}>
      {icons[type]}
      {children}
    </span>
  );
}

// Иконки для бейджей
function StarIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 3.93m5.96 10.44L6.78 5.56m8.81 8.81l-3.18 3.18"/>
    </svg>
  );
}

function FlaskIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
    </svg>
  );
}

function BeakerIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  );
}

// ========================================
// 🎨 ИЛЛЮСТРАЦИИ (SVG)
// ========================================
function getIllustration(imageType) {
  switch (imageType) {
    case 'professional':
      return (
        <svg className="w-full h-48" viewBox="0 0 400 200" fill="none">
          <rect x="30" y="50" width="110" height="100" rx="10" fill="#3B82F6" opacity="0.9"/>
          <rect x="145" y="50" width="110" height="100" rx="10" fill="#10B981" opacity="0.9"/>
          <rect x="260" y="50" width="110" height="100" rx="10" fill="#8B5CF6" opacity="0.9"/>
          <circle cx="85" cy="85" r="14" fill="white" opacity="0.95"/>
          <path d="M80 85 L83 88 L90 80" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="200" cy="85" r="14" fill="white" opacity="0.95"/>
          <path d="M193 85 L198 90 L207 78" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="315" cy="85" r="14" fill="white" opacity="0.95"/>
          <path d="M308 85 L313 90 L322 78" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="50" y="110" width="70" height="6" rx="3" fill="white" opacity="0.8"/>
          <rect x="50" y="122" width="50" height="4" rx="2" fill="white" opacity="0.6"/>
          <rect x="165" y="110" width="70" height="6" rx="3" fill="white" opacity="0.8"/>
          <rect x="165" y="122" width="50" height="4" rx="2" fill="white" opacity="0.6"/>
          <rect x="280" y="110" width="70" height="6" rx="3" fill="white" opacity="0.8"/>
          <rect x="280" y="122" width="50" height="4" rx="2" fill="white" opacity="0.6"/>
          <circle cx="360" cy="30" r="18" fill="#F59E0B" opacity="0.2"/>
          <circle cx="40" cy="170" r="12" fill="#EC4899" opacity="0.2"/>
          <rect x="290" y="35" width="50" height="20" rx="10" fill="#F59E0B"/>
          <text x="315" y="49" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">NEW</text>
        </svg>
      );
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
}

// ========================================
// 📄 ОСНОВНОЙ КОМПОНЕНТ
// ========================================
export default function UpdatesPage() {
  const [visibleCards, setVisibleCards] = useState([]);

  // Анимация появления при скролле
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => [...new Set([...prev, entry.target.id])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.update-card').forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const updates = [
    {
      version: '1.4.0',
      date: '2026-03-25',
      title: 'Профили и Настройки [BETA]',
      description: 'Личный кабинет с кастомизацией, приватностью и публичными профилями',
      image: 'professional',
      features: [
        { text: 'Вход через Telegram (OpenID Connect)', badge: 'feature' },
        { text: 'Настройки приватности (имя, фото, статистика)', badge: 'feature' },
        { text: 'Кастомизация баннера (градиенты, фото)', badge: 'feature' },
        { text: 'Публичные профили по ID: /profile/[id]', badge: 'beta' },
        { text: 'QR-код для быстрого доступа', badge: 'feature' },
        { text: 'Тёмная/светлая тема с авто-режимом', badge: 'feature' },
      ],
      type: 'beta',
      gradient: true,
      warning: 'Функция в бета-тесте. Возможны баги и изменения.',
    },
    {
      version: '1.3.0',
      date: '2026-03-21',
      title: 'Профессиональный уровень',
      description: 'Страницы ботов, верификация, справка и форма предложений',
      image: 'professional',
      features: [
        { text: 'Страница каждого бота /bots/[id] с деталями и гайдом', badge: 'major' },
        { text: 'Система верификации: бейдж «Проверено»', badge: 'major' },
        { text: 'Страница помощи /help с умным поиском', badge: 'feature' },
        { text: 'Форма «Предложить бота» /botcreate', badge: 'feature' },
        { text: 'Профессиональная 404 страница', badge: 'feature' },
      ],
      type: 'major',
      gradient: true,
    },
    {
      version: '1.2.0',
      date: '2026-01-20',
      title: 'Живые темы и умный поиск',
      description: 'Полный редизайн интерфейса с тёмной темой и мгновенным поиском',
      image: 'theme-search',
      features: [
        { text: 'Автоматическое переключение светлой/тёмной темы', badge: 'feature' },
        { text: 'Live Search с подсказками при вводе', badge: 'feature' },
        { text: 'Плавные анимации переходов', badge: 'feature' },
      ],
      type: 'major',
      gradient: false,
    },
    {
      version: '1.1.0',
      date: '2026-01-15',
      title: 'Мобильное приложение [Beta]',
      description: 'Нативное приложение для Android с автообновлением контента',
      image: 'mobile',
      features: [
        { text: 'Приложение для Android 7.0+', badge: 'beta' },
        { text: 'Автоматическая загрузка новых ботов', badge: 'feature' },
        { text: 'Открытие ссылок в Telegram', badge: 'feature' },
      ],
      type: 'beta',
      gradient: true,
    },
    {
      version: '1.0.0',
      date: '2026-01-01',
      title: 'Официальный запуск Tegbi Catalog',
      description: 'Первая стабильная версия каталога Telegram-ботов',
      image: 'launch',
      features: [
        { text: 'Каталог из 10+ проверенных ботов', badge: 'launch' },
        { text: 'Приложение для Windows', badge: 'launch' },
        { text: 'Веб-версия для всех устройств', badge: 'launch' },
      ],
      type: 'launch',
      gradient: true,
    },
    // Запланированные обновления
    {
  version: '1.5.0',
  date: '2026-03-25',  // ✅ Уже сегодня, а не "Скоро"
  title: 'Public API для разработчиков [BETA]',  // ✅ Добавили [BETA]
  description: 'Программный доступ к каталогу ботов: получайте данные, интегрируйте, автоматизируйте',
  image: 'professional',
  features: [
    { 
      text: 'REST API с открытой документацией', 
      badge: 'beta',  // ✅ beta вместо soon
      details: 'GET /api/bots, /api/bots/[id], /api/stats'
    },
    { 
      text: 'JSON-ответы с пагинацией и фильтрами', 
      badge: 'feature',
      details: '?q=поиск&category=games&limit=20'
    },
    { 
      text: 'CORS поддержка для веб-приложений', 
      badge: 'feature',
      details: 'Access-Control-Allow-Origin: *'
    },
    { 
      text: 'Rate limiting: 100 запросов/мин', 
      badge: 'feature',
      details: 'Защита от злоупотреблений'
    },
    { 
      text: 'Примеры кода: JS, Python, cURL', 
      badge: 'feature',
      details: 'Готовые сниппеты в документации'
    },
    { 
      text: 'Страница документации: /api-doc', 
      badge: 'beta',
      details: 'Интерактивная справка с примерами'
    },
  ],
  type: 'beta',  // ✅ beta вместо soon
  gradient: true,  // ✅ Градиент для бета-бейджа
  warning: 'API в бета-тесте. Возможны изменения в структуре ответов.',  // ✅ Предупреждение
  apiPreview: {
    endpoint: 'GET /api/bots',
    example: 'https://tegbi.vercel.app/api/bots?category=Распознавание речи&limit=5',
    response: {
      success: true,
      data: {
        bots: [{ id: 5, name: 'SaluteSpeech Bot', username: 'smartspeech_sber_bot' }],
        pagination: { current_page: 1, total: 10 }
      }
    }
  }
},
  ];

  return (
    <>
      <Head>
        <title>Обновления | Tegbi Catalog</title>
        <meta name="description" content="История обновлений и новых функций Tegbi Catalog" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        
        {/* 🔔 БАННЕР О БЕТА-ФУНКЦИЯХ */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 px-4">
          <div className="max-w-5xl mx-auto flex items-center justify-center gap-3 text-sm">
            <FlaskIcon />
            <span>
              <strong>Профили и Настройки в бета-тесте!</strong>{' '}
              Возможны баги и изменения. Нашли ошибку?{' '}
              <a href="https://t.me/seraviellex" className="underline hover:text-amber-100" target="_blank" rel="noopener">
                Сообщите разработчику
              </a>
            </span>
          </div>
        </div>

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
            <Link href="/" className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              На главную
            </Link>
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

          {/* Legend бейджей */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 mb-8 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-medium">Легенда:</p>
            <div className="flex flex-wrap gap-2">
              <Badge type="major" gradient>Важное</Badge>
              <Badge type="feature">Функция</Badge>
              <Badge type="beta" gradient>Бета</Badge>
              <Badge type="in-dev" gradient>В разработке</Badge>
              <Badge type="test">Тест</Badge>
              <Badge type="soon">Скоро</Badge>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-transparent hidden md:block"></div>

            {/* Updates */}
            {updates.map((update, index) => (
              <div
                key={update.version + index}
                id={`update-${index}`}
                className={`update-card relative mb-12 transition-all duration-700 ${
                  visibleCards.includes(`update-${index}`)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                {/* Timeline dot */}
                <div className={`absolute left-8 top-8 w-4 h-4 -translate-x-1/2 rounded-full border-4 border-white dark:border-gray-800 hidden md:block ${
                  update.gradient 
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
                    : 'bg-blue-500'
                }`}></div>

                {/* Card */}
                <div className="ml-0 md:ml-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow">
                  
                  {/* Warning banner */}
                  {update.warning && (
                    <div className="bg-amber-50 dark:bg-amber-900/30 border-b border-amber-200 dark:border-amber-800 px-6 py-3 flex items-center gap-2">
                      <AlertIcon />
                      <span className="text-sm text-amber-700 dark:text-amber-300">{update.warning}</span>
                    </div>
                  )}

                  {/* Illustration */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 p-6">
                    {getIllustration(update.image)}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <Badge type={update.type} gradient={update.gradient}>
                        {update.type === 'major' ? 'Важное' :
                         update.type === 'feature' ? 'Функция' :
                         update.type === 'launch' ? 'Запуск' :
                         update.type === 'beta' ? 'Бета' :
                         update.type === 'in-dev' ? 'В разработке' :
                         update.type === 'test' ? 'Тест' : 'Скоро'}
                      </Badge>
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        v{update.version}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {update.date !== 'Скоро' && update.date !== 'В разработке'
                          ? new Date(update.date).toLocaleDateString('ru-RU', {
                              day: 'numeric', month: 'long', year: 'numeric'
                            })
                          : update.date
                        }
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {update.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {update.description}
                    </p>

                    {/* Features with badges */}
                    <div className="space-y-3">
                      {update.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <div className="flex-1">
                            <span className="text-gray-700 dark:text-gray-300">{feature.text}</span>
                            {feature.badge && (
                              <Badge type={feature.badge} className="ml-2 text-[10px] px-2 py-0.5">
                                {feature.badge === 'beta' ? 'бета' :
                                 feature.badge === 'soon' ? 'скоро' :
                                 feature.badge === 'in-dev' ? 'dev' :
                                 feature.badge === 'test' ? 'тест' : ''}
                              </Badge>
                            )}
                          </div>
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
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.44-.42-1.38-.88.03-.24.37-.49 1.03-.75 4.04-1.76 6.74-2.92 8.09-3.48 3.85-1.6 4.64-1.89 5.17-1.89.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.13-.03.26z"/>
                </svg>
                Подписаться
              </a>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-100 dark:bg-gray-800/80 dark:border-gray-700 py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center gap-6 mb-4">
              <Link href="/about" className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                О проекте
              </Link>
              <span className="text-sm text-gray-300 dark:text-gray-600">•</span>
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                Политика конфиденциальности
              </Link>
              <span className="text-sm text-gray-300 dark:text-gray-600">•</span>
              <Link href="/terms" className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                Условия использования
              </Link>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} seraviellex PROJECTS. Все права защищены.
            </p>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
              Связь с разработчиком:{' '}
              <a href="https://t.me/seraviellex" className="text-blue-600 hover:underline dark:text-blue-400" target="_blank" rel="noopener">
                @seraviellex
              </a>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}