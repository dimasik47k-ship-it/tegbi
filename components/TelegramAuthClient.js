// components/TelegramAuthClient.js
import { useEffect, useState } from 'react';

export default function TelegramAuth({ onAuth }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const container = document.getElementById('telegram-login-container');
    if (!container) return;

    // Удаляем старые элементы
    container.innerHTML = '';
    
    // Проверяем, не загружен ли уже скрипт
    const existingScript = document.querySelector('script[src*="oauth.telegram.org/js/telegram-login.js"]');
    
    if (existingScript) {
      initWidget();
    } else {
      const script = document.createElement('script');
      script.src = 'https://oauth.telegram.org/js/telegram-login.js?18';
      script.async = true;
      
      script.onload = () => {
        initWidget();
      };
      
      script.onerror = () => {
        console.error('❌ Не удалось загрузить Telegram Login');
        setIsLoading(false);
      };
      
      document.head.appendChild(script);
    }

    function initWidget() {
      if (!window.Telegram?.Login) {
        console.error('Telegram Login library not loaded');
        setIsLoading(false);
        return;
      }

      // Инициализация виджета
      window.Telegram.Login.init({
        client_id: Number(process.env.NEXT_PUBLIC_TELEGRAM_CLIENT_ID || 0),
        request_access: ['write'],
        lang: 'ru'
      }, (authData) => {
        if (authData.error) {
          console.error('Auth error:', authData.error);
          alert('Ошибка авторизации');
          return;
        }
        
        setIsLoading(false);
        onAuth(authData.user || authData);
      });
    }

    return () => {
      if (container) container.innerHTML = '';
    };
  }, [onAuth]);

  return (
    <div id="telegram-login-container" className="flex justify-center"></div>
  );
}