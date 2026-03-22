import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

/**
 * Компонент модального окна с информацией о боте
 * @param {Object} bot - Данные бота
 * @param {Function} onClose - Обработчик закрытия модального окна
 */
const BotModal = ({ bot, onClose }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [isVisible, setIsVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
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

  // Анимация появления
  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => setContentVisible(true), 100);
  }, []);

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

  // Закрытие по клику вне окна
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Закрытие
  const handleClose = () => {
    playClickSound();
    setContentVisible(false);
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 100);
  };

  // Закрытие по Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Переключение вкладок
  const handleTabChange = (tab) => {
    playClickSound();
    setActiveTab(tab);
  };

  if (!bot) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} bg-black/50 backdrop-blur-sm`}
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 ${isVisible ? 'scale-100' : 'scale-95'} ${contentVisible ? 'opacity-100' : 'opacity-0'} border border-gray-100 dark:border-gray-700`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Шапка */}
        <div className="relative flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={bot.avatar?.trim() || 'https://via.placeholder.com/150?text=Bot'}
                alt={bot.name}
                className="w-14 h-14 rounded-full object-cover shadow-lg bg-gray-100 dark:bg-gray-700"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150?text=Bot';
                }}
              />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {bot.name}
                </h2>
                {/* Бейдж верификации */}
                {bot.verified && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm rounded-full font-medium">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    Проверенный бот
                  </span>
                )}
              </div>
              <a
                href={`https://t.me/${bot.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium"
              >
                @{bot.username}
              </a>
              {bot.verified && bot.verifiedDate && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Проверен с {new Date(bot.verifiedDate).toLocaleDateString('ru-RU')}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:rotate-90 transition-all duration-300 p-2"
            aria-label="Закрыть"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Вкладки */}
        <div className="relative flex border-b border-gray-100 dark:border-gray-700">
          <button
            onClick={() => handleTabChange('description')}
            className={`flex-1 py-4 text-center font-medium transition-all duration-300 ${activeTab === 'description' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            Описание
          </button>
          <button
            onClick={() => handleTabChange('guide')}
            className={`flex-1 py-4 text-center font-medium transition-all duration-300 ${activeTab === 'guide' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            Гайд
          </button>
        </div>

        {/* Контент */}
        <div className="relative p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'description' ? (
            <div className={`transition-opacity duration-300 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
              <p className="whitespace-pre-line leading-relaxed text-gray-700 dark:text-gray-300">
                {bot.welcomeMessage}
              </p>
            </div>
          ) : (
            <div className={`transition-opacity duration-300 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
              <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                  {bot.guideMarkdown}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>

        {/* Футер */}
        <div className="relative p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <a
            href={`https://t.me/${bot.username}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClickSound}
            className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium text-center"
          >
            Открыть @{bot.username} в Telegram
          </a>
        </div>
      </div>
    </div>
  );
};

export default BotModal;