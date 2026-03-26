// pages/admin/submissions.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// 🔐 Пароль для админки
const ADMIN_PASSWORD = 'TgB!2026#Admin$Secure99xK';

export default function AdminSubmissionsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // Проверка авторизации
  useEffect(() => {
    const saved = localStorage.getItem('admin_auth');
    if (saved === 'true') {
      setIsAuthenticated(true);
      fetchSubmissions();
    } else {
      setLoading(false);
    }
  }, []);

  // Загрузка заявок
  const fetchSubmissions = async () => {
    try {
      const res = await fetch('/api/submissions');
      const data = await res.json();
      if (data.success) setSubmissions(data.data);
    } catch (err) {
      console.error('Error fetching submissions:', err);
    } finally {
      setLoading(false);
    }
  };

  // Вход
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
      setError('');
      fetchSubmissions();
    } else {
      setError('Неверный пароль');
    }
  };

  // Выход
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
  };

  // Обновление статуса
  const updateStatus = async (id, action) => {
    if (action === 'approve') {
      // Шаг 1: запрос ссылки
      const botUrl = prompt('🔗 Отправьте ссылку для бота (например: https://tegbi.vercel.app/bots/45)');
      if (!botUrl) return;

      // Шаг 2: запрос username
      const botUsername = prompt('📝 @username бота (без @)');
      if (!botUsername) return;

      // Шаг 3: подтверждение
      if (!confirm(`✅ Отправить письмо с подтверждением?\n\nБот: @${botUsername}\nURL: ${botUrl}`)) return;

      // Отправляем на сервер
      const res = await fetch(`/api/submissions/${id}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve', botUrl, botUsername }),
      });

      const result = await res.json();
      if (result.success) {
        alert('✅ Бот принят! Письмо отправлено.');
        fetchSubmissions();
      } else {
        alert('❌ Ошибка: ' + result.error);
      }
    } else if (action === 'reject') {
      const reason = prompt('❌ Причина отклонения (необязательно):');
      const res = await fetch(`/api/submissions/${id}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reject', comment: reason }),
      });
      const result = await res.json();
      if (result.success) {
        alert('❌ Заявка отклонена.');
        fetchSubmissions();
      }
    }
  };

  // Экран входа
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <form onSubmit={handleLogin} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Admin Access</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
            autoFocus
          />
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold">
            Войти
          </button>
        </form>
      </div>
    );
  }

  // Фильтрация
  const filtered = submissions.filter(s => filter === 'all' || s.status === filter);

  return (
    <>
      <Head>
        <title>Заявки | Tegbi Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        
        {/* Header */}
        <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/analytics" className="text-blue-600 dark:text-blue-400 hover:underline">← Назад</Link>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Заявки на ботов</h1>
            </div>
            <button onClick={handleLogout} className="text-red-600 hover:text-red-700 font-medium">Выйти</button>
          </div>
        </header>

        {/* Main */}
        <main className="max-w-6xl mx-auto px-6 py-8">
          
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            {['all', 'pending', 'approved', 'rejected'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {status === 'all' ? 'Все' : status === 'pending' ? 'Ожидание' : status === 'approved' ? 'Принято' : 'Отклонено'}
              </button>
            ))}
            <button onClick={fetchSubmissions} className="ml-auto px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              🔄 Обновить
            </button>
          </div>

          {/* Table */}
          {loading ? (
            <div className="text-center py-12">Загрузка...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-500">Нет заявок</div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Бот</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Категория</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Статус</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Дата</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Действия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filtered.map(sub => (
                    <tr key={sub.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">#{sub.id}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{sub.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">@{sub.username}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{sub.category}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                          sub.status === 'approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                          sub.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                          'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                        }`}>
                          {sub.status === 'approved' ? '✅ Принят' : sub.status === 'rejected' ? '❌ Отклонён' : '⏳ Ожидание'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {new Date(sub.createdAt).toLocaleDateString('ru-RU')}
                      </td>
                      <td className="px-6 py-4">
                        {sub.status === 'pending' && (
                          <div className="flex gap-2">
                            <button onClick={() => updateStatus(sub.id, 'approve')} className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors">
                              ✅ Принять
                            </button>
                            <button onClick={() => updateStatus(sub.id, 'reject')} className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors">
                              ❌ Отклонить
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </>
  );
}