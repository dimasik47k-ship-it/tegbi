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

  // Создаём аудио контекст для звуков (только после первого взаимодействия)
  const initAudioContext = () => {
    if (!audioRef.current) {
      audioRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioRef.current && audioRef.current.state === 'suspended') {
      audioRef.current.resume();
    }
  };

  // Анимация появления модального окна
  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => setContentVisible(true), 100);
  }, []);

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

  // Обработка клика вне области модального окна
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Обработка закрытия модального окна
  const handleClose = () => {
    playClickSound();
    setContentVisible(false);
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Ждем завершения анимации
    }, 100);
  };

  // Обработка нажатия клавиши Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Переключение вкладок
  const handleTabChange = (tab) => {
    playClickSound();
    setActiveTab(tab);
  };

  if (!bot) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 ${isVisible ? 'scale-100' : 'scale-95'} ${contentVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Декоративный градиентный фон */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50 pointer-events-none" />

        {/* Заголовок модального окна */}
        <div className="relative flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={bot.avatar}
                alt={bot.name}
                className="w-14 h-14 rounded-full object-cover shadow-lg"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150?text=Bot';
                }}
              />
              {/* Индикатор онлайн-статуса */}
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-tg-text">{bot.name}</h2>
              <a
                href={`https://t.me/${bot.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-tg-primary hover:text-tg-primary/80 transition-colors font-medium"
              >
                @{bot.username}
              </a>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 hover:rotate-90 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Вкладки */}
        <div className="relative flex border-b border-gray-100">
          <button
            onClick={() => handleTabChange('description')}
            className={`flex-1 py-4 text-center font-medium transition-all duration-300 tab-button ${activeTab === 'description' ? 'active' : 'text-tg-muted hover:text-tg-text'}`}
          >
            Описание
          </button>
          <button
            onClick={() => handleTabChange('guide')}
            className={`flex-1 py-4 text-center font-medium transition-all duration-300 tab-button ${activeTab === 'guide' ? 'active' : 'text-tg-muted hover:text-tg-text'}`}
          >
            Гайд
          </button>
        </div>

        {/* Контент вкладок */}
        <div className="relative p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'description' ? (
            <div className={`guide-content transition-opacity duration-300 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
              <p className="whitespace-pre-line leading-relaxed text-tg-text">{bot.welcomeMessage}</p>
            </div>
          ) : (
            <div className={`guide-content transition-opacity duration-300 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
              <ReactMarkdown 
                className="prose prose-sm max-w-none"
                rehypePlugins={[rehypeRaw]}
              >
                {bot.guideMarkdown}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Футер модального окна */}
        <div className="relative p-6 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
          <a
            href={`https://t.me/${bot.username}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClickSound}
            className="block w-full bg-gradient-to-r from-tg-primary to-blue-600 text-white py-3 px-4 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium text-center"
          >
            Открыть @{bot.username} в Telegram
          </a>
        </div>
      </div>
    </div>
  );
};

export default BotModal;
