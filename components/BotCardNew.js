import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

/**
 * Компонент карточки бота с улучшенными визуалами и анимациями
 */
const BotCard = ({ bot, onDetailsClick, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const audioRef = useRef(null);

  // Инициализация аудио
  const initAudioContext = () => {
    if (!audioRef.current) {
      audioRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioRef.current && audioRef.current.state === 'suspended') {
      audioRef.current.resume();
    }
  };

  // Звук при наведении
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

  // Звук при клике
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

  // Обработка ошибки аватара
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/150?text=Bot';
  };

  // Копирование юзернейма
  const handleCopyUsername = (e) => {
    e.preventDefault();
    playClickSound();
    navigator.clipboard.writeText(bot.username);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Обрезка описания
  const truncateDescription = (text, maxLength = 150) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div
      id={`bot-card-${bot.id}`}
      data-bot-id={bot.id}
      data-bot-name={bot.name}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform ${isHovered ? 'scale-105 -translate-y-1' : 'scale-100'} fade-in border border-gray-100 dark:border-gray-700 ${className}`}
      onMouseEnter={() => { setIsHovered(true); playHoverSound(); }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Заголовок */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-700 relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        <div className="relative flex items-center space-x-4">
          <div className={`relative transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
            <img
              src={bot.avatar?.trim() || 'https://via.placeholder.com/150?text=Bot'}
              alt={bot.name}
              className="w-16 h-16 rounded-full object-cover shadow-lg bg-gray-100 dark:bg-gray-700"
              onError={handleImageError}
            />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
          </div>
          <div className="flex-1 min-w-0">
            {/* Название + бейдж верификации */}
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
                {bot.name}
              </h3>
              {/* ✅ Бейдж верификации — ДОБАВЛЕНО */}
              {bot.verified && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-full font-medium">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  Проверено
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <Link
                href={`https://t.me/${bot.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium truncate"
                onClick={playClickSound}
              >
                @{bot.username}
              </Link>
              <button
                onClick={handleCopyUsername}
                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative flex-shrink-0"
                title="Скопировать юзернейм"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {copied && (
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs py-1 px-2 rounded shadow-lg whitespace-nowrap z-10">
                    Скопировано
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Описание */}
      <div className="p-6">
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          {truncateDescription(bot.welcomeMessage)}
        </p>
        <div className="flex space-x-3">
          <button
            onClick={() => { playClickSound(); onDetailsClick(bot); }}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium relative overflow-hidden group"
          >
            <span className="relative z-10">Подробнее</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          <Link
            href={`https://t.me/${bot.username}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClickSound}
            className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-4 rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all duration-300 font-medium text-center border border-gray-200 dark:border-gray-600"
          >
            Открыть
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BotCard;