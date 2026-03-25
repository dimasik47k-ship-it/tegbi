export default function SettingsForm({ settings, onChange }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 space-y-6">
      
      {/* Имя */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Отображаемое имя
        </label>
        <input
          type="text"
          value={settings.displayName}
          onChange={(e) => onChange(prev => ({ ...prev, displayName: e.target.value }))}
          placeholder={settings.displayName || 'Имя из Telegram'}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <p className="text-xs text-gray-500 mt-1">Будет видно вместо имени из Telegram</p>
      </div>

      {/* Приватность */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Приватность
        </label>
        <div className="space-y-3">
          <PrivacyToggle
            label="Показывать имя"
            checked={settings.privacy.showName}
            onChange={(v) => onChange(prev => ({ ...prev, privacy: { ...prev.privacy, showName: v } }))}
          />
          <PrivacyToggle
            label="Показывать username"
            checked={settings.privacy.showUsername}
            onChange={(v) => onChange(prev => ({ ...prev, privacy: { ...prev.privacy, showUsername: v } }))}
          />
          <PrivacyToggle
            label="Показывать фото"
            checked={settings.privacy.showPhoto}
            onChange={(v) => onChange(prev => ({ ...prev, privacy: { ...prev.privacy, showPhoto: v } }))}
          />
          <PrivacyToggle
            label="Показывать статистику"
            checked={settings.privacy.showStats}
            onChange={(v) => onChange(prev => ({ ...prev, privacy: { ...prev.privacy, showStats: v } }))}
          />
        </div>
      </div>

      {/* Тема */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          Тема оформления
        </label>
        <div className="flex gap-3">
          {['light', 'dark', 'auto'].map((theme) => (
            <button
              key={theme}
              onClick={() => onChange(prev => ({ ...prev, theme }))}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                settings.theme === theme
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {theme === 'light' && '☀️ Светлая'}
              {theme === 'dark' && '🌙 Тёмная'}
              {theme === 'auto' && '🔄 Авто'}
            </button>
          ))}
        </div>
      </div>

      {/* Язык */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
          Язык
        </label>
        <select
          value={settings.language}
          onChange={(e) => onChange(prev => ({ ...prev, language: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="ru">🇷🇺 Русский</option>
          <option value="en">🇬🇧 English (Auto)</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">Автоперевод через браузер (бесплатно)</p>
      </div>
    </div>
  );
}

// Компонент переключателя
function PrivacyToggle({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
      <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          checked ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
        }`}
      >
        <div
          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
            checked ? 'left-7' : 'left-1'
          }`}
        />
      </button>
    </div>
  );
}