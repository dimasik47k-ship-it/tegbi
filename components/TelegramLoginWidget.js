// components/TelegramLoginWidget.js
'use client'; // ⚡️ ОБЯЗАТЕЛЬНО для компонентов Next.js

import { useEffect } from 'react';

export default function TelegramLoginWidget({ onAuth }) {
  useEffect(() => {
    // Проверяем, есть ли уже скрипт
    if (document.querySelector('script[src*="telegram-widget.js"]')) return;

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    
    // Устанавливаем данные бота
    script.setAttribute('data-telegram-login', 'Su2yfuicf3p9_bot'); // Твой бот
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-radius', '12');
    script.setAttribute('data-onauth', 'window.handleTelegramLoginCallback');
    script.setAttribute('data-request-access', 'write');

    // Создаём обработчик успеха
    window.handleTelegramLoginCallback = (userData) => {
      if (userData.error) {
        console.error('Ошибка авторизации:', userData.error);
        alert('Ошибка входа в Telegram');
        return;
      }
      
      onAuth(userData); // Отправляем данные на страницу профиля
    };

    // Находим контейнер и добавляем скрипт
    const container = document.getElementById('telegram-login-container');
    if (container) {
      container.appendChild(script);
    } else {
      console.warn('Контейнер #telegram-login-container не найден!');
    }

    // Очистка при размонтировании
    return () => {
      delete window.handleTelegramLoginCallback;
      const container = document.getElementById('telegram-login-container');
      if (container) container.innerHTML = '';
    };
  }, [onAuth]);

  return (
    <div id="telegram-login-container" className="flex justify-center">
      {/* Скрипт сам создаст кнопку внутри */}
    </div>
  );
}