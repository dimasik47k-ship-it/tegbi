import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function PrivacyPage() {
  const lastUpdated = '20 января 2026 г.';

  return (
    <>
      <Head>
        <title>Политика конфиденциальности | Tegbi Catalog</title>
        <meta name="description" content="Политика конфиденциальности проекта Tegbi Catalog" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Navbar />

        <main className="container mx-auto px-4 pt-32 pb-16">
          
          {/* Заголовок */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Политика конфиденциальности
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Последнее обновление: <time dateTime="2026-01-20">{lastUpdated}</time>
            </p>
          </div>

          {/* Контент */}
          <article className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 md:p-12">
            
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                1. Общие положения
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Настоящая Политика конфиденциальности описывает, как проект <strong>Tegbi Catalog</strong> 
                («мы», «нас», «наш») обрабатывает информацию пользователей при использовании веб-сайта 
                <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-sm">tegbi.vercel.app</code> 
                и связанных сервисов.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                Используя наш сервис, вы соглашаетесь с условиями настоящей Политики. 
                Если вы не согласны — пожалуйста, воздержитесь от использования.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                2. Какие данные мы собираем
              </h2>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Данные, которые мы <strong>не</strong> собираем:</h3>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1">
                      <li>Персональные данные (имя, email, телефон)</li>
                      <li>IP-адреса и геолокация</li>
                      <li>История посещений и поведения</li>
                      <li>Данные аккаунтов Telegram</li>
                      <li>Файлы куки для отслеживания</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Технические данные (автоматически):</h3>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1">
                      <li>Тип браузера и версия</li>
                      <li>Операционная система</li>
                      <li>Разрешение экрана</li>
                      <li>Предпочтения языка (из настроек браузера)</li>
                    </ul>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Эти данные используются исключительно для обеспечения корректной работы сайта 
                      и не сохраняются на наших серверах.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                3. Как мы используем данные
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Tegbi Catalog — это статический каталог информации о публичных Telegram-ботах. 
                Мы не обрабатываем персональные данные пользователей и не передаём информацию третьим лицам.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                Единственная цель сбора технических данных — обеспечение стабильной работы веб-сайта 
                и корректного отображения контента на различных устройствах.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                4. Сторонние сервисы
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Наш сайт размещён на платформе <strong>Vercel</strong>. Ознакомьтесь с их политикой конфиденциальности:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-3 space-y-1">
                <li>
                  <a 
                    href="https://vercel.com/legal/privacy-policy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Политика конфиденциальности Vercel
                  </a>
                </li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                Ссылки на внешние ресурсы (Telegram, сайты ботов) открываются в новом окне. 
                Мы не несём ответственности за политику конфиденциальности сторонних сервисов.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
                5. Обновления политики
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. 
                Актуальная версия всегда доступна по адресу:
              </p>
              <p className="mt-3">
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm break-all">
                  https://tegbi.vercel.app/privacy
                </code>
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                Продолжение использования сервиса после внесения изменений означает ваше согласие 
                с обновлёнными условиями.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                6. Контакты
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                По вопросам, связанным с настоящей Политикой конфиденциальности, 
                вы можете связаться с нами:
              </p>
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <p className="text-gray-900 dark:text-white font-medium">
                  Telegram: <a href="https://t.me/seraviellex" className="text-blue-600 hover:underline dark:text-blue-400">@seraviellex</a>
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  Проект: <a href="https://tegbi.vercel.app" className="text-blue-600 hover:underline dark:text-blue-400">tegbi.vercel.app</a>
                </p>
              </div>
            </section>

            {/* Разделитель */}
            <div className="border-t border-gray-200 dark:border-gray-700 my-10"></div>

            {/* Футер документа */}
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
              <p>© {new Date().getFullYear()} seraviellex PROJECTS</p>
              <p className="mt-1">
                <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Вернуться на главную
                </Link>
              </p>
            </div>

          </article>
        </main>

        {/* Футер сайта */}
        <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-100 dark:border-gray-700 py-6">
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