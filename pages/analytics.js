// pages/analytics.js
import { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import { LineChart, BarChart, DonutChart } from '../components/AnalyticsChart';
import botsDB from '../data/bots';

// 🔐 ПАРОЛЬ ДЛЯ ДОСТУПА
const ADMIN_PASSWORD = 'TgB!2026#Analytics$Secure99xK';

// SVG Icons
function DashboardIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function VerifiedIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
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

function RefreshIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
}

function BotIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function CategoryIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  );
}

export default function AnalyticsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [lastUpdate, setLastUpdate] = useState(null);

  // Анализ данных из botsDB
  const analytics = useMemo(() => {
    const totalBots = botsDB.length;
    const verifiedBots = botsDB.filter(b => b.verified).length;
    const unverifiedBots = totalBots - verifiedBots;
    
    // Категории
    const categoriesMap = {};
    botsDB.forEach(bot => {
      categoriesMap[bot.category] = (categoriesMap[bot.category] || 0) + 1;
    });
    
    const categories = Object.entries(categoriesMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    // Последние добавленные (по ID)
    const recentBots = [...botsDB]
      .sort((a, b) => b.id - a.id)
      .slice(0, 5);

    // Статистика по верификации
    const verificationData = [
      { label: 'Проверено', value: verifiedBots },
      { label: 'Не проверено', value: unverifiedBots }
    ];

    return {
      totalBots,
      verifiedBots,
      unverifiedBots,
      categories,
      recentBots,
      verificationData
    };
  }, []);

  // Проверка авторизации
  useEffect(() => {
    const savedAuth = localStorage.getItem('analytics_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      setLastUpdate(new Date());
    }
  }, []);

  // Автообновление времени
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  // Вход
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('analytics_auth', 'true');
      setError('');
      setLastUpdate(new Date());
    } else {
      setError('Неверный пароль');
    }
  };

  // Выход
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('analytics_auth');
    setPassword('');
  };

  // Экран входа
  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Analytics | Tegbi</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 w-full max-w-md border border-gray-200 dark:border-gray-700 backdrop-blur-xl bg-opacity-90">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
                <LockIcon />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Analytics Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Введите пароль для доступа к статистике
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  autoFocus
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Войти
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  // Дашборд
  return (
    <>
      <Head>
        <title>Analytics | Tegbi Catalog</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        
        {/* Header */}
        <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <DashboardIcon />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Analytics
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Real-time statistics
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {lastUpdate && (
                <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                  Обновлено: {lastUpdate.toLocaleTimeString('ru-RU')}
                </span>
              )}
              <button
                onClick={() => setLastUpdate(new Date())}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                title="Обновить"
              >
                <RefreshIcon />
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
              >
                Выйти
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="space-y-6">
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={<BotIcon />}
                title="Всего ботов"
                value={analytics.totalBots}
                subtitle="В каталоге"
                color="from-blue-500 to-cyan-600"
              />
              <StatCard
                icon={<VerifiedIcon />}
                title="Проверено"
                value={analytics.verifiedBots}
                subtitle={`${Math.round((analytics.verifiedBots / analytics.totalBots) * 100)}% от всех`}
                color="from-emerald-500 to-teal-600"
              />
              <StatCard
                icon={<CategoryIcon />}
                title="Категорий"
                value={analytics.categories.length}
                subtitle="Уникальных"
                color="from-purple-500 to-pink-600"
              />
              <StatCard
                icon={<UsersIcon />}
                title="Не проверено"
                value={analytics.unverifiedBots}
                subtitle="Требуют проверки"
                color="from-amber-500 to-orange-600"
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Categories Distribution */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <CategoryIcon />
                  Распределение по категориям
                </h2>
                <DonutChart 
                  data={analytics.categories.map(cat => ({
                    label: cat.name,
                    value: cat.count
                  }))}
                  size={200}
                />
              </div>

              {/* Verification Status */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <VerifiedIcon />
                  Статус верификации
                </h2>
                <BarChart 
                  data={analytics.verificationData}
                  height={200}
                  color="#10B981"
                />
              </div>
            </div>

            {/* Categories List */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <ChartIcon />
                Все категории
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {analytics.categories.map((cat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-700/30 rounded-xl hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20">
                        {idx + 1}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {cat.name}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white bg-white dark:bg-gray-700 px-3 py-1 rounded-lg shadow-sm">
                      {cat.count} {cat.count === 1 ? 'бот' : cat.count < 5 ? 'бота' : 'ботов'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Bots */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <BotIcon />
                Последние добавленные
              </h2>
              <div className="space-y-3">
                {analytics.recentBots.map((bot) => (
                  <div
                    key={bot.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                  >
                    <img
                      src={bot.avatar}
                      alt={bot.name}
                      className="w-12 h-12 rounded-xl object-cover shadow-md"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/48';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                        {bot.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        @{bot.username} • {bot.category}
                      </p>
                    </div>
                    {bot.verified && (
                      <span className="flex items-center gap-1 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-medium">
                        <VerifiedIcon />
                        Проверен
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  );
}

// Stat Card Component
function StatCard({ icon, title, value, subtitle, color }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:scale-[1.02] group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
      </div>
      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
        {value}
      </h3>
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {title}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {subtitle}
      </p>
    </div>
  );
}