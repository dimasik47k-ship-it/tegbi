// components/TelegramLoginWidget.js
'use client'; // Важно: только клиентский код

import { useEffect, useState } from 'react';

export default function TelegramLoginWidget({ onAuth }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = document.getElementById('telegram-login-widget');
    if (!container) return;

    // Очищаем старые элементы
    container.innerHTML = '';

    // Создаем скрипт старым методом
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22'; // Стабильная версия
    script.async = true;
    
    // ВАЖНО: Используем Username вместо Client ID
    script.setAttribute('data-telegram-login', 'Su2yfuicf3p9_bot');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-radius', '12');
    script.setAttribute('data-onauth', 'window.handleTelegramLoginCallback');
    script.setAttribute('data-request-access', 'write');

    // Глобальный обработчик обратного вызова
    window.handleTelegramLoginCallback = (userData) => {
      if (userData.error) {
        console.error('Ошибка авторизации:', userData.error);
        alert('Ошибка входа');
        return;
      }

      setIsLoaded(true);
      
      // Подготовим данные в удобном формате
      const formattedUser = {
        id: String(userData.id),
        first_name: userData.first_name,
        last_name: userData.last_name || '',
        username: userData.username ? '@' + userData.username : '',
        photo_url: userData.photo_url,
        auth_date: userData.auth_date,
        hash: userData.hash // Сохраняем для безопасности
      };

      onAuth(formattedUser);
    };

    container.appendChild(script);

    // Очистка при размонтировании
    return () => {
      if (container) container.innerHTML = '';
      delete window.handleTelegramLoginCallback;
    };
  }, [onAuth]);

  return (
    <div 
      id="telegram-login-widget" 
      className={`transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="tg-auth-button-placeholder"></div>
      {/* Скрипт сам создаст кнопку внутри контейнера */}
    </div>
  );
}