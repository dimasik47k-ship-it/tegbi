// components/ProjectClosedIntro.js
import { useState, useEffect, useRef } from 'react';

export default function ProjectClosedIntro({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('loading'); // loading, revealing, closed
  const [muted, setMuted] = useState(false);
  const audioRef = useRef(null);

  // Звук загрузки (опционально)
  useEffect(() => {
    // Создаём простой "пиу-пиу" звук через Web Audio API
    const playBeep = (freq, duration, delay = 0) => {
      if (muted) return;
      setTimeout(() => {
        try {
          const ctx = new (window.AudioContext || window.webkitAudioContext)();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = freq;
          osc.type = 'sine';
          gain.gain.setValueAtTime(0.1, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + duration);
        } catch (e) {
          // Игнорируем если аудио не поддерживается
        }
      }, delay);
    };

    // Проигрываем звуки во время загрузки
    if (stage === 'loading' && progress > 0 && progress % 10 === 0) {
      playBeep(440 + progress * 5, 0.1, progress * 50);
    }
  }, [progress, stage, muted]);

  // Анимация прогресса
  useEffect(() => {
    if (stage !== 'loading') return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setStage('revealing'), 300);
          return 100;
        }
        // Нелинейный прогресс для драматизма
        const increment = prev < 30 ? 2 : prev < 70 ? 1 : 0.5;
        return Math.min(prev + increment, 100);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [stage]);

  // Финал: показываем закрытие
  useEffect(() => {
    if (stage === 'revealing') {
      const timer = setTimeout(() => {
        setStage('closed');
        setTimeout(() => onComplete?.(), 2000);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [stage, onComplete]);

  // SVG Icons
  function LoadingIcon() {
    return (
      <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="4" strokeDasharray="60 200" strokeLinecap="round" className="animate-spin origin-center" />
        <circle cx="50" cy="50" r="8" fill="currentColor" className="animate-pulse" />
      </svg>
    );
  }

  function ClosedIcon() {
    return (
      <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none">
        <rect x="20" y="20" width="60" height="60" rx="12" stroke="currentColor" strokeWidth="3" className="opacity-50" />
        <line x1="35" y1="35" x2="65" y2="65" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <line x1="65" y1="35" x2="35" y2="65" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" className="animate-spin-slow opacity-30" />
      </svg>
    );
  }

  function ArchiveIcon() {
    return (
      <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
        <rect x="15" y="25" width="70" height="55" rx="4" stroke="currentColor" strokeWidth="3" />
        <rect x="25" y="15" width="50" height="15" rx="2" stroke="currentColor" strokeWidth="3" />
        <line x1="35" y1="50" x2="65" y2="50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="35" y1="60" x2="55" y2="60" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  // Particles background
  const Particles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );

  // LOADING STAGE
  if (stage === 'loading') {
    return (
      <div className="fixed inset-0 z-[100] bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex flex-col items-center justify-center text-white">
        <Particles />
        
        {/* Муте кнопка */}
        <button
          onClick={() => setMuted(!muted)}
          className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label={muted ? 'Включить звук' : 'Выключить звук'}
        >
          {muted ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </button>

        {/* Логотип / Иконка */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-2xl opacity-30 animate-pulse" />
          <div className="relative text-blue-400">
            <LoadingIcon />
          </div>
        </div>

        {/* Текст */}
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Загрузка интерфейса...
        </h2>
        <p className="text-gray-400 text-sm mb-8">Пожалуйста, подождите</p>

        {/* Прогресс бар */}
        <div className="w-64 max-w-[80vw]">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Инициализация</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-100 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-shimmer" />
            </div>
          </div>
        </div>

        {/* Декоративные элементы */}
        <div className="absolute bottom-8 flex items-center gap-2 text-gray-600 text-xs">
          <svg className="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span>Tegbi Catalog • v1.5.0</span>
        </div>
      </div>
    );
  }

  // REVEALING STAGE (анимация перехода к закрытию)
  if (stage === 'revealing') {
    return (
      <div className="fixed inset-0 z-[100] bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900 flex flex-col items-center justify-center text-white overflow-hidden">
        <Particles />
        
        {/* Анимация "разбитого стекла" */}
        <div className="absolute inset-0 animate-crack">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"
              style={{
                left: `${20 + i * 15}%`,
                top: '0',
                height: '100%',
                transform: `rotate(${(i - 3) * 5}deg)`,
                animation: `crackLine 1.5s ease-out ${i * 0.1}s forwards`,
                opacity: 0,
              }}
            />
          ))}
        </div>

        {/* Иконка закрытия */}
        <div className="relative mb-6 animate-bounce-in">
          <div className="absolute inset-0 bg-red-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="relative text-red-400">
            <ClosedIcon />
          </div>
        </div>

        {/* Текст с печатной машинкой */}
        <h2 className="text-3xl font-bold mb-3 text-center animate-fade-in-up">
          <TypewriterText text="Простите..." delay={300} />
        </h2>
        <p className="text-gray-400 text-lg mb-8 text-center animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
          <TypewriterText text="Проект закрыт" delay={1500} />
        </p>

        {/* Статистика */}
        <div className="flex items-center gap-6 text-sm text-gray-500 animate-fade-in-up" style={{ animationDelay: '2s' }}>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span>Статус: <span className="text-red-400 font-medium">Архив</span></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-gray-500 rounded-full" />
            <span>Доступность: <span className="text-gray-400 font-medium">100%</span></span>
          </div>
        </div>
      </div>
    );
  }

  // CLOSED STAGE (финальный экран)
  if (stage === 'closed') {
    return (
      <div className="fixed inset-0 z-[100] bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex flex-col items-center justify-center text-white">
        {/* Фоновая сетка */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />

        {/* Центральная карточка */}
        <div className="relative bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 max-w-md mx-4 border border-gray-700 shadow-2xl animate-scale-in">
          {/* Иконка */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-red-500/10 rounded-2xl">
              <ArchiveIcon />
            </div>
          </div>

          {/* Заголовок */}
          <h2 className="text-2xl font-bold text-center mb-3">
            <span className="bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
              Проект закрыт
            </span>
          </h2>

          {/* Описание */}
          <p className="text-gray-400 text-center mb-6 leading-relaxed">
            Tegbi Catalog больше не развивается. Сайт работает в архивном режиме — только для просмотра.
          </p>

          {/* Статус */}
          <div className="flex items-center justify-center gap-3 py-3 px-4 bg-gray-700/50 rounded-xl mb-6">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-300">
              Статус: <span className="font-medium text-red-400">Закрыт</span>
            </span>
            <span className="text-gray-600">•</span>
            <span className="text-sm text-gray-300">
              Доступность: <span className="font-medium">100%</span>
            </span>
          </div>

          {/* Кнопка */}
          <button
            onClick={() => onComplete?.()}
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/25"
          >
            Понятно, продолжить
          </button>
        </div>

        {/* Футер */}
        <p className="absolute bottom-6 text-xs text-gray-600">
          © 2026 Tegbi Catalog • Архив
        </p>
      </div>
    );
  }

  return null;
}

// ========================================
// ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ
// ========================================

// Печатная машинка для текста
function TypewriterText({ text, delay = 0 }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;

    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, 80);

    return () => clearTimeout(timer);
  }, [displayed, text, started]);

  return (
    <>
      {displayed}
      {displayed.length < text.length && (
        <span className="animate-blink">|</span>
      )}
    </>
  );
}

// Глобальные стили для анимаций (добавь в globals.css или используй style jsx)
const globalStyles = `
@keyframes float {
  0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
  50% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
}
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
@keyframes crackLine {
  0% { opacity: 0; height: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; height: 100%; }
}
@keyframes bounce-in {
  0% { transform: scale(0.5); opacity: 0; }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes scale-in {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-float { animation: float 4s ease-in-out infinite; }
.animate-shimmer { animation: shimmer 1.5s infinite; }
.animate-bounce-in { animation: bounce-in 0.6s ease-out forwards; }
.animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; opacity: 0; }
.animate-scale-in { animation: scale-in 0.4s ease-out forwards; }
.animate-blink { animation: blink 1s step-end infinite; }
.animate-spin-slow { animation: spin-slow 20s linear infinite; }
`;

// Добавляем стили при монтировании
if (typeof document !== 'undefined' && !document.getElementById('intro-styles')) {
  const style = document.createElement('style');
  style.id = 'intro-styles';
  style.textContent = globalStyles;
  document.head.appendChild(style);
}