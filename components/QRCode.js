export default function ThemeSelector({ value, onChange }) {
  const themes = [
    { id: 'light', label: '☀️ Светлая', icon: '☀️' },
    { id: 'dark', label: '🌙 Тёмная', icon: '🌙' },
    { id: 'auto', label: '🔄 Авто', icon: '🔄' },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {themes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => onChange(theme.id)}
          className={`py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex flex-col items-center gap-2 ${
            value === theme.id
              ? 'bg-blue-500 text-white shadow-lg scale-105'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <span className="text-2xl">{theme.icon}</span>
          <span className="text-sm">{theme.label}</span>
        </button>
      ))}
    </div>
  );
}