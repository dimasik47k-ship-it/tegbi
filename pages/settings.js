import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import SettingsForm from '../components/SettingsForm';
import BannerCustomizer from '../components/BannerCustomizer';
import ShareModal from '../components/ShareModal';

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);

  // Настройки по умолчанию
  const [settings, setSettings] = useState({
    displayName: '',
    privacy: {
      showName: true,
      showUsername: true,
      showPhoto: true,
      showStats: true,
    },
    theme: 'auto', // light, dark, auto
    language: 'ru',
    banner: {
      type: 'gradient', // gradient, color, image
      value: 'from-blue-500 to-purple-600',
    },
  });

  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedUser = localStorage.getItem('tg_user');
    const savedSettings = localStorage.getItem('tg_settings');

    if (!savedUser) {
      router.push('/profile');
      return;
    }

    setUser(JSON.parse(savedUser));

    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    } else if (savedUser) {
      // Инициализация из данных пользователя
      const userData = JSON.parse(savedUser);
      setSettings(prev => ({
        ...prev,
        displayName: userData.name || userData.first_name || '',
      }));
    }

    setIsLoading(false);
  }, [router]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Сохраняем локально
      localStorage.setItem('tg_settings', JSON.stringify(settings));
      
      // Можно отправить на сервер для синхронизации
      // await fetch('/api/settings', { method: 'POST', body: JSON.stringify(settings) });
      
      showToast('✅ Настройки сохранены!');
    } catch (error) {
      console.error('Save error:', error);
      showToast('Ошибка сохранения', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tg_user');
      localStorage.removeItem('tg_settings');
    }
    router.push('/profile');
  };

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

  return (
    <>
      <Head>
        <title>Настройки — Tegbi Catalog</title>
        <meta name="description" content="Настройки профиля" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Navbar />
        
        {toast && (
          <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-xl shadow-2xl ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white`}>
            {toast.message}
          </div>
        )}

        {showShareModal && (
          <ShareModal 
            userId={user?.sub || user?.id} 
            onClose={() => setShowShareModal(false)} 
          />
        )}

        <main className="container mx-auto px-4 pt-32 pb-16">
          <div className="max-w-4xl mx-auto">
            
            {/* Заголовок */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Настройки профиля
              </h1>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowShareModal(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Поделиться
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Выйти
                </button>
              </div>
            </div>

            {/* Основной контент */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Левая колонка - Настройки */}
              <div className="lg:col-span-2 space-y-6">
                <SettingsForm 
                  settings={settings} 
                  onChange={setSettings} 
                />
                
                <BannerCustomizer
                  banner={settings.banner}
                  onChange={(banner) => setSettings(prev => ({ ...prev, banner }))}
                />
              </div>

              {/* Правая колонка - Предпросмотр */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 sticky top-32">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Предпросмотр
                  </h2>
                  
                  {/* Мини-превью профиля */}
                  <div className="rounded-xl overflow-hidden mb-4">
                    <div className={`h-20 bg-gradient-to-r ${settings.banner.value}`}></div>
                    <div className="px-4 pb-4 -mt-10">
                      <div className="w-20 h-20 rounded-xl overflow-hidden border-4 border-white dark:border-gray-800 bg-white">
                        {user?.photo_url && settings.privacy.showPhoto ? (
                          <img src={user.photo_url} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                          </div>
                        )}
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white mt-2">
                        {settings.displayName || user?.name || 'Пользователь'}
                      </h3>
                      {settings.privacy.showUsername && user?.username && (
                        <p className="text-sm text-blue-600">@{user.username.replace('@', '')}</p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        Сохранение...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Сохранить
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}