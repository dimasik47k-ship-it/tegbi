// pages/api-doc.js
// Страница с документацией: tegbi.vercel.app/api-doc

import Head from 'next/head';
import Link from 'next/link';

export default function ApiDocPage() {
  const endpoints = [
    {
      method: 'GET',
      path: '/api/bots',
      title: 'Список всех ботов',
      description: 'Возвращает пагинированный список ботов с поддержкой фильтрации',
      params: [
        { name: 'q', type: 'string', required: false, desc: 'Поиск по названию или @username' },
        { name: 'category', type: 'string', required: false, desc: 'Фильтр по категории' },
        { name: 'page', type: 'integer', required: false, desc: 'Номер страницы (по умолчанию: 1)' },
        { name: 'limit', type: 'integer', required: false, desc: 'Ботов на странице (макс: 100)' },
      ],
      example: 'https://tegbi.vercel.app/api/bots?category=Распознавание речи&limit=5',
    },
    {
      method: 'GET',
      path: '/api/bots/[id]',
      title: 'Детали бота',
      description: 'Полная информация о боте по его ID',
      params: [
        { name: 'id', type: 'integer', required: true, desc: 'Уникальный ID бота' },
      ],
      example: 'https://tegbi.vercel.app/api/bots/5',
    },
    {
      method: 'GET',
      path: '/api/stats',
      title: 'Статистика каталога',
      description: 'Общая статистика: количество ботов, категории, верифицированные',
      params: [],
      example: 'https://tegbi.vercel.app/api/stats',
    },
    {
      method: 'GET',
      path: '/api/categories',
      title: 'Список категорий',
      description: 'Все уникальные категории с количеством ботов в каждой',
      params: [],
      example: 'https://tegbi.vercel.app/api/categories',
    },
  ];

  const botFields = [
    { name: 'id', type: 'integer', desc: 'Уникальный идентификатор' },
    { name: 'name', type: 'string', desc: 'Название бота' },
    { name: 'username', type: 'string', desc: '@username без @' },
    { name: 'category', type: 'string', desc: 'Категория бота' },
    { name: 'avatar', type: 'string', desc: 'URL аватарки' },
    { name: 'verified', type: 'boolean', desc: 'Проверен ли бот' },
    { name: 'verifiedDate', type: 'string|null', desc: 'Дата верификации (формат: YYYY-MM-DD)' },
    { name: 'welcomeMessage', type: 'string', desc: 'Приветственное сообщение (только в /api/bots/[id])' },
    { name: 'guideMarkdown', type: 'string', desc: 'Гайд в Markdown (только в /api/bots/[id])' },
  ];

  return (
    <>
      <Head>
        <title>API Документация | Tegbi Catalog</title>
        <meta name="description" content="Public API для доступа к каталогу ботов Tegbi" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        
        {/* Header */}
        <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">API Документация</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Public Read API v1.0.0</p>
              </div>
            </div>
            <Link href="/" className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              ← На главную
            </Link>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-12">
          
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Tegbi Public API
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Получай данные о ботах программно. Без авторизации. Бесплатно.
            </p>
          </div>

          {/* Info cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Без авторизации</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Все эндпоинты для чтения доступны публично. Просто делай GET-запрос.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">JSON ответы</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Все данные в формате JSON. Удобно для парсинга в любом языке.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Rate limit: 100/мин</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Щедрые лимиты для личных и коммерческих проектов.</p>
            </div>
          </div>

          {/* Endpoints */}
          <section className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📡 Эндпоинты</h3>
            <div className="space-y-6">
              {endpoints.map((ep, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                  <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        ep.method === 'GET' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {ep.method}
                      </span>
                      <code className="text-sm font-mono text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {ep.path}
                      </code>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{ep.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{ep.description}</p>
                  </div>

                  {ep.params.length > 0 && (
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Параметры запроса:</p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-left text-gray-500 dark:text-gray-400">
                              <th className="pb-2 pr-4">Параметр</th>
                              <th className="pb-2 pr-4">Тип</th>
                              <th className="pb-2 pr-4">Обяз.</th>
                              <th className="pb-2">Описание</th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-700 dark:text-gray-300">
                            {ep.params.map((param, i) => (
                              <tr key={i} className="border-t border-gray-100 dark:border-gray-700">
                                <td className="py-2 pr-4 font-mono">{param.name}</td>
                                <td className="py-2 pr-4">{param.type}</td>
                                <td className="py-2 pr-4">{param.required ? '✅' : '❌'}</td>
                                <td className="py-2">{param.desc}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Пример запроса:</p>
                    <code className="block w-full overflow-x-auto text-xs font-mono bg-gray-900 text-green-400 p-3 rounded-lg">
                      {ep.example}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Bot fields */}
          <section className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🤖 Поля бота</h3>
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr className="text-left text-gray-700 dark:text-gray-300">
                    <th className="px-6 py-3">Поле</th>
                    <th className="px-6 py-3">Тип</th>
                    <th className="px-6 py-3">Описание</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {botFields.map((field, idx) => (
                    <tr key={idx}>
                      <td className="px-6 py-3 font-mono text-blue-600 dark:text-blue-400">{field.name}</td>
                      <td className="px-6 py-3 text-gray-500 dark:text-gray-400">{field.type}</td>
                      <td className="px-6 py-3 text-gray-700 dark:text-gray-300">{field.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              💡 Поля <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">welcomeMessage</code> и <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">guideMarkdown</code> доступны только в эндпоинте <code className="font-mono">/api/bots/[id]</code>
            </p>
          </section>

          {/* Examples */}
          <section className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">💻 Примеры кода</h3>
            
            <div className="space-y-6">
              {/* JavaScript */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                  <span className="font-mono text-sm text-gray-700 dark:text-gray-300">JavaScript (Fetch)</span>
                  <button 
                    onClick={() => navigator.clipboard.writeText(`fetch('https://tegbi.vercel.app/api/bots?category=Распознавание речи')
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      console.log('Боты:', data.data.bots);
    }
  });`)}
                    className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400"
                  >
                    📋 Копировать
                  </button>
                </div>
                <pre className="p-6 overflow-x-auto text-sm">
                  <code className="text-gray-800 dark:text-gray-200">
{`fetch('https://tegbi.vercel.app/api/bots?category=Распознавание речи')
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      console.log('Боты:', data.data.bots);
    }
  });`}
                  </code>
                </pre>
              </div>

              {/* Python */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                  <span className="font-mono text-sm text-gray-700 dark:text-gray-300">Python (requests)</span>
                  <button 
                    onClick={() => navigator.clipboard.writeText(`import requests

response = requests.get(
    'https://tegbi.vercel.app/api/bots',
    params={'category': 'Распознавание речи', 'limit': 5}
)

if response.status_code == 200:
    data = response.json()
    if data['success']:
        for bot in data['data']['bots']:
            print(f"🤖 {bot['name']} (@{bot['username']})")`)}
                    className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400"
                  >
                    📋 Копировать
                  </button>
                </div>
                <pre className="p-6 overflow-x-auto text-sm">
                  <code className="text-gray-800 dark:text-gray-200">
{`import requests

response = requests.get(
    'https://tegbi.vercel.app/api/bots',
    params={'category': 'Распознавание речи', 'limit': 5}
)

if response.status_code == 200:
    data = response.json()
    if data['success']:
        for bot in data['data']['bots']:
            print(f"🤖 {bot['name']} (@{bot['username']})")`}
                  </code>
                </pre>
              </div>

              {/* cURL */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                  <span className="font-mono text-sm text-gray-700 dark:text-gray-300">cURL</span>
                  <button 
                    onClick={() => navigator.clipboard.writeText(`# Получить 5 ботов из категории "Распознавание речи"
curl "https://tegbi.vercel.app/api/bots?category=Распознавание речи&limit=5"

# Получить детали бота с ID=5
curl "https://tegbi.vercel.app/api/bots/5"`)}
                    className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400"
                  >
                    📋 Копировать
                  </button>
                </div>
                <pre className="p-6 overflow-x-auto text-sm">
                  <code className="text-gray-800 dark:text-gray-200">
{`# Получить 5 ботов из категории "Распознавание речи"
curl "https://tegbi.vercel.app/api/bots?category=Распознавание речи&limit=5"

# Получить детали бота с ID=5
curl "https://tegbi.vercel.app/api/bots/5"`}
                  </code>
                </pre>
              </div>
            </div>
          </section>

          {/* Footer note */}
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>API в статусе <span className="text-amber-600 dark:text-amber-400 font-medium">🟡 Бета</span> — возможны изменения.</p>
            <p className="mt-2">
              Нашли ошибку?{' '}
              <a href="https://t.me/seraviellex" className="text-blue-600 hover:underline dark:text-blue-400" target="_blank" rel="noopener">
                Сообщите разработчику
              </a>
            </p>
          </div>

        </main>
      </div>
    </>
  );
}