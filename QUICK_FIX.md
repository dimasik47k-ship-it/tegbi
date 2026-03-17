# Быстрое исправление ошибок

## Проблема:
Ошибка компиляции: Module not found: Can't resolve '../components/BotModalNew'

## Решение:

### Вариант 1: Переименование файлов (рекомендуется)

1. Удалите старые файлы:
   - `components/BotModal.js`
   - `pages/index.js`

2. Переименуйте новые файлы:
   - `components/BotModalNew.js` → `components/BotModal.js`
   - `pages/indexNew.js` → `pages/index.js`

### Вариант 2: Изменение импортов

1. В файле `pages/index.js` измените строку:
   ```javascript
   import BotModal from '../components/BotModalNew';
   ```
   на:
   ```javascript
   import BotModal from '../components/BotModal';
   ```

## После исправления:

Запустите проект:
```bash
npm run dev
```

И откройте в браузере:
```
http://localhost:3000
```
