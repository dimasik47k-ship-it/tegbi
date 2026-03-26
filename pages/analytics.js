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
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

function SearchIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function TableIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

// Modal Component
function BotModal({ bot, onClose }) {
  if (!bot) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Детали бота</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <CloseIcon />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Avatar & Name */}
          <div className="flex items-center gap-4">
            <img src={bot.avatar} alt={bot.name} className="w-20 h-20 rounded-2xl object-cover shadow-lg" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{bot.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">@{bot.username}</p>
              {bot.verified && (
                <span className="inline-flex items-center gap-1 mt-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-lg text-sm font-medium">
                  <VerifiedIcon />
                  Проверен {bot.verifiedDate && `• ${bot.verifiedDate}`}
                </span>
              )}
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <InfoCard label="Категория" value={bot.category} />
            <InfoCard label="ID" value={`#${bot.id}`} />
            <InfoCard label="Длина welcome" value={`${bot.welcomeMessage?.length || 0} симв.`} />
            <InfoCard label="Длина guide" value={`${bot.guideMarkdown?.length || 0} симв.`} />
          </div>

          {/* Welcome Message Preview */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Welcome Message</h4>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 max-h-48 overflow-y-auto">
              <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">{bot.welcomeMessage}</p>
            </div>
          </div>

          {/* Guide Preview */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Guide Markdown</h4>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 max-h-48 overflow-y-auto">
              <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line font-mono">
                {bot.guideMarkdown?.substring(0, 500)}...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
      <p className="text-lg font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  );
}

export default function AnalyticsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [lastUpdate, setLastUpdate] = useState(null);
  const [selectedBot, setSelectedBot] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [activeTab, setActiveTab] = useState('overview');

  // Анализ данных
  const analytics = useMemo(() => {
    const totalBots = botsDB.length;
    const verifiedBots = botsDB.filter(b => b.verified).length;
    const unverifiedBots = totalBots - verifiedBots;
    const verificationRate = Math.round((verifiedBots / totalBots) * 100);

    // Категории
    const categoriesMap = {};
    botsDB.forEach(bot => {
      categoriesMap[bot.category] = (categoriesMap[bot.category] || 0) + 1;
    });
    const categories = Object.entries(categoriesMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    // Динамика роста (по ID)
    const growthData = botsDB
      .sort((a, b) => a.id - b.id)
      .map((bot, idx) => ({
        label: `#${bot.id}`,
        value: idx + 1
      }));

    // Статистика верификации
    const verificationData = [
      { label: 'Проверено', value: verifiedBots },
      { label: 'Не проверено', value: unverifiedBots }
    ];

    // Средняя длина контента
    const avgWelcomeLength = Math.round(botsDB.reduce((sum, bot) => sum + (bot.welcomeMessage?.length || 0), 0) / totalBots);
    const avgGuideLength = Math.round(botsDB.reduce((sum, bot) => sum + (bot.guideMarkdown?.length || 0), 0) / totalBots);

    return {
      totalBots,
      verifiedBots,
      unverifiedBots,
      verificationRate,
      categories,
      growthData,
      verificationData,
      avgWelcomeLength,
      avgGuideLength
    };
  }, []);

  // Фильтрация и сортировка ботов
  const filteredBots = useMemo(() => {
    let result = [...botsDB];

    // Поиск
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(bot =>
        bot.name.toLowerCase().includes(q) ||
        bot.username.toLowerCase().includes(q) ||
        bot.category.toLowerCase().includes(q)
      );
    }

    // Фильтр по категории
    if (categoryFilter !== 'all') {
      result = result.filter(bot => bot.category === categoryFilter);
    }

    // Сортировка
    result.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (sortConfig.key === 'verified') {
        aVal = a.verified ? 1 : 0;
        bVal = b.verified ? 1 : 0;
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [searchQuery, categoryFilter, sortConfig]);

  // Проверка авторизации
  useEffect(() => {
    const savedAuth = localStorage.getItem('analytics_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      setLastUpdate(new Date());
    }
  }, []);

  // Автообновление
  useEffect(() => {
    if (!isAuthenticated) return;
    const interval = setInterval(() => setLastUpdate(new Date()), 30000);
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

  // Экспорт JSON
  const exportJSON = () => {
    const data = JSON.stringify(botsDB, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tegbi-bots-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Экспорт CSV
  const exportCSV = () => {
    const headers = ['ID', 'Name', 'Username', 'Category', 'Verified', 'VerifiedDate'];
    const rows = botsDB.map(bot => [
      bot.id,
      bot.name,
      bot.username,
      bot.category,
      bot.verified ? 'Yes' : 'No',
      bot.verifiedDate || ''
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tegbi-bots-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Сортировка
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Analytics Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Введите пароль для доступа к статистике</p>
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
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Analytics</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Real-time statistics</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {lastUpdate && (
                <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                  Обновлено: {lastUpdate.toLocaleTimeString('ru-RU')}
                </span>
              )}
              <button onClick={() => setLastUpdate(new Date())} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200" title="Обновить">
                <RefreshIcon />
              </button>
              <button onClick={handleLogout} className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200">
                Выйти
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="space-y-6">
            
            {/* Tabs */}
            <div className="flex flex-wrap gap-2">
              <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<DashboardIcon />}>Обзор</TabButton>
              <TabButton active={activeTab === 'bots'} onClick={() => setActiveTab('bots')} icon={<TableIcon />}>Все боты ({botsDB.length})</TabButton>
            </div>

            {activeTab === 'overview' && (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard icon={<BotIcon />} title="Всего ботов" value={analytics.totalBots} subtitle="В каталоге" color="from-blue-500 to-cyan-600" />
                  <StatCard icon={<VerifiedIcon />} title="Проверено" value={analytics.verifiedBots} subtitle={`${analytics.verificationRate}% от всех`} color="from-emerald-500 to-teal-600" />
                  <StatCard icon={<CategoryIcon />} title="Категорий" value={analytics.categories.length} subtitle="Уникальных" color="from-purple-500 to-pink-600" />
                  <StatCard icon={<UsersIcon />} title="Не проверено" value={analytics.unverifiedBots} subtitle="Требуют проверки" color="from-amber-500 to-orange-600" />
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <ChartIcon />Динамика роста каталога
                    </h2>
                    <LineChart data={analytics.growthData} height={220} color="#3B82F6" />
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <VerifiedIcon />Статус верификации
                    </h2>
                    <DonutChart data={analytics.verificationData} size={200} />
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <CategoryIcon />Все категории
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {analytics.categories.map((cat, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-700/30 rounded-xl hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                        <div className="flex items-center gap-3">
                          <span className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20">{idx + 1}</span>
                          <span className="font-medium text-gray-900 dark:text-white">{cat.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white bg-white dark:bg-gray-700 px-3 py-1 rounded-lg shadow-sm">{cat.count} {cat.count === 1 ? 'бот' : cat.count < 5 ? 'бота' : 'ботов'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <StatCard icon={<EyeIcon />} title="Средний welcome" value={`${analytics.avgWelcomeLength} симв.`} subtitle="На бота" color="from-indigo-500 to-blue-600" />
                  <StatCard icon={<EyeIcon />} title="Средний guide" value={`${analytics.avgGuideLength} симв.`} subtitle="На бота" color="from-pink-500 to-rose-600" />
                </div>
              </>
            )}

            {activeTab === 'bots' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Toolbar */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                      <SearchIcon />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Поиск ботов..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <SearchIcon />
                      </div>
                    </div>

                    {/* Filters & Export */}
                    <div className="flex flex-wrap gap-3">
                      <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="all">Все категории</option>
                        {analytics.categories.map(cat => (
                          <option key={cat.name} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                      <button onClick={exportJSON} className="flex items-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors">
                        <DownloadIcon />JSON
                      </button>
                      <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium transition-colors">
                        <DownloadIcon />CSV
                      </button>
                    </div>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                      <tr>
                        <Th sortable onClick={() => handleSort('id')} active={sortConfig.key === 'id'} direction={sortConfig.direction}>ID</Th>
                        <Th sortable onClick={() => handleSort('name')} active={sortConfig.key === 'name'} direction={sortConfig.direction}>Бот</Th>
                        <Th sortable onClick={() => handleSort('category')} active={sortConfig.key === 'category'} direction={sortConfig.direction}>Категория</Th>
                        <Th sortable onClick={() => handleSort('verified')} active={sortConfig.key === 'verified'} direction={sortConfig.direction}>Статус</Th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Действия</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredBots.map((bot) => (
                        <tr key={bot.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <td className="px-6 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">#{bot.id}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img src={bot.avatar} alt={bot.name} className="w-10 h-10 rounded-lg object-cover" />
                              <div>
                                <p className="font-semibold text-gray-900 dark:text-white">{bot.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">@{bot.username}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{bot.category}</td>
                          <td className="px-6 py-4">
                            {bot.verified ? (
                              <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-medium">
                                <VerifiedIcon />Проверен
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg text-xs font-medium">
                                Не проверен
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <button onClick={() => setSelectedBot(bot)} className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm">
                              Детали →
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Results count */}
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Показано {filteredBots.length} из {botsDB.length} ботов
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Bot Details Modal */}
        {selectedBot && <BotModal bot={selectedBot} onClose={() => setSelectedBot(null)} />}
      </div>
    </>
  );
}

// Tab Button Component
function TabButton({ active, onClick, icon, children }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
        active
          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
      }`}
    >
      {icon}
      {children}
    </button>
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
      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{value}</h3>
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{title}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
    </div>
  );
}

// Table Header Component
function Th({ children, sortable, onClick, active, direction }) {
  return (
    <th
      onClick={sortable ? onClick : undefined}
      className={`px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ${sortable ? 'cursor-pointer hover:text-gray-700 dark:hover:text-gray-200' : ''}`}
    >
      <div className="flex items-center gap-2">
        {children}
        {sortable && (
          <svg className={`w-4 h-4 transition-transform ${active ? (direction === 'asc' ? 'rotate-180' : '') : 'opacity-30'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </div>
    </th>
  );
}