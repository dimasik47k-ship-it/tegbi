import Head from 'next/head';

export default function DownloadPage() {
  const platforms = [
    {
      name: 'Windows',
      description: 'Приложение для ПК (Windows 10/11)',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4h-13.05M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
        </svg>
      ),
      downloadUrl: 'https://disk.yandex.ru/d/0MCUYlZZ4Gyx2A',
      size: '~45 MB',
      version: '1.0.0',
      badge: 'Рекомендуется',
      badgeColor: 'from-green-500 to-emerald-600',
    },
    {
      name: 'Android',
      description: 'Мобильное приложение (Android 7.0+)',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1529-.5676.416.416 0 00-.5672.1525l-2.0225 3.503c-1.6657-.7673-3.539-1.2011-5.5366-1.2011-1.9972 0-3.8705.4338-5.5362 1.2011L4.0406 5.4471a.4161.4161 0 00-.5676-.1525.4157.4157 0 00-.1525.5676l1.9973 3.4592C2.6889 11.1867.9953 14.418.9953 18.0492h22.0094c0-3.6312-1.694-6.8625-4.3228-8.7278"/>
        </svg>
      ),
      downloadUrl: 'https://disk.yandex.ru/d/q05FWmnEMzRbjw',
      size: '~5 MB',
      version: '1.0.0',
      badge: 'Новое',
      badgeColor: 'from-blue-500 to-purple-600',
    },
    {
      name: 'Веб-версия',
      description: 'Открыть в браузере (любое устройство)',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      downloadUrl: 'https://tegbi.vercel.app',
      size: 'Не требуется',
      version: 'Онлайн',
      badge: null,
      badgeColor: null,
    },
  ];

  return (
    <>
      <Head>
        <title>Скачать Tegbi Catalog</title>
        <meta name="description" content="Загрузите Tegbi Catalog для Windows, Android или используйте веб-версию" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Tegbi Catalog
                </h1>
                <p className="text-xs text-gray-500">Выберите платформу</p>
              </div>
            </div>
            <a href="/" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              На главную
            </a>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-4 py-16">
          
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Бесплатно и без регистрации
            </div>
            
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Выберите платформу
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tegbi Catalog доступен на всех устройствах. Контент обновляется автоматически!
            </p>
          </div>

          {/* Platform Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {platforms.map((platform, index) => (
              <div 
                key={index}
                className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 group"
              >
                {/* Badge */}
                {platform.badge && (
                  <span className={`absolute top-4 right-4 px-3 py-1 bg-gradient-to-r ${platform.badgeColor} text-white text-xs font-medium rounded-full`}>
                    {platform.badge}
                  </span>
                )}

                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  {platform.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {platform.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {platform.description}
                </p>

                {/* Info */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <span>📦 {platform.size}</span>
                  <span>🏷️ v{platform.version}</span>
                </div>

                {/* Download Button */}
                <a
                  href={platform.downloadUrl}
                  className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl text-center transition-all transform hover:scale-105"
                >
                  {platform.name === 'Веб-версия' ? 'Открыть' : 'Скачать'}
                </a>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Почему Tegbi Catalog?
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mx-auto mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Автообновление</h4>
                <p className="text-sm text-gray-600">Новые боты появляются без переустановки</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mx-auto mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Безопасно</h4>
                <p className="text-sm text-gray-600">Без рекламы и сбора данных</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mx-auto mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Облачный каталог</h4>
                <p className="text-sm text-gray-600">Все боты синхронизированы</p>
              </div>
            </div>
          </div>

          {/* Installation Guide (для Android) */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Установка Android APK
            </h3>

            <div className="grid md:grid-cols-4 gap-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Скачайте APK</h4>
                  <p className="text-gray-600 text-xs">Нажмите кнопку выше</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Разрешите установку</h4>
                  <p className="text-gray-600 text-xs">Настройки → Безопасность</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Установите</h4>
                  <p className="text-gray-600 text-xs">Откройте файл и нажмите «Установить»</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Готово!</h4>
                  <p className="text-gray-600 text-xs">Запустите приложение</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-5xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
            <p>© 2026 seraviellex PROJECTS. Все права защищены.</p>
          </div>
        </footer>
      </div>
    </>
  );
}