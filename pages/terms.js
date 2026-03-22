import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function TermsPage() {
  const lastUpdated = '20 января 2026 г.';

  return (
    <>
      <Head>
        <title>Условия использования | Tegbi Catalog</title>
        <meta name="description" content="Условия использования проекта Tegbi Catalog" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Navbar />

        <main className="container mx-auto px-4 pt-32 pb-16">
          
          {/* Заголовок */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Условия использования
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
                1. Принятие условий
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Используя веб-сайт <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-sm">tegbi.vercel.app</code> 
                и связанные сервисы Tegbi Catalog, вы подтверждаете, что ознакомились с настоящими 
                Условиями использования и принимаете их в полном объёме.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                Если вы не согласны с условиями — пожалуйста, не используйте данный сервис.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                2. Описание сервиса
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Tegbi Catalog — это информационный каталог публичных Telegram-ботов. 
                Сервис предоставляет:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-3 space-y-1">
                <li>Информацию о доступных Telegram-ботах</li>
                <li>Ссылки для перехода к ботам в Telegram</li>
                <li>Краткие описания и возможности ботов</li>
                <li>Поиск и фильтрацию по каталогу</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                Сервис предоставляется <strong>бесплатно</strong> и не требует регистрации.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                3. Правила использования
              </h2>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Разрешается:</h3>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1">
                      <li>Использовать каталог для поиска Telegram-ботов</li>
                      <li>Делиться ссылками на сервис</li>
                      <li>Использовать публичный API (при наличии)</li>
                      <li>Предлагать ботов для добавления в каталог</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Запрещается:</h3>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1">
                      <li>Использовать сервис в незаконных целях</li>
                      <li>Пытаться получить несанкционированный доступ к серверу</li>
                      <li>Распространять вредоносное ПО через сервис</li>
                      <li>Копировать контент каталога в коммерческих целях без разрешения</li>
                      <li>Выдавать себя за представителей проекта</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                4. Отказ от ответственности
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Tegbi Catalog предоставляет информацию о сторонних Telegram-ботах «как есть». 
                Мы <strong>не несём ответственности</strong> за:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-3 space-y-1">
                <li>Работоспособность и доступность перечисленных ботов</li>
                <li>Содержимое и функциональность ботов</li>
                <li>Убытки или ущерб от использования ботов</li>
                <li>Изменения в политике Telegram или ботов</li>
                <li>Точность и актуальность информации о ботах</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                Пользователь самостоятельно принимает решение об использовании ботов и несёт 
                полную ответственность за свои действия.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                5. Интеллектуальная собственность
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Все права на дизайн, код и контент сайта Tegbi Catalog принадлежат 
                <strong> seraviellex PROJECTS</strong>, если не указано иное.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                Информация о Telegram-ботах (названия, описания, логотипы) принадлежит 
                их respective владельцам и используется в информационных целях.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                6. Изменения условий
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Мы оставляем за собой право изменять настоящие Условия использования в любое время. 
                Актуальная версия всегда доступна по адресу:
              </p>
              <p className="mt-3">
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm break-all">
                  https://tegbi.vercel.app/terms
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
                7. Контакты
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                По вопросам, связанным с настоящими Условиями использования, 
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