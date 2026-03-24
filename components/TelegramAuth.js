import { useEffect } from 'react';

export default function TelegramAuth({ onAuth }) {
  useEffect(() => {
    // Загружаем новый SDK Telegram для OIDC при монтировании компонента
    const script = document.createElement('script');
    script.src = 'https://oauth.telegram.org/js/telegram-login.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleTelegramLogin = () => {
    if (window.Telegram && window.Telegram.Login) {
      window.Telegram.Login.auth(
        {
          // Берем Client ID из переменных окружения (должен начинаться с NEXT_PUBLIC_)
          client_id: process.env.NEXT_PUBLIC_TELEGRAM_CLIENT_ID, 
          request_access: ['write'], // Опционально: запрос права на отправку сообщений
        },
        (data) => {
          if (data.error) {
            console.error('Ошибка авторизации Telegram:', data.error);
          } else {
            console.log('Успешный ответ от Telegram SDK:', data);
            // Передаем объект { id_token, user } в родительский компонент
            onAuth(data);
          }
        }
      );
    } else {
      console.error('Telegram SDK еще не загрузился');
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button 
        onClick={handleTelegramLogin}
        className="bg-[#2481cc] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#1d6ba8] transition-colors"
      >
        Войти через Telegram
      </button>
    </div>
  );
}