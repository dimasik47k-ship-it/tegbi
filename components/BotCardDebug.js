import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

/**
 * Компонент карточки бота с улучшенными визуалами и анимациями
 * @param {Object} bot - Данные бота
 * @param {Function} onDetailsClick - Обработчик клика на кнопку "Подробнее"
 */
const BotCard = ({ bot, onDetailsClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
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

  // Воспроизведение звука при наведении
  const playHoverSound = () => {
    initAudioContext();
    if (audioRef.current) {
      const oscillator = audioRef.current.createOscillator();
      const gainNode = audioRef.current.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioRef.current.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(400, audioRef.current.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(600, audioRef.current.currentTime + 0.1);

      gainNode.gain.setValueAtTime(0.1, audioRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioRef.current.currentTime + 0.1);

      oscillator.start(audioRef.current.currentTime);
      oscillator.stop(audioRef.current.currentTime + 0.1);
    }
  };

  // Воспроизведение звука при клике
  const playClickSound = () => {
    initAudioContext();
    if (audioRef.current) {
      const oscillator = audioRef.current.createOscillator();
      const gainNode = audioRef.current.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioRef.current.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(600, audioRef.current.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(800, audioRef.current.currentTime + 0.1);

      gainNode.gain.setValueAtTime(0.1, audioRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioRef.current.currentTime + 0.15);

      oscillator.start(audioRef.current.currentTime);
      oscillator.stop(audioRef.current.currentTime + 0.15);
    }
  };

  // Обработка ошибки загрузки изображения
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/150?text=Bot';
  };

  // Копирование юзернейма в буфер обмена
  const handleCopyUsername = (e) => {
    e.preventDefault();
    console.log('Копирование юзернейма:', bot.username);
    playClickSound();
    navigator.clipboard.writeText(bot.username);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Обрезка описания до 150 символов
  const truncateDescription = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Обработчик клика на кнопку "Подробнее"
  const handleDetailsClick = () => {
    console.log('Кнопка "Подробнее" нажата, бот:', bot);
    console.log('onDetailsClick функция:', typeof onDetailsClick);
    playClickSound();
    if (typeof onDetailsClick === 'function') {
      onDetailsClick(bot);
    } else {
      console.error('onDetailsClick не является функцией!');
    }
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform ${isHovered ? 'scale-105 -translate-y-1' : 'scale-100'} fade-in`}
      onMouseEnter={() => {
        setIsHovered(true);
        playHoverSound();
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Заголовок карточки с аватаром и названием */}
      <div className="p-6 border-b border-gray-100 relative overflow-hidden">
        {/* Декоративный градиентный фон */}
        <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

        <div className="relative flex items-center space-x-4">
          <div className={`relative transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
            <img
              src={bot.avatar}
              alt={bot.name}
              className="w-16 h-16 rounded-full object-cover shadow-lg"
              onError={handleImageError}
            />
            {/* Индикатор онлайн-статуса */}
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-tg-text">{bot.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <Link
                href={`https://t.me/${bot.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-tg-primary hover:text-tg-primary/80 transition-colors font-medium"
                onClick={playClickSound}
              >
                @{bot.username}
              </Link>
              <button
                onClick={handleCopyUsername}
                className="text-tg-muted hover:text-tg-primary transition-colors relative"
                title="Скопировать юзернейм"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {/* Индикатор копирования */}
                {copied && (
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-tg-primary text-white text-xs py-1 px-2 rounded shadow-lg whitespace-nowrap">
                    Скопировано!
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Описание бота */}
      <div className="p-6">
        <p className="text-tg-text mb-4 leading-relaxed">
          {truncateDescription(bot.welcomeMessage)}
        </p>

        <div className="flex space-x-3">
          <button
            onClick={handleDetailsClick}
            className="flex-1 bg-gradient-to-r from-tg-primary to-blue-600 text-white py-2 px-4 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium relative overflow-hidden group"
          >
            <span className="relative z-10">Подробнее</span>
            {/* Анимированный градиент при наведении */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-tg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          <Link
            href={`https://t.me/${bot.username}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClickSound}
            className="flex-1 bg-tg-bg border-2 border-tg-primary text-tg-primary py-2 px-4 rounded-lg hover:bg-tg-primary hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium text-center"
          >
            Открыть в Telegram
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BotCard;
