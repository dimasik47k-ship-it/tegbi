import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import bots from '../../data/bots';
import Navbar from '../../components/Navbar';

export default function BotPage() {
  const router = useRouter();
  const { id } = router.query;
  const [copied, setCopied] = useState(false);

  // Находим бота по ID
  const bot = bots.find(b => b.id === parseInt(id) || b.username === id);

  // Копирование ссылки
  const handleCopyLink = () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Если бот не найден
  if (!bot) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Head>
          <title>Бот не найден | Tegbi Catalog</title>
        </Head>
        <Navbar />
        <main className="container mx-auto px-4 pt-32 pb-12">
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Бот не найден
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Возможно, бот был удалён или перемещён
            </p>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Вернуться на главную
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // Форматируем HTML из guideMarkdown (простая замена)
  const formatGuide = (text) => {
    if (!text) return null;
    return text
      .replace(/<b>/g, '<strong>')
      .replace(/<\/b>/g, '</strong>')
      .replace(/<i>/g, '<em>')
      .replace(/<\/i>/g, '</em>')
      .replace(/<code>/g, '<code class="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-sm">')
      .replace(/<hr>/g, '<hr class="border-gray-200 dark:border-gray-700 my-4">')
      .replace(/<br>/g, '<br/>');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Head>
        <title>{bot.name} | Tegbi Catalog</title>
        <meta name="description" content={bot.welcomeMessage?.substring(0, 160) || `Telegram бот ${bot.name}`} />
        <meta property="og:title" content={bot.name} />
        <meta property="og:description" content={bot.welcomeMessage?.substring(0, 160) || `Telegram бот ${bot.name}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://tegbi.vercel.app/bots/${bot.id}`} />
        {bot.avatar && <meta property="og:image" content={bot.avatar.trim()} />}
      </Head>

      <Navbar />

      <main className="container mx-auto px-4 pt-32 pb-12">
        {/* Кнопка назад */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Назад к каталогу
          </Link>
        </div>

        {/* Карточка бота */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            
            {/* Шапка с градиентом */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
              <div className="flex items-start gap-6">
                {/* Аватар */}
                {bot.avatar && (
                  <img 
                    src={bot.avatar.trim()} 
                    alt={bot.name}
                    className="w-24 h-24 rounded-2xl shadow-lg object-cover bg-white"
                  />
                )}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{bot.name}</h1>
                  <p className="text-blue-100 text-lg">@{bot.username}</p>
                </div>
              </div>
            </div>

            {/* Контент */}
            <div className="p-8">
              
              {/* Описание (welcomeMessage) */}
              {bot.welcomeMessage && (
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    О боте
                  </h2>
                  <div className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                    {bot.welcomeMessage}
                  </div>
                </div>
              )}

              {/* Кнопки действий */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href={`https://t.me/${bot.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-semibold text-lg"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.44-.42-1.38-.88.03-.24.37-.49 1.03-.75 4.04-1.76 6.74-2.92 8.09-3.48 3.85-1.6 4.64-1.89 5.17-1.89.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.13-.03.26z"/>
                  </svg>
                  Открыть в Telegram
                </a>
                
                <button
                  onClick={handleCopyLink}
                  className="flex-1 inline-flex items-center justify-center gap-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-8 py-4 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 font-semibold text-lg"
                >
                  {copied ? (
                    <>
                      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Скопировано!
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Копировать ссылку
                    </>
                  )}
                </button>
              </div>

              {/* Гайд (guideMarkdown) */}
              {bot.guideMarkdown && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Инструкция по использованию
                  </h2>
                  <div 
                    className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-400"
                    dangerouslySetInnerHTML={{ __html: formatGuide(bot.guideMarkdown) }}
                  />
                </div>
              )}

            </div>
          </div>

          {/* Другие боты */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Другие боты
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bots
                .filter(b => b.id !== bot.id)
                .slice(0, 6)
                .map(relatedBot => (
                  <Link
                    key={relatedBot.id}
                    href={`/bots/${relatedBot.id}`}
                    className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-blue-300 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      {relatedBot.avatar && (
                        <img 
                          src={relatedBot.avatar.trim()} 
                          alt={relatedBot.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                          {relatedBot.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          @{relatedBot.username}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
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
  );
}