import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function BotCreatePage() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    description: '',
    category: '',
    avatar: '',
    contact: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const categories = [
    'Модерация',
    'Утилиты',
    'Развлечения',
    'Образование',
    'Работа',
    'Финансы',
    'Новости',
    'Другое'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    // Валидация
    if (!formData.name.trim()) {
      setErrorMessage('Укажите название бота');
      setStatus('error');
      return;
    }
    if (!formData.username.trim()) {
      setErrorMessage('Укажите username бота');
      setStatus('error');
      return;
    }
    if (!formData.description.trim()) {
      setErrorMessage('Укажите описание бота');
      setStatus('error');
      return;
    }

    // Формируем сообщение для Telegram
    const message = `
🤖 Новый бот для каталога!

📛 Название: ${formData.name}
🔗 Username: @${formData.username.replace('@', '')}
📝 Описание: ${formData.description}
🏷 Категория: ${formData.category || 'Не указана'}
🖼 Аватар: ${formData.avatar || 'Не указан'}
👤 Контакт: ${formData.contact || 'Не указан'}

Отправлено с: tegbi.vercel.app/botcreate
    `.trim();

    // Отправка в Telegram (через форму)
    try {
      // Вариант 1: Отправка через Telegram Bot API (нужен токен)
      // const botToken = 'YOUR_BOT_TOKEN';
      // const chatId = 'YOUR_CHAT_ID';
      // await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ chat_id: chatId, text: message })
      // });

      // Вариант 2: Копирование в буфер + открытие Telegram
      await navigator.clipboard.writeText(message);
      
      setStatus('success');
      setFormData({
        name: '',
        username: '',
        description: '',
        category: '',
        avatar: '',
        contact: ''
      });

      // Опционально: открыть Telegram для отправки
      // window.open('https://t.me/seraviellex', '_blank');
      
    } catch (error) {
      setStatus('error');
      setErrorMessage('Ошибка отправки. Попробуйте позже или напишите напрямую @seraviellex');
    }
  };

  return (
    <>
      <Head>
        <title>Предложить бота | Tegbi Catalog</title>
        <meta name="description" content="Добавьте своего бота в каталог Tegbi" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Navbar />

        <main className="container mx-auto px-4 pt-32 pb-16">
          
          {/* Заголовок */}
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Предложить бота
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Добавьте своего бота в каталог Tegbi
            </p>
          </div>

          {/* Информация */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
              <div className="flex gap-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Как это работает?
                  </h3>
                  <ol className="text-gray-700 dark:text-gray-300 space-y-2 list-decimal list-inside">
                    <li>Заполните форму ниже</li>
                    <li>Мы проверим бота в течение 1-3 дней</li>
                    <li>Если бот соответствует требованиям — добавим в каталог</li>
                    <li>Вы получите уведомление в Telegram</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Форма */}
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 md:p-12">
              
              {/* Название бота */}
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Название бота *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Например: Помощник 360"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 
                             focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 
                             transition-all duration-200 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              {/* Username */}
              <div className="mb-6">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Username бота *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">@</span>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username.replace('@', '')}
                    onChange={handleChange}
                    placeholder="pomoshnik360_bot"
                    className="w-full px-4 py-3 pl-8 rounded-xl border-2 border-gray-200 dark:border-gray-600 
                               focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 
                               transition-all duration-200 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
              </div>

              {/* Описание */}
              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Описание бота *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Краткое описание возможностей бота..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 
                             focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 
                             transition-all duration-200 dark:bg-gray-700 dark:text-white resize-none"
                  required
                />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Максимум 500 символов
                </p>
              </div>

              {/* Категория */}
              <div className="mb-6">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Категория
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 
                             focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 
                             transition-all duration-200 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Выберите категорию</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Аватар (ссылка) */}
              <div className="mb-6">
                <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ссылка на аватар
                </label>
                <input
                  type="url"
                  id="avatar"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 
                             focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 
                             transition-all duration-200 dark:bg-gray-700 dark:text-white"
                />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Прямая ссылка на изображение (PNG, JPG)
                </p>
              </div>

              {/* Контакт для связи */}
              <div className="mb-8">
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ваш контакт для связи
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="@yourusername или email"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 
                             focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 
                             transition-all duration-200 dark:bg-gray-700 dark:text-white"
                />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Чтобы мы могли связаться с вами по поводу бота
                </p>
              </div>

              {/* Кнопка отправки */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className={`w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                  status === 'loading'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : status === 'success'
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:scale-105'
                } text-white`}
              >
                {status === 'loading' ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Отправка...
                  </>
                ) : status === 'success' ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Отправлено!
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Отправить на проверку
                  </>
                )}
              </button>

              {/* Сообщение об ошибке */}
              {status === 'error' && errorMessage && (
                <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <div className="flex gap-3">
                    <svg className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-700 dark:text-red-300 text-sm">{errorMessage}</p>
                  </div>
                </div>
              )}

              {/* Сообщение об успехе */}
              {status === 'success' && (
                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                  <div className="flex gap-3">
                    <svg className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p className="text-green-700 dark:text-green-300 font-medium mb-1">
                        Заявка отправлена!
                      </p>
                      <p className="text-green-600 dark:text-green-400 text-sm">
                        Данные скопированы в буфер обмена. Отправьте их нам в Telegram:{' '}
                        <a href="https://t.me/seraviellex" className="underline font-medium">@seraviellex</a>
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </form>

          {/* Требования */}
          <div className="max-w-3xl mx-auto mt-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Требования к ботам
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Бот должен быть публичным и стабильно работать
                  </p>
                </div>
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Иметь понятное описание и функционал
                  </p>
                </div>
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Не нарушать правила Telegram
                  </p>
                </div>
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Не содержать спам или вредоносный контент
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Контакты поддержки */}
          <div className="max-w-3xl mx-auto mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Есть вопросы? Напишите нам:
            </p>
            <a
              href="https://t.me/seraviellex"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.44-.42-1.38-.88.03-.24.37-.49 1.03-.75 4.04-1.76 6.74-2.92 8.09-3.48 3.85-1.6 4.64-1.89 5.17-1.89.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.13-.03.26z"/>
              </svg>
              @seraviellex
            </a>
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