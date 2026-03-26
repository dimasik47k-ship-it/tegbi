// pages/api/submit-bot.js
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { sendAdminNotification } from '../../lib/notifications';

const SUBMISSIONS_FILE = join(process.cwd(), 'data', 'submissions.json');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, username, category, description, contact } = req.body;

  // Валидация
  if (!name || !username || !category) {
    return res.status(400).json({ error: 'Заполните все обязательные поля' });
  }

  // Читаем текущие заявки
  let data;
  try {
    const fileData = await readFile(SUBMISSIONS_FILE, 'utf8');
    data = JSON.parse(fileData);
  } catch {
    data = { submissions: [], nextId: 1 };
  }

  // Создаём заявку
  const submission = {
    id: data.nextId,
    name: name.trim(),
    username: username.trim().replace('@', ''),
    category: category.trim(),
    description: description?.trim() || '',
    contact: contact?.trim() || '',
    status: 'pending', // pending, approved, rejected
    createdAt: new Date().toISOString(),
    reviewedAt: null,
    reviewedBy: null,
    botUrl: null,
    botUsername: null,
  };

  // Сохраняем
  data.submissions.push(submission);
  data.nextId += 1;
  await writeFile(SUBMISSIONS_FILE, JSON.stringify(data, null, 2));

  // 🔔 Уведомляем админа в Telegram
  try {
    await sendAdminNotification(submission);
  } catch (err) {
    console.error('Failed to send admin notification:', err);
    // Не блокируем ответ пользователю
  }

  // Ответ пользователю
  return res.status(201).json({
    success: true,
    message: 'Заявка отправлена! Ожидайте проверки.',
    submissionId: submission.id,
  });
}