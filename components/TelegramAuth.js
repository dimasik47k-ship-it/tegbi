import { useEffect, useState } from 'react';

export default function TelegramAuth({ onAuth }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Создаём скрипт Telegram Login Widget
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    script.setAttribute('data-telegram-login', 'seraviellexI_bot'); // Твой бот
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-radius', '12');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');
    
    // Глобальная функция обратного вызова
    window.onTelegramAuth = (user) => {
      onAuth(user);
    };

    document.getElementById('telegram-login-container').appendChild(script);
    setIsLoading(false);

    return () => {
      delete window.onTelegramAuth;
    };
  }, [onAuth]);

  return (
    <div className="flex flex-col items-center gap-4">
      {isLoading && (
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
          <span>Загрузка...</span>
        </div>
      )}
      <div id="telegram-login-container"></div>
    </div>
  );
}