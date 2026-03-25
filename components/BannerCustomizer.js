export default function BannerCustomizer({ banner, onChange }) {
  const gradients = [
    'from-blue-500 to-purple-600',
    'from-green-500 to-teal-600',
    'from-orange-500 to-red-600',
    'from-pink-500 to-rose-600',
    'from-indigo-500 to-blue-600',
    'from-yellow-500 to-orange-600',
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        🎨 Баннер профиля
      </h2>

      {/* Градиенты */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Градиент
        </label>
        <div className="grid grid-cols-3 gap-3">
          {gradients.map((gradient) => (
            <button
              key={gradient}
              onClick={() => onChange({ type: 'gradient', value: gradient })}
              className={`h-12 rounded-xl bg-gradient-to-r ${gradient} transition-transform hover:scale-105 ${
                banner.type === 'gradient' && banner.value === gradient
                  ? 'ring-4 ring-blue-500'
                  : ''
              }`}
            />
          ))}
        </div>
      </div>

      {/* Загрузка своего фото */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Или загрузить своё фото
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (event) => {
                onChange({ type: 'image', value: event.target.result });
              };
              reader.readAsDataURL(file);
            }
          }}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <p className="text-xs text-gray-500 mt-1">Фото сохраняется локально в браузере</p>
      </div>
    </div>
  );
}