import { useEffect, useState } from 'react';

export default function TelegramAuth({ onAuth }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const container = document.getElementById('telegram-login-container');
    if (container) container.innerHTML = '';

    // Загружаем НОВЫЙ скрипт
    if (!document.querySelector('script[src*="oauth.telegram.org/js/telegram-login.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://oauth.telegram.org/js/telegram-login.js?3';
      script.async = true;
      script.onload = () => {
        setIsScriptLoaded(true);
        setIsLoading(false);
        initTelegramLogin();
      };
      script.onerror = () => {
        console.error('❌ Не удалось загрузить Telegram Login');
        setIsLoading(false);
      };
      document.head.appendChild(script);
    } else {
      setIsScriptLoaded(true);
      setIsLoading(false);
      initTelegramLogin();
    }

    // Инициализация виджета
    const initTelegramLogin = () => {
      if (window.Telegram?.Login) {
        window.Telegram.Login.init({
          client_id: 8755897470,  // ← ВСТАВЬ СВОЙ CLIENT ID!
          request_access: ['write'],
          lang: 'ru'
        }, handleAuth);
      }
    };

    // Обработчик успешного входа
    const handleAuth = (data) => {
      if (data.error) {
        console.error('Auth error:', data.error);
        alert('Ошибка авторизации: ' + data.error);
        return;
      }
      // data.user содержит данные пользователя
      onAuth(data.user);
    };

    return () => {
      if (container) container.innerHTML = '';
    };
  }, [onAuth]);

  return (
    <div className="flex flex-col items-center gap-4">
      {isLoading ? (
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
          <span>Загрузка...</span>
        </div>
      ) : (
        <>
          {/* Кнопка будет добавлена скриптом */}
          <div id="telegram-login-container">
            <button 
              className="tg-auth-button bg-[#54a9eb] hover:bg-[#4a9fd8] text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center gap-2"
              onClick={() => window.Telegram?.Login?.open()}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.44-.42-1.38-.88.03-.24.37-.49 1.03-.75 4.04-1.76 6.74-2.92 8.09-3.48 3.85-1.6 4.64-1.89 5.17-1.89.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.13-.03.26z"/>
              </svg>
              Войти через Telegram
            </button>
          </div>
        </>
      )}
    </div>
  );
}