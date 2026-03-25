// pages/api-doc.js
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// ========================================
// SVG ICONS (без эмодзи!)
// ========================================
function ApiIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
}

function JsonIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

export default function ApiDocPage() {
  const [copiedEndpoint, setCopiedEndpoint] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(id);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const endpoints = [
    {
      method: 'GET',
      path: '/api/bots',
      title: 'Список всех ботов',
      description: 'Пагинированный список ботов с фильтрацией и поиском',
      params: [
        { name: 'q', type: 'string', required: false, desc: 'Поиск по названию или username' },
        { name: 'category', type: 'string', required: false, desc: 'Фильтр по категории' },
        { name: 'page', type: 'integer', required: false, desc: 'Номер страницы (по умолчанию: 1)' },
        { name: 'limit', type: 'integer', required: false, desc: 'Ботов на странице (макс: 100)' },
      ],
      example: 'https://tegbi.vercel.app/api/bots?category=Распознавание речи&limit=5',
      response: {
        success: true,
        data: {
          bots: [{
            id: 5,
            name: 'SaluteSpeech Bot',
            username: 'smartspeech_sber_bot',
            category: 'Распознавание речи',
            verified: true
          }],
          pagination: {
            current_page: 1,
            per_page: 5,
            total: 10,
            total_pages: 2
          }
        }
      }
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
      response: {
        success: true,
        data: {
          id: 5,
          name: 'SaluteSpeech Bot',
          username: 'smartspeech_sber_bot',
          category: 'Распознавание речи',
          avatar: 'https://...',
          verified: true,
          verifiedDate: '2022-03-31',
          welcomeMessage: '...',
          guideMarkdown: '...'
        }
      }
    },
    {
      method: 'GET',
      path: '/api/stats',
      title: 'Статистика каталога',
      description: 'Общая статистика: количество ботов, категории, верифицированные',
      params: [],
      example: 'https://tegbi.vercel.app/api/stats',
      response: {
        success: true,
        data: {
          total_bots: 10,
          verified_bots: 3,
          categories_count: 8,
          by_category: {
            'Распознавание речи': 1,
            'Почта': 1
          }
        }
      }
    },
    {
      method: 'GET',
      path: '/api/categories',
      title: 'Список категорий',
      description: 'Все уникальные категории с количеством ботов',
      params: [],
      example: 'https://tegbi.vercel.app/api/categories',
      response: {
        success: true,
        data: {
          categories: [
            { name: 'Распознавание речи', count: 1 },
            { name: 'Почта', count: 1 }
          ],
          total: 8
        }
      }
    },
  ];

  const codeExamples = {
    javascript: `// JavaScript (Fetch API)
const response = await fetch('https://tegbi.vercel.app/api/bots?limit=5');
const data = await response.json();

if (data.success) {
  console.log('Боты:', data.data.bots);
  console.log('Всего:', data.data.pagination.total);
}`,
    python: `# Python (requests)
import requests

response = requests.get(
    'https://tegbi.vercel.app/api/bots',
    params={'category': 'Распознавание речи', 'limit': 5}
)

if response.status_code == 200:
    data = response.json()
    for bot in data['data']['bots']:
        print(f"🤖 {bot['name']} (@{bot['username']})")`,
    curl: `# cURL
curl "https://tegbi.vercel.app/api/bots?category=Распознавание речи&limit=5"

# Получить детали бота
curl "https://tegbi.vercel.app/api/bots/5"`
  };

  return (
    <>
      <Head>
        <title>API Документация | Tegbi Catalog</title>
        <meta name="description" content="Public API для доступа к каталогу ботов Tegbi" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
        
        {/* Animated Background Gradient */}
        <div className="fixed inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>

        {/* Header */}
        <header className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 transition-transform hover:scale-105">
                <ApiIcon />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  API Documentation
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Public Read API v1.0.0</p>
              </div>
            </div>
            <Link 
              href="/" 
              className="px-5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 hover:scale-105"
            >
              ← На главную
            </Link>
          </div>
        </header>

        <main className="relative max-w-7xl mx-auto px-6 py-12">
          
          {/* Hero Section */}
          <div className="text-center mb-20 animate-on-scroll" id="hero">
            <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-8 shadow-2xl shadow-blue-500/25 transition-all duration-700 ${isVisible['hero'] ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <div className="text-white">
                <ApiIcon />
              </div>
            </div>
            <h2 className={`text-5xl font-bold text-slate-900 dark:text-white mb-6 transition-all duration-700 delay-100 ${isVisible['hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Tegbi Public API
            </h2>
            <p className={`text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${isVisible['hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Получай данные о ботах программно. Без авторизации. Бесплатно. 
              <span className="block mt-2 text-slate-500 dark:text-slate-500">RESTful API с JSON ответами</span>
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: <LockIcon />, title: 'Без авторизации', desc: 'Все эндпоинты для чтения доступны публично', color: 'from-emerald-500 to-teal-600' },
              { icon: <JsonIcon />, title: 'JSON ответы', desc: 'Все данные в формате JSON для удобного парсинга', color: 'from-blue-500 to-cyan-600' },
              { icon: <BoltIcon />, title: 'Rate limit: 100/мин', desc: 'Щедрые лимиты для личных и коммерческих проектов', color: 'from-purple-500 to-pink-600' },
            ].map((feature, idx) => (
              <div 
                key={idx} 
                className={`group relative bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:border-transparent transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 animate-on-scroll ${isVisible[`feature-${idx}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                id={`feature-${idx}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-5 text-white shadow-lg transition-transform group-hover:scale-110 duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-3 text-lg">{feature.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center animate-on-scroll" id="nav-tabs">
            {[
              { id: 'overview', label: 'Обзор', icon: <GlobeIcon /> },
              { id: 'endpoints', label: 'Эндпоинты', icon: <DatabaseIcon /> },
              { id: 'examples', label: 'Примеры', icon: <BoltIcon /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 scale-105'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Endpoints Section */}
          <div className="space-y-8 mb-16">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-10 text-center animate-on-scroll" id="endpoints-title">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">📡 Эндпоинты</span>
            </h3>
            
            {endpoints.map((ep, idx) => (
              <div 
                key={idx} 
                className={`bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 animate-on-scroll ${isVisible[`endpoint-${idx}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                id={`endpoint-${idx}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {/* Endpoint Header */}
                <div className="p-8 border-b border-slate-100 dark:border-slate-700 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-800/50">
                  <div className="flex items-center gap-4 mb-4 flex-wrap">
                    <span className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide ${
                      ep.method === 'GET' 
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      {ep.method}
                    </span>
                    <code 
                      onClick={() => copyToClipboard(ep.path, `path-${idx}`)}
                      className="text-base font-mono text-slate-900 dark:text-white bg-white dark:bg-slate-700 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors flex items-center gap-2"
                    >
                      {ep.path}
                      {copiedEndpoint === `path-${idx}` ? (
                        <span className="text-emerald-500"><CheckIcon /></span>
                      ) : (
                        <span className="text-slate-400"><CopyIcon /></span>
                      )}
                    </code>
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{ep.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{ep.description}</p>
                </div>

                {/* Parameters */}
                {ep.params.length > 0 && (
                  <div className="px-8 py-6 bg-slate-50/50 dark:bg-slate-700/30">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                      <DatabaseIcon />
                      Параметры запроса:
                    </p>
                    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-100 dark:bg-slate-700/50">
                          <tr className="text-left text-slate-600 dark:text-slate-400">
                            <th className="px-4 py-3 font-semibold">Параметр</th>
                            <th className="px-4 py-3 font-semibold">Тип</th>
                            <th className="px-4 py-3 font-semibold">Обяз.</th>
                            <th className="px-4 py-3 font-semibold">Описание</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-800">
                          {ep.params.map((param, i) => (
                            <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                              <td className="px-4 py-3 font-mono text-blue-600 dark:text-blue-400 font-medium">{param.name}</td>
                              <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{param.type}</td>
                              <td className="px-4 py-3">
                                {param.required ? (
                                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                                    Обязательно
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400">
                                    Опционально
                                  </span>
                                )}
                              </td>
                              <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{param.desc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Example URL */}
                <div className="px-8 py-6 bg-slate-50/50 dark:bg-slate-700/30 border-t border-slate-100 dark:border-slate-700">
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Пример запроса:</p>
                  <div 
                    onClick={() => copyToClipboard(ep.example, `example-${idx}`)}
                    className="group relative bg-slate-900 rounded-xl p-4 cursor-pointer hover:ring-2 hover:ring-blue-500/50 transition-all duration-300"
                  >
                    <code className="block text-sm font-mono text-emerald-400 overflow-x-auto">
                      {ep.example}
                    </code>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs font-medium">
                        {copiedEndpoint === `example-${idx}` ? (
                          <><CheckIcon /> Скопировано</>
                        ) : (
                          <><CopyIcon /> Копировать</>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Response Example */}
                <div className="px-8 py-6 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-800 border-t border-slate-100 dark:border-slate-700">
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Пример ответа:</p>
                  <div className="bg-slate-900 rounded-xl p-5 overflow-x-auto">
                    <pre className="text-sm font-mono text-blue-300 leading-relaxed">
                      {JSON.stringify(ep.response, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Code Examples */}
          <div className="mb-16 animate-on-scroll" id="examples">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-10 text-center">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">💻 Примеры кода</span>
            </h3>
            
            <div className="space-y-6">
              {Object.entries(codeExamples).map(([lang, code]) => (
                <div key={lang} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-white dark:from-slate-700/50 dark:to-slate-700/30 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <span className="font-mono text-sm font-semibold text-slate-700 dark:text-slate-300 capitalize">
                      {lang === 'javascript' ? 'JavaScript' : lang}
                    </span>
                    <button 
                      onClick={() => copyToClipboard(code, `code-${lang}`)}
                      className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors text-sm font-medium"
                    >
                      {copiedEndpoint === `code-${lang}` ? (
                        <><CheckIcon /> Скопировано</>
                      ) : (
                        <><CopyIcon /> Копировать</>
                      )}
                    </button>
                  </div>
                  <div className="p-6 bg-slate-900 overflow-x-auto">
                    <pre className="text-sm font-mono text-slate-300 leading-relaxed">
                      <code>{code}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center py-12 border-t border-slate-200 dark:border-slate-700 animate-on-scroll" id="footer">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-xl text-sm font-medium mb-6">
              <ShieldIcon />
              API в статусе 🟡 Бета — возможны изменения
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-3">
              Нашли ошибку или есть предложения?
            </p>
            <a 
              href="https://t.me/seraviellex" 
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlobeIcon />
              Связаться с разработчиком
            </a>
          </div>

        </main>
      </div>

      {/* Custom Styles for Animations */}
      <style jsx global>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
}