// components/ProjectClosedIntro.js
import { useState, useEffect, useRef } from 'react';

export default function ProjectClosedIntro({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('loading'); // loading → revealing → closed → future
  const [muted, setMuted] = useState(false);
  const audioCtxRef = useRef(null);

  // Инициализация AudioContext
  const initAudio = () => {
    if (audioCtxRef.current || muted) return;
    try {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.debug('Audio not supported');
    }
  };

  // Звуковой движок (синтез, не файлы)
  const playSound = (type) => {
    if (muted || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;

    const createOsc = (freq, type = 'sine', duration = 0.2, gainVal = 0.08) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(gainVal, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration);
      return { osc, gain };
    };

    switch (type) {
      case 'tick':
        createOsc(880, 'sine', 0.05, 0.03);
        break;
      case 'progress':
        createOsc(440 + progress * 3, 'triangle', 0.1, 0.05);
        break;
      case 'complete':
        createOsc(523.25, 'sine', 0.3, 0.1); // C5
        setTimeout(() => createOsc(659.25, 'sine', 0.4, 0.08), 150); // E5
        setTimeout(() => createOsc(783.99, 'sine', 0.5, 0.06), 300); // G5
        break;
      case 'tear':
        const tear = createOsc(220, 'sine', 0.8, 0.04);
        tear.osc.frequency.exponentialRampToValueAtTime(110, now + 0.8);
        break;
      case 'future':
        createOsc(329.63, 'sine', 0.6, 0.07); // E4
        setTimeout(() => createOsc(392, 'sine', 0.8, 0.05), 200); // G4
        break;
    }
  };

  // Анимация прогресса (медленная, драматичная)
  useEffect(() => {
    if (stage !== 'loading') return;
    initAudio();

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          playSound('complete');
          setTimeout(() => setStage('revealing'), 800);
          return 100;
        }
        // Нелинейная кривая: медленно → быстро → медленно
        let increment;
        if (prev < 20) increment = 0.3;
        else if (prev < 50) increment = 0.8;
        else if (prev < 85) increment = 1.2;
        else increment = 0.4;
        return Math.min(prev + increment, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, [stage]);

  // Переход к "слезам"
  useEffect(() => {
    if (stage === 'revealing') {
      playSound('tear');
      const timer = setTimeout(() => setStage('closed'), 3500);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // Финал: будущее
  useEffect(() => {
    if (stage === 'closed') {
      const timer = setTimeout(() => {
        playSound('future');
        setStage('future');
        setTimeout(() => onComplete?.(), 4000);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [stage, onComplete]);

  // ========================================
  // SVG ICONS (только вектор, без эмодзи!)
  // ========================================
  function LoadingRing() {
    return (
      <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="42" stroke="url(#gradRing)" strokeWidth="3" strokeDasharray="80 200" strokeLinecap="round" className="animate-spin-slow" />
        <defs>
          <linearGradient id="gradRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="6" fill="#60A5FA" className="animate-pulse-subtle" />
      </svg>
    );
  }

  function TearIcon() {
    return (
      <svg className="w-16 h-16" viewBox="0 0 100 120" fill="none">
        <path
          d="M50 15 C70 15, 85 45, 85 70 C85 95, 70 110, 50 110 C30 110, 15 95, 15 70 C15 45, 30 15, 50 15 Z"
          fill="url(#tearGrad)"
          className="animate-tear-fall"
        />
        <defs>
          <linearGradient id="tearGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <ellipse cx="50" cy="45" rx="12" ry="18" fill="white" opacity="0.4" />
      </svg>
    );
  }

  function ArchiveIcon() {
    return (
      <svg className="w-14 h-14" viewBox="0 0 100 100" fill="none">
        <rect x="18" y="28" width="64" height="52" rx="6" stroke="currentColor" strokeWidth="2.5" opacity="0.9" />
        <rect x="28" y="18" width="44" height="14" rx="3" stroke="currentColor" strokeWidth="2.5" />
        <line x1="32" y1="52" x2="68" y2="52" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="32" y1="64" x2="58" y2="64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      </svg>
    );
  }

  function FutureIcon() {
    return (
      <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="40" stroke="url(#futureGrad)" strokeWidth="2" strokeDasharray="4 4" className="animate-spin-reverse" />
        <path d="M50 25 L50 50 L70 60" stroke="url(#futureGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="futureGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  function MuteIcon({ muted }) {
    return muted ? (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
      </svg>
    ) : (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
      </svg>
    );
  }

  // Частицы на фоне
  const Particles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full animate-float-subtle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `rgba(148, 163, 184, ${0.2 + Math.random() * 0.4})`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${4 + Math.random() * 6}s`,
          }}
        />
      ))}
    </div>
  );

  // Слёзы (анимация падения)
  const FallingTears = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-tear-drop"
          style={{
            left: `${20 + i * 15}%`,
            top: '-20px',
            animationDelay: `${i * 0.6}s`,
            animationDuration: `${3 + i * 0.3}s`,
          }}
        >
          <TearIcon />
        </div>
      ))}
    </div>
  );

  // ========================================
  // STAGE: LOADING
  // ========================================
  if (stage === 'loading') {
    return (
      <div className="fixed inset-0 z-[100] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center text-white overflow-hidden">
        <Particles />
        
        {/* Кнопка звука */}
        <button
          onClick={() => {
            setMuted(!muted);
            if (!muted && audioCtxRef.current?.state === 'suspended') {
              audioCtxRef.current?.resume();
            }
          }}
          className="absolute top-6 right-6 p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
          aria-label={muted ? 'Включить звук' : 'Выключить звук'}
        >
          <MuteIcon muted={muted} />
        </button>

        {/* Логотип */}
        <div className="relative mb-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse-subtle" />
          <div className="relative text-blue-400">
            <LoadingRing />
          </div>
        </div>

        {/* Заголовок */}
        <h1 className="text-2xl font-semibold tracking-wide mb-2 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
          Инициализация системы
        </h1>
        <p className="text-slate-400 text-sm mb-10 font-light">Пожалуйста, ожидайте</p>

        {/* Прогресс */}
        <div className="w-72 max-w-[85vw]">
          <div className="flex justify-between text-xs text-slate-500 mb-3 font-mono">
            <span>ЗАГРУЗКА</span>
            <span className="text-blue-400">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full transition-all duration-200 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/10 animate-shimmer-subtle" />
            </div>
          </div>
        </div>

        {/* Футер */}
        <div className="absolute bottom-8 flex items-center gap-3 text-slate-600 text-xs font-mono">
          <div className="w-2 h-2 rounded-full bg-blue-500/50 animate-pulse-subtle" />
          <span>Tegbi Catalog • v1.5.0 • Secure</span>
        </div>
      </div>
    );
  }

  // ========================================
  // STAGE: REVEALING (слёзы, драма)
  // ========================================
  if (stage === 'revealing') {
    return (
      <div className="fixed inset-0 z-[100] bg-gradient-to-b from-slate-950 via-slate-900 to-black flex flex-col items-center justify-center text-white overflow-hidden">
        <FallingTears />
        <Particles />
        
        {/* Эффект "трещины" */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px bg-gradient-to-b from-transparent via-white/10 to-transparent animate-crack-line"
              style={{
                left: `${10 + i * 12}%`,
                top: '0',
                height: '100%',
                transform: `rotate(${(i - 4) * 3}deg)`,
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>

        {/* Центральный элемент */}
        <div className="relative flex flex-col items-center animate-fade-in-slow">
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-red-500/10 rounded-full blur-3xl animate-pulse-subtle" />
            <div className="relative text-slate-300">
              <ArchiveIcon />
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">
              Проект завершён
            </span>
          </h2>
          
          <p className="text-slate-400 text-lg text-center max-w-md leading-relaxed font-light">
            Tegbi Catalog официально закрыт. Спасибо за ваше время.
          </p>
        </div>

        {/* Статус */}
        <div className="absolute bottom-12 flex items-center gap-4 text-sm text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500/70 animate-pulse-subtle" />
            <span>Статус: <span className="text-red-400">Архив</span></span>
          </div>
          <span className="text-slate-700">•</span>
          <span>Доступность: <span className="text-slate-300">100%</span></span>
        </div>
      </div>
    );
  }

  // ========================================
  // STAGE: CLOSED (карточка с деталями)
  // ========================================
  if (stage === 'closed') {
    return (
      <div className="fixed inset-0 z-[100] bg-gradient-to-b from-slate-950 via-slate-900 to-black flex flex-col items-center justify-center text-white">
        {/* Фоновая сетка */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(148,163,184,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        {/* Карточка */}
        <div className="relative bg-slate-800/40 backdrop-blur-2xl rounded-3xl p-10 max-w-lg mx-6 border border-slate-700/50 shadow-2xl shadow-black/50 animate-scale-in-slow">
          
          {/* Иконка */}
          <div className="flex justify-center mb-7">
            <div className="p-5 bg-slate-700/30 rounded-2xl border border-slate-600/30">
              <ArchiveIcon />
            </div>
          </div>

          {/* Заголовок */}
          <h2 className="text-3xl font-bold text-center mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
              Tegbi Catalog
            </span>
          </h2>

          {/* Описание */}
          <p className="text-slate-400 text-center mb-8 leading-relaxed font-light">
            Проект больше не развивается, не обновляется и не поддерживается. 
            Сайт доступен в архивном режиме — только для просмотра.
          </p>

          {/* Статус */}
          <div className="flex items-center justify-center gap-4 py-4 px-5 bg-slate-700/30 rounded-xl mb-8 border border-slate-600/20">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse-subtle" />
              <span className="text-sm text-slate-300">Статус</span>
            </div>
            <span className="text-slate-600">•</span>
            <span className="text-sm font-medium text-red-400">Закрыт</span>
            <span className="text-slate-600">•</span>
            <span className="text-sm text-slate-300">Доступность</span>
            <span className="text-slate-600">•</span>
            <span className="text-sm font-medium text-slate-200">100%</span>
          </div>

          {/* Кнопка */}
          <button
            onClick={() => setStage('future')}
            className="w-full py-4 px-6 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-slate-200 font-medium rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-slate-500/30"
          >
            Продолжить
          </button>
        </div>

        {/* Копирайт */}
        <p className="absolute bottom-6 text-xs text-slate-600 font-mono">
          © 2026 Tegbi Catalog • Архив • Все права защищены
        </p>
      </div>
    );
  }

  // ========================================
  // STAGE: FUTURE (упоминание WebSo)
  // ========================================
  if (stage === 'future') {
    return (
      <div className="fixed inset-0 z-[100] bg-gradient-to-b from-slate-950 via-indigo-950/30 to-slate-950 flex flex-col items-center justify-center text-white">
        <Particles />
        
        {/* Светящийся ореол */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-subtle" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse-subtle" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative flex flex-col items-center animate-fade-in-slow">
          {/* Иконка будущего */}
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse-subtle" />
            <div className="relative">
              <FutureIcon />
            </div>
          </div>

          {/* Заголовок */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 tracking-tight">
            <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
              Что дальше?
            </span>
          </h2>

          {/* Основной текст */}
          <p className="text-slate-300 text-center max-w-md leading-relaxed mb-6 font-light">
            Возможно, в будущем появится похожий проект — 
            <span className="text-cyan-300 font-medium"> WebSo</span>.
          </p>

          {/* Детали */}
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-slate-700/30 max-w-sm">
            <div className="flex items-start gap-3 mb-4">
              <div className="mt-1">
                <FutureIcon />
              </div>
              <div>
                <h3 className="font-medium text-slate-200 mb-1">WebSo</h3>
                <p className="text-sm text-slate-400">Каталог веб-сайтов и сервисов</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50" />
              <span>Ориентировочный запуск: ~12 месяцев</span>
            </div>
          </div>

          {/* Примечание */}
          <p className="text-slate-500 text-sm text-center max-w-sm font-light">
            Это не обещание, а возможность. Следите за обновлениями.
          </p>
        </div>

        {/* Кнопка завершения */}
        <button
          onClick={() => onComplete?.()}
          className="absolute bottom-10 py-3 px-8 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-medium rounded-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-cyan-500/20"
        >
          Понятно
        </button>

        {/* Футер */}
        <p className="absolute bottom-4 text-xs text-slate-600 font-mono">
          seraviellex PROJECTS • Будущее в разработке
        </p>
      </div>
    );
  }

  return null;
}