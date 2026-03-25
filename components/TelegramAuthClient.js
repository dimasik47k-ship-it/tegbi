import { useEffect } from 'react';

export default function TelegramAuthClient({ onAuth }) {
  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_TELEGRAM_CLIENT_ID;
    
    if (!clientId) {
      console.error('❌ NEXT_PUBLIC_TELEGRAM_CLIENT_ID не задан');
      return;
    }

    const container = document.getElementById('telegram-login-container');
    if (!container) return;

    container.innerHTML = '';

    // Создаём кнопку
    const button = document.createElement('button');
    button.className = 'tg-auth-button bg-[#54a9eb] hover:bg-[#4a9fd8] text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center gap-2';
    button.innerHTML = `
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.44-.42-1.38-.88.03-.24.37-.49 1.03-.75 4.04-1.76 6.74-2.92 8.09-3.48 3.85-1.6 4.64-1.89 5.17-1.89.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.13-.03.26z"/>
      </svg>
      Войти через Telegram
    `;
    
    button.onclick = () => {
      const currentUrl = window.location.origin + window.location.pathname;
      
      const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: currentUrl,
        response_type: 'code',
        scope: 'openid profile',
        state: Math.random().toString(36).substring(7),
      });
      
      const authUrl = `https://oauth.telegram.org/auth?${params.toString()}`;
      window.location.href = authUrl; // 🔥 Перенаправляем на Telegram (вместо popup)
    };

    container.appendChild(button);
  }, [onAuth]);

  return <div id="telegram-login-container" className="flex justify-center" />;
}