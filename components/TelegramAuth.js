// components/TelegramAuth.js
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Отключаем SSR, чтобы код выполнялся только в браузере
const TelegramAuth = dynamic(() => import('./TelegramAuthClient'), {
  ssr: false, // Загрузка только на клиенте
  loading: () => (
    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
      </svg>
      <span>Загрузка...</span>
    </div>
  )
});

export default TelegramAuth;