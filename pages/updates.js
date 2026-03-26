import Head from 'next/head';
import Link from 'next/link';

// ========================================
// 🎨 SVG ICONS
// ========================================
function FlaskIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
    </svg>
  );
}

function ArchiveIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
    </svg>
  );
}

export default function UpdatesPage() {
  return (
    <>
      <Head>
        <title>Проект закрыт | Tegbi Catalog</title>
        <meta name="description" content="Tegbi Catalog официально закрыт" />
        <meta name="robots" content="noindex" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        
        {/* 🔴 БАННЕР: ПРОЕКТ ЗАКРЫТ */}
        <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white py-4 px-4">
          <div className="max-w-4xl mx-auto flex items-center justify-center gap-3 text-center">
            <ArchiveIcon />
            <span className="font-semibold">
              Проект официально закрыт • Сайт работает в архивном режиме
            </span>
          </div>
        </div>

        {/* Header */}
        <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl flex items-center justify-center">
                <ArchiveIcon />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-700 dark:text-gray-300">
                  Tegbi Catalog
                </h1>
                <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                  🚫 Проект закрыт
                </p>
              </div>
            </div>
            <Link href="/" className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              На главную
            </Link>
          </div>
        </header>

        {/* Main */}
        <main className="max-w-3xl mx-auto px-4 py-16">
          
          {/* Hero: Сообщение о закрытии */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-rose-600 rounded-3xl mb-6 shadow-lg shadow-red-500/25">
              <ArchiveIcon />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Проект закрыт
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Спасибо, что были с нами. Этот проект больше не развивается, не обновляется и не поддерживается.
            </p>
          </div>

          {/* Карточка с деталями */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Что это значит?
            </h3>
            
            <div className="space-y-4">
              <StatusItem 
                icon="❌" 
                title="Нет обновлений" 
                desc="Контент больше не обновляется. Новые боты не добавляются." 
              />
              <StatusItem 
                icon="❌" 
                title="Нет поддержки" 
                desc="Техническая поддержка и обратная связь больше не работают." 
              />
              <StatusItem 
                icon="❌" 
                title="Нет гарантий" 
                desc="Сайт может работать с ошибками. Некоторые функции могут не работать." 
              />
              <StatusItem 
                icon="⚠️" 
                title="Архивный режим" 
                desc="Сайт остаётся доступным для просмотра, но без функционала." 
              />
            </div>
          </div>

          {/* Почему закрыли */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💭</span>
              <div>
                <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                  Почему проект закрыт?
                </h4>
                <p className="text-amber-800 dark:text-amber-200 text-sm leading-relaxed">
                  К сожалению, не хватило ресурсов и времени довести проект до конца. 
                  Осталось много недоработок, багов и незавершённых функций, которые я не смогу исправить. 
                  Лучше закрыть проект сейчас, чем поддерживать его в нерабочем состоянии.
                </p>
              </div>
            </div>
          </div>

          {/* Что можно сделать */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Что можно сделать сейчас?
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <ActionCard
                title="📁 Скачать данные"
                desc="Исходный код и база ботов доступны в репозитории."
                href="https://github.com/dimasik47k-ship-it/tegbi"
              />
              <ActionCard
                title="💬 Написать разработчику"
                desc="Если есть вопросы — можно написать в личные сообщения."
                href="https://t.me/seraviellex"
              />
              <ActionCard
                title="🔄 Форкнуть проект"
                desc="Вы можете взять код и продолжить развитие самостоятельно."
                href="https://github.com/dimasik47k-ship-it/tegbi/fork"
              />
              <ActionCard
                title="⭐ Поблагодарить"
                desc="Если проект был полезен — поставьте звезду на GitHub."
                href="https://github.com/dimasik47k-ship-it/tegbi"
              />
            </div>
          </div>

          {/* Прощальное сообщение */}
          <div className="text-center py-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
              <HeartIcon />
              <span>Спасибо за ваше время и интерес</span>
              <HeartIcon />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Проект закрыт {new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-600 mt-2">
              С любовью, <span className="font-medium">@seraviellex</span>
            </p>
          </div>

        </main>

        {/* Footer */}
        <footer className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 py-6">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2026 seraviellex PROJECTS • Проект закрыт • Архив
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

// Компонент статуса
function StatusItem({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
      <span className="text-xl">{icon}</span>
      <div>
        <p className="font-semibold text-gray-900 dark:text-white">{title}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
      </div>
    </div>
  );
}

// Компонент действия
function ActionCard({ title, desc, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-gray-900 dark:text-white">{title}</span>
        <ExternalLinkIcon />
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
    </a>
  );
}