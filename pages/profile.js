import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import TelegramAuth from '../components/TelegramAuth';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Проверяем есть ли код авторизации в URL (после возврата из Telegram)
    const checkAuthCode = async () => {
      if (typeof window === 'undefined') return;
      
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');
      
      if (code) {
        setIsProcessing(true);
        try {
          // Обмениваем код на токен через API
          const response = await fetch('/api/auth/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              code,
              redirect_uri: window.location.origin + '/profile',
              state 
            }),
          });

          const data = await response.json();
          
          if (data.valid && data.user) {
            // Сохраняем пользователя
            setUser(data.user);
            localStorage.setItem('tg_user', JSON.stringify(data.user));
            
            // Очищаем URL от параметров авторизации
            window.history.replaceState({}, document.title, '/profile');
          } else {
            console.error('Auth failed:', data.error);
            alert('Ошибка входа: ' + (data.error || 'Неизвестная ошибка'));
          }
        } catch (error) {
          console.error('Auth error:', error);
          alert('Ошибка подключения к серверу');
        } finally {
          setIsProcessing(false);
        }
      } else {
        // Проверяем сохранённого пользователя в localStorage
        const savedUser = localStorage.getItem('tg_user');
        if (savedUser) {
          try {
            setUser(JSON.parse(savedUser));
          } catch (error) {
            console.error('Ошибка парсинга данных:', error);
            localStorage.removeItem('tg_user');
          }
        }
      }
      setIsLoading(false);
    };

    checkAuthCode();
  }, []);

  // Обработчик успешного входа (через postMessage)
  const handleAuth = async (authData) => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authData),
      });

      const data = await response.json();
      
      if (data.valid && data.user) {
        setUser(data.user);
        localStorage.setItem('tg_user', JSON.stringify(data.user));
        alert('✅ Успешный вход!');
      } else {
        alert('Ошибка авторизации: ' + (data.error || 'Неизвестная ошибка'));
      }
    } catch (error) {
      console.error('Auth error:', error);
      alert('Ошибка подключения к серверу');
    } finally {
      setIsProcessing(false);
    }
  };

  // Выход из аккаунта
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tg_user');
    }
    setUser(null);
  };

  // Экран загрузки
  if (isLoading || isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-blue-600 mx-auto mb-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
          <p className="text-gray-600 dark:text-gray-400">
            {isProcessing ? 'Выполняется вход...' : 'Загрузка...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Профиль — Tegbi Catalog</title>
        <meta name="description" content="Личный профиль пользователя" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Navbar />

        <main className="container mx-auto px-4 pt-32 pb-16">
          <div className="max-w-2xl mx-auto">
            
            {/* Форма входа */}
            {!user ? (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.44-.42-1.38-.88.03-.24.37-.49 1.03-.75 4.04-1.76 6.74-2.92 8.09-3.48 3.85-1.6 4.64-1.89 5.17-1.89.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.13-.03.26z"/>
                  </svg>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Вход в профиль
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                  Войдите через Telegram для доступа к личному кабинету
                </p>

                {/* Компонент аутентификации */}
                <TelegramAuth onAuth={handleAuth} />

                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Безопасно</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Быстро</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Профиль пользователя */
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                {/* Шапка профиля */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>
                
                <div className="px-8 pb-8">
                  {/* Аватарка */}
                  <div className="relative -mt-16 mb-6">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg bg-white">
                      {user.photo_url || user.picture ? (
                        <img 
                          src={user.photo_url || user.picture} 
                          alt={user.name || user.first_name || 'User'}
                          className="w-full h-full object-cover"
                          onError={(e) => e.target.style.display = 'none'}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-gray-800">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Информация */}
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {user.name || user.first_name || 'Пользователь'}
                  </h1>
                  {user.username || user.preferred_username ? (
                    <p className="text-blue-600 dark:text-blue-400 mb-6">
                      @{(user.username || user.preferred_username || '').replace('@', '')}
                    </p>
                  ) : null}

                  {/* Детали */}
                  <div className="space-y-3 mb-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>ID: {user.sub || user.id}</span>
                    </div>
                    {(user.iat || user.auth_date) && (
                      <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>
                          Вход: {new Date((user.iat || user.auth_date) * 1000).toLocaleDateString('ru-RU')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Кнопка выхода */}
                  <button 
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Выйти
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}