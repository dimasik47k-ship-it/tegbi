import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import BotCard from '../components/BotCardNew';
import BotModal from '../components/BotModal';
import Navbar from '../components/Navbar';
import BotSearch from '../components/BotSearch';
import Link from 'next/link';
import botsDB from '../data/bots';

/**
 * Главная страница приложения - каталог Telegram ботов
 */
export default function Home() {
  const [selectedBot, setSelectedBot] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayedBots, setDisplayedBots] = useState(botsDB);
  const audioRef = useRef(null);

  // Реальная статистика
  const stats = {
    totalBots: botsDB.length,
    withAvatar: botsDB.filter(b => b.avatar && b.avatar.trim() !== '').length,
    withGuide: botsDB.filter(b => b.guideMarkdown && b.guideMarkdown.trim() !== '').length,
    lastUpdated: new Date().toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  };

  // Инициализация аудио
  const initAudioContext = () => {
    if (!audioRef.current) {
      audioRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioRef.current && audioRef.current.state === 'suspended') {
      audioRef.current.resume();
    }
  };

  // Анимация загрузки
  useEffect(() => {
    console.log('Загружено ботов:', botsDB.length);
    setIsLoaded(true);
  }, []);

  // Открытие модального окна
  const handleDetailsClick = (bot) => {
    initAudioContext();
    setSelectedBot(bot);
  };

  // Закрытие модального окна
  const handleCloseModal = () => {
    setSelectedBot(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-tg-bg via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Head>
  <title>Tegbi Catalog — Каталог проверенных Telegram-ботов для бизнеса</title>
  <meta name="description" content="Каталог проверенных бесплатных Telegram-ботов для автоматизации бизнеса. AI-интеграции, модерация, утилиты. Без регистрации и рекламы." />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.ico" />
  
  {/* Open Graph — твоя картинка! */}
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://tegbi.vercel.app" />
  <meta property="og:title" content="Tegbi Catalog — Каталог проверенных Telegram-ботов для бизнеса" />
  <meta property="og:description" content="Каталог проверенных бесплатных Telegram-ботов для автоматизации бизнеса" />
  <meta property="og:image" content="https://tegbi.vercel.app/og-image.jpg" />
  <meta property="og:site_name" content="Tegbi Catalog" />
  
  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Tegbi Catalog — Каталог Telegram-ботов" />
  <meta name="twitter:description" content="Каталог проверенных бесплатных Telegram-ботов" />
  <meta name="twitter:image" content="https://tegbi.vercel.app/og-image.jpg" />
</Head>

      {/* Навигационное меню */}
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        
        {/* Hero секция */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative inline-block">
            <h1 className="text-4xl md:text-5xl font-bold text-tg-text dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-tg-primary to-purple-600">
              Telegram боты
            </h1>
            <div className="absolute -inset-1 bg-gradient-to-r from-tg-primary to-purple-600 rounded-lg blur opacity-20"></div>
          </div>
          <p className="text-xl text-tg-muted dark:text-gray-400 max-w-2xl mx-auto mt-6">
            Каталог ботов проекта <span className="text-tg-primary font-semibold">seraviellex PROJECTS</span>
          </p>
          <p className="text-lg text-tg-muted dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            Наши боты помогут вам упростить повседневные задачи, найти информацию,
            организовать заметки и многое другое.
          </p>
        </div>

        {/* Статистика */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-6 text-center hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400 mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.totalBots}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Ботов в каталоге</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-6 text-center hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl text-green-600 dark:text-green-400 mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.withAvatar}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">С аватарами</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-6 text-center hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl text-purple-600 dark:text-purple-400 mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.withGuide}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">С инструкциями</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-6 text-center hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl text-orange-600 dark:text-orange-400 mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white mb-1">{stats.lastUpdated}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Обновлено</p>
          </div>
        </div>

        {/* Поиск ботов */}
        <div className={`mb-12 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <BotSearch onFilter={(filtered) => setDisplayedBots(filtered)} />
        </div>

        {/* Счётчик результатов */}
        <div className={`mb-8 text-center transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-gray-600 dark:text-gray-400">
            Показано: <span className="font-bold text-blue-600 dark:text-blue-400">{displayedBots.length}</span> из {botsDB.length}
          </p>
        </div>

        {/* Сетка карточек ботов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-8">
          {displayedBots.map((bot, index) => (
            <div
              key={bot.id}
              className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <BotCard
                bot={bot}
                onDetailsClick={handleDetailsClick}
              />
            </div>
          ))}
        </div>

        {/* Пустой результат */}
        {displayedBots.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Ничего не найдено
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Попробуй изменить поисковый запрос или выбрать другую категорию
            </p>
          </div>
        )}

      </main>

      {/* Модальное окно */}
      {selectedBot && (
        <BotModal
          bot={selectedBot}
          onClose={handleCloseModal}
        />
      )}

      {/* Футер */}
<footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-100 dark:border-gray-700 py-8 mt-16">
  <div className="container mx-auto px-4 text-center">
    
    {/* Ссылки — с переносом на мобильных */}
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4 text-sm">
      <Link 
        href="/about" 
        className="text-tg-muted hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
      >
        О проекте
      </Link>
      <span className="text-gray-300 dark:text-gray-600 hidden sm:inline">•</span>
      
      <Link 
        href="/privacy" 
        className="text-tg-muted hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
      >
        Политика конфиденциальности
      </Link>
      <span className="text-gray-300 dark:text-gray-600 hidden sm:inline">•</span>
      
      <Link 
        href="/terms" 
        className="text-tg-muted hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
      >
        Условия использования
      </Link>
      <span className="text-gray-300 dark:text-gray-600 hidden sm:inline">•</span>
      
      <Link 
        href="/help" 
        className="text-tg-muted hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
      >
        Помощь
      </Link>
      <span className="text-gray-300 dark:text-gray-600 hidden sm:inline">•</span>
      
      <Link 
        href="/botcreate" 
        className="text-tg-muted hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
      >
        Предложить бота
      </Link>
    </div>
    
    {/* Копирайт */}
    <p className="text-tg-muted dark:text-gray-400 text-sm">
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
  );
}