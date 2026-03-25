import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import ShareModal from '../../components/ShareModal';

export default function PublicProfilePage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [profileData, setProfileData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Проверяем текущего пользователя
    const savedUser = localStorage.getItem('tg_user');
    const savedSettings = localStorage.getItem('tg_settings');
    
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      
      // Проверяем владелец ли это
      setIsOwner(String(user.sub || user.id) === String(id));
      
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    }

    // Загружаем данные профиля
    if (id) {
      // В реальном проекте тут будет fetch к API
      // Для демо используем localStorage
      const allUsers = JSON.parse(localStorage.getItem('tg_all_users') || '{}');
      setProfileData(allUsers[id] || null);
    }

    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <svg className="animate-spin h-10 w-10 text-blue-600" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
      </div>
    );
  }

  // Применяем настройки приватности
  const displayData = profileData || currentUser;
  const privacy = settings?.privacy || { showName: true, showUsername: true, showPhoto: true, showStats: true };
  const banner = settings?.banner || { type: 'gradient', value: 'from-blue-500 to-purple-600' };
  const displayName = settings?.displayName || displayData?.name || displayData?.first_name || 'Пользователь';

  return (
    <>
      <Head>
        <title>{displayName} — Tegbi Catalog</title>
        <meta name="description" content={`Профиль ${displayName} в Tegbi Catalog`} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Navbar />

        {showShareModal && (
          <ShareModal userId={id} onClose={() => setShowShareModal(false)} />
        )}

        <main className="container mx-auto px-4 pt-32 pb-16">
          <div className="max-w-2xl mx-auto">
            
            {displayData ? (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                {/* Баннер */}
                <div className={`h-32 bg-gradient-to-r ${banner.value}`}>
                  {banner.type === 'image' && (
                    <img src={banner.value} alt="Banner" className="w-full h-full object-cover" />
                  )}
                </div>
                
                <div className="px-8 pb-8">
                  {/* Аватарка + Кнопки */}
                  <div className="relative -mt-16 mb-6 flex justify-between items-end">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg bg-white">
                      {privacy.showPhoto && displayData.photo_url ? (
                        <img src={displayData.photo_url} alt={displayName} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    {/* Кнопки (только для владельца или публичные) */}
                    <div className="flex gap-2 mb-2">
                      <button
                        onClick={() => setShowShareModal(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl transition-colors"
                        title="Поделиться"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                      </button>
                      
                      {/* Кнопка настроек ТОЛЬКО для владельца */}
                      {isOwner && (
                        <button
                          onClick={() => router.push('/settings')}
                          className="bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-xl transition-colors"
                          title="Настройки"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Информация */}
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {privacy.showName ? displayName : 'Скрыто'}
                  </h1>
                  {privacy.showUsername && displayData.username && (
                    <p className="text-blue-600 dark:text-blue-400 mb-6">
                      @{displayData.username.replace('@', '')}
                    </p>
                  )}

                  {/* Статистика */}
                  {privacy.showStats && (
                    <div className="space-y-3 mb-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>ID: {displayData.sub || displayData.id}</span>
                      </div>
                      {(displayData.iat || displayData.auth_date) && (
                        <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>
                            В системе с {new Date((displayData.iat || displayData.auth_date) * 1000).toLocaleDateString('ru-RU')}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>Последний вход: {new Date().toLocaleDateString('ru-RU')}</span>
                      </div>
                    </div>
                  )}

                  {/* Кнопка написать (для не-владельцев) */}
                  {!isOwner && displayData.username && (
                    <a
                      href={`https://t.me/${displayData.username.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.44-.42-1.38-.88.03-.24.37-.49 1.03-.75 4.04-1.76 6.74-2.92 8.09-3.48 3.85-1.6 4.64-1.89 5.17-1.89.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.13-.03.26z"/>
                      </svg>
                      Написать в Telegram
                    </a>
                  )}

                  {/* Кнопка выхода ТОЛЬКО для владельца в его профиле */}
                  {isOwner && (
                    <button
                      onClick={() => router.push('/profile')}
                      className="w-full mt-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Редактировать профиль
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Профиль не найден
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Пользователь с таким ID не существует или скрыл свой профиль
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}