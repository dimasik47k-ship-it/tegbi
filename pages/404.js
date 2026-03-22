import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>Страница не найдена | Tegbi Catalog</title>
        <meta name="description" content="Страница, которую вы ищете, не существует" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Navbar />

        <main className="container mx-auto px-4 pt-32 pb-16">
          <div className="max-w-2xl mx-auto text-center">
            
            {/* Иконка ошибки */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-8 shadow-lg">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            {/* Заголовок */}
            <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
              404
            </h1>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Страница не найдена
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              К сожалению, страница, которую вы ищете, не существует или была перемещена.
            </p>

            {/* Кнопки действий */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-semibold text-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                На главную
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 font-semibold text-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                О проекте
              </Link>
            </div>

            {/* Полезные ссылки */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Возможно, вы искали:
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link
                  href="/"
                  className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                >
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Каталог ботов</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Все Telegram-боты</p>
                  </div>
                </Link>
                <Link
                  href="/download"
                  className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                >
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Скачать</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Приложения для ПК и Android</p>
                  </div>
                </Link>
                <Link
                  href="/updates"
                  className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                >
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Обновления</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">История версий</p>
                  </div>
                </Link>
                <Link
                  href="/about"
                  className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                >
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">О проекте</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Информация о Tegbi</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Контакты поддержки */}
            <div className="mt-8 text-gray-600 dark:text-gray-400">
              <p>Не нашли то, что искали?</p>
              <p className="mt-2">
                Напишите нам:{' '}
                <a 
                  href="https://t.me/seraviellex" 
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  @seraviellex
                </a>
              </p>
            </div>

          </div>
        </main>

        {/* Футер */}
        <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-100 dark:border-gray-700 py-8 mt-16">
          <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} seraviellex PROJECTS. Все права защищены.</p>
            <div className="flex justify-center gap-6 mt-3">
              <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Политика конфиденциальности
              </Link>
              <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Условия использования
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}