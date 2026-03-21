import Head from 'next/head';

export default function DownloadPage() {
  const version = '1.0.0';
  const releaseDate = '2026-03-21';
  const fileSize = '~85 MB';

  return (
    <>
      <Head>
        <title>Скачать Tegbi Catalog - seraviellex PROJECTS</title>
        <meta name="description" content="Скачайте настольное приложение Tegbi Catalog для Windows" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Tegbi Catalog
                </h1>
                <p className="text-xs text-gray-500">by seraviellex PROJECTS</p>
              </div>
            </div>
            <a 
              href="/" 
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              На главную
            </a>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Версия {version} • Бесплатно
            </div>
            
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Скачайте приложение для ПК
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Настольная версия каталога Telegram ботов с автообновлением и удобным интерфейсом
            </p>
          </div>

          {/* Download Card */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6">
                <div className="flex items-center justify-between text-white">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">Tegbi Catalog</h3>
                    <p className="text-blue-100">Для Windows 10/11</p>
                  </div>
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8">
                {/* Version Info */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Версия</p>
                    <p className="font-semibold text-gray-900">{version}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Размер</p>
                    <p className="font-semibold text-gray-900">{fileSize}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Дата</p>
                    <p className="font-semibold text-gray-900">{releaseDate}</p>
                  </div>
                </div>

                {/* Download Button */}
                <a
                  href="https://drive.google.com/uc?export=download&id=1KmxB7FKSF4xLNkyIRNTK3CG8Uiy-A_on"
                  download
                  className="block w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-center font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 mb-4"
                >
                  <div className="flex items-center justify-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Скачать для Windows
                  </div>
                </a>

                <p className="text-center text-sm text-gray-500 mb-6">
                  NSIS Installer • Windows 10/11 (64-bit)
                </p>

                {/* Features */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Возможности приложения
                  </h4>
                  <ul className="space-y-3">
                    {[
                      'Автообновление каталога ботов',
                      'Работает без браузера',
                      'Удобный интерфейс в стиле Telegram',
                      'Быстрый поиск и фильтрация',
                      'Открытие ботов в Telegram в один клик',
                      'Минимальное потребление ресурсов'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* System Requirements */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Системные требования</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Операционная система</p>
                  <p className="font-medium text-gray-900">Windows 10/11 (64-bit)</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Процессор</p>
                  <p className="font-medium text-gray-900">Intel Core i3 или выше</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Оперативная память</p>
                  <p className="font-medium text-gray-900">2 GB RAM</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Свободное место</p>
                  <p className="font-medium text-gray-900">200 MB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Installation Guide */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Как установить</h3>
              <ol className="space-y-4">
                {[
                  'Скачайте установщик по кнопке выше',
                  'Запустите файл Tegbi-Catalog-1.0.0-Setup.exe',
                  'Следуйте инструкциям мастера установки',
                  'Запустите приложение из меню Пуск или с рабочего стола',
                  'Наслаждайтесь удобным каталогом ботов!'
                ].map((step, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 pt-1">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Support */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">Есть вопросы или предложения?</p>
            <a 
              href="https://t.me/seraviellex" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              Связаться с разработчиком
            </a>
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