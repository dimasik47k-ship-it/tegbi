import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import BotCard from '../components/BotCardNew';
import BotModal from '../components/BotModal';
import Navbar from '../components/Navbar';
import BotSearch from '../components/BotSearch';
import botsDB from '../data/bots';
import Link from 'next/link';
/**
 * Главная страница приложения - каталог Telegram ботов с улучшенными визуалами
 */
export default function Home() {
  const [selectedBot, setSelectedBot] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayedBots, setDisplayedBots] = useState(botsDB);
  const audioRef = useRef(null);

  // Создаём аудио контекст для звуков (только после первого взаимодействия)
  const initAudioContext = () => {
    if (!audioRef.current) {
      audioRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioRef.current && audioRef.current.state === 'suspended') {
      audioRef.current.resume();
    }
  };

  // Анимация загрузки страницы
  useEffect(() => {
    console.log('Загружено ботов:', botsDB.length);
    console.log('Список ботов:', botsDB);
    setIsLoaded(true);
  }, []);

  // Обработчик открытия модального окна
  const handleDetailsClick = (bot) => {
    console.log('handleDetailsClick вызван, бот:', bot);
    setSelectedBot(bot);
  };

  // Обработчик закрытия модального окна
  const handleCloseModal = () => {
    setSelectedBot(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-tg-bg via-blue-50 to-purple-50">
      <Head>
        <title>Catalog of Telegram Bots - seraviellex PROJECTS</title>
        <meta name="description" content="Каталог Telegram ботов проекта seraviellex PROJECTS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Навигационное меню */}
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Hero секция с анимацией */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative inline-block">
            <h1 className="text-4xl md:text-5xl font-bold text-tg-text mb-4 bg-clip-text text-transparent bg-gradient-to-r from-tg-primary to-purple-600">
              Telegram боты
            </h1>
            {/* Декоративный градиентный фон */}
            <div className="absolute -inset-1 bg-gradient-to-r from-tg-primary to-purple-600 rounded-lg blur opacity-20"></div>
          </div>
          <p className="text-xl text-tg-muted max-w-2xl mx-auto mt-6">
            Каталог ботов проекта <span className="text-tg-primary font-semibold">seraviellex PROJECTS</span>
          </p>
          <p className="text-lg text-tg-muted mt-4 max-w-2xl mx-auto">
            Наши боты помогут вам упростить повседневные задачи, найти информацию,
            организовать заметки и многое другое.
          </p>
        </div>

        {/* Поиск ботов */}
        <div className={`mb-12 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <BotSearch onFilter={(filtered) => setDisplayedBots(filtered)} />
        </div>

        {/* Сетка карточек ботов с анимацией появления */}
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
      </main>

      {/* Модальное окно */}
      {selectedBot && (
        <BotModal
          bot={selectedBot}
          onClose={handleCloseModal}
        />
      )}

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
  );
}