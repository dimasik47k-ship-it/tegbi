import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function HelpPage() {
  const faqs = [
    {
      category: 'Общие вопросы',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      questions: [
        {
          q: 'Что такое Tegbi Catalog?',
          a: 'Tegbi Catalog — это бесплатный каталог проверенных Telegram-ботов проекта seraviellex PROJECTS. Мы собираем, структурируем и предоставляем информацию о ботах, чтобы вы могли быстро найти подходящий инструмент для своих задач.'
        },
        {
          q: 'Каталог бесплатный?',
          a: 'Да, полностью. Доступ ко всем функциям каталога не требует регистрации, оплаты или подписки. Мы не показываем рекламу и не собираем персональные данные.'
        },
        {
          q: 'Как часто обновляется каталог?',
          a: 'Каталог обновляется по мере добавления новых ботов или изменения информации о существующих. Актуальные изменения отображаются на странице Обновления.'
        },
      ]
    },
    {
      category: 'Использование ботов',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      questions: [
        {
          q: 'Как начать использовать бота?',
          a: 'Найдите бота в каталоге, нажмите кнопку «Открыть в Telegram» и начните диалог. Большинство ботов имеют команду /start для начала работы. Подробная инструкция доступна на странице каждого бота.'
        },
        {
          q: 'Бот не отвечает — что делать?',
          a: 'Возможные причины: бот временно недоступен, обновляется или удалён разработчиком. Попробуйте: 1) Подождать несколько минут, 2) Проверить статус бота на его странице, 3) Написать в поддержку @seraviellex.'
        },
        {
          q: 'Безопасно ли использовать ботов из каталога?',
          a: 'Мы проверяем ботов перед добавлением, но не можем гарантировать безопасность на 100%. Всегда соблюдайте осторожность: не передавайте ботам конфиденциальные данные, пароли или информацию о платежных картах.'
        },
        {
          q: 'Бот запрашивает доступ к данным — это нормально?',
          a: 'Некоторые боты требуют доступ к определённым данным для работы (например, к сообщениям в группе для модерации). Перед предоставлением доступа ознакомьтесь с описанием бота и решите, доверяете ли вы ему.'
        },
      ]
    },
    {
      category: 'Добавление ботов',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      questions: [
        {
          q: 'Как добавить бота в каталог?',
          a: 'Напишите нам в поддержку @seraviellex с информацией о боте: название, юзернейм, краткое описание и категория. Мы проверим бота и добавим его в каталог в течение нескольких дней.'
        },
        {
          q: 'Какие требования к ботам?',
          a: 'Бот должен быть публичным, стабильно работать, иметь понятное описание и не нарушать правила Telegram. Мы не добавляем ботов для спама, мошенничества или распространения вредоносного контента.'
        },
        {
          q: 'Можно ли удалить бота из каталога?',
          a: 'Да. Если вы разработчик бота и хотите удалить его из каталога, напишите нам в поддержку @seraviellex с подтверждением прав на бота.'
        },
      ]
    },
    {
      category: 'Технические вопросы',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      questions: [
        {
          q: 'Сайт не загружается — что делать?',
          a: 'Попробуйте: 1) Обновить страницу (Ctrl+R), 2) Очистить кэш браузера, 3) Проверить подключение к интернету. Если проблема сохраняется — напишите в поддержку.'
        },
        {
          q: 'Работает ли сайт на мобильном?',
          a: 'Да, сайт полностью адаптивен и корректно отображается на смартфонах, планшетах и компьютерах. Также доступно приложение для Android.'
        },
        {
          q: 'Какие браузеры поддерживаются?',
          a: 'Современные версии Chrome, Firefox, Safari, Edge и других браузеров. Для наилучшего опыта рекомендуем использовать актуальную версию браузера.'
        },
      ]
    },
    {
      category: 'Поддержка',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      questions: [
        {
          q: 'Как связаться с поддержкой?',
          a: 'Напишите нам в Telegram: @seraviellex. Мы отвечаем в течение 24 часов в рабочие дни. Для срочных вопросов укажите «Срочно» в начале сообщения.'
        },
        {
          q: 'Что указать при обращении в поддержку?',
          a: 'Для быстрого решения проблемы укажите: 1) Суть вопроса, 2) Скриншот ошибки (если есть), 3) Браузер и устройство, 4) Ссылку на страницу, где возникла проблема.'
        },
        {
          q: 'Можно ли предложить улучшение?',
          a: 'Конечно! Мы всегда открыты к предложениям. Напишите идею в поддержку @seraviellex — мы рассмотрим её и, если она подходит, добавим в план развития.'
        },
      ]
    },
  ];

  return (
    <>
      <Head>
        <title>Помощь и вопросы | Tegbi Catalog</title>
        <meta name="description" content="Ответы на частые вопросы о Tegbi Catalog" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Navbar />

        <main className="container mx-auto px-4 pt-32 pb-16">
          
          {/* Заголовок */}
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Помощь и вопросы
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Ответы на часто задаваемые вопросы
            </p>
          </div>

          {/* Поиск по вопросам */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Найти вопрос..."
                className="w-full px-6 py-4 pl-14 text-lg rounded-2xl border-2 border-gray-200 
                           focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 
                           transition-all duration-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
              <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Категории вопросов */}
          <div className="max-w-4xl mx-auto space-y-8">
            {faqs.map((category, categoryIndex) => (
              <section key={categoryIndex} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                
                {/* Заголовок категории */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-5 flex items-center gap-3">
                  <div className="text-white">
                    {category.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-white">
                    {category.category}
                  </h2>
                </div>

                {/* Вопросы */}
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {category.questions.map((item, index) => (
                    <details 
                      key={index}
                      className="group px-6 py-5 cursor-pointer"
                    >
                      <summary className="flex items-start justify-between gap-4 list-none">
                        <span className="font-medium text-gray-900 dark:text-white pr-4">
                          {item.q}
                        </span>
                        <svg 
                          className="w-5 h-5 text-gray-400 flex-shrink-0 transform group-open:rotate-180 transition-transform" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Контакты поддержки */}
          <div className="max-w-3xl mx-auto mt-16">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">
                Не нашли ответ?
              </h3>
              <p className="text-blue-100 mb-6">
                Напишите нам — мы поможем решить ваш вопрос!
              </p>
              <a
                href="https://t.me/seraviellex"
                className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.44-.42-1.38-.88.03-.24.37-.49 1.03-.75 4.04-1.76 6.74-2.92 8.09-3.48 3.85-1.6 4.64-1.89 5.17-1.89.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.13-.03.26z"/>
                </svg>
                Написать в поддержку
              </a>
            </div>
          </div>

          {/* Быстрые ссылки */}
          <div className="max-w-3xl mx-auto mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Или перейдите на одну из страниц:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Каталог ботов
              </Link>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <Link
                href="/about"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                О проекте
              </Link>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <Link
                href="/privacy"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Политика конфиденциальности
              </Link>
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