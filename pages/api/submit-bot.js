import { kv } from '@vercel/kv';
import { sendAdminNotification } from '../../lib/notifications';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, username, category, description, contact } = req.body;

  if (!name || !username || !category) {
    return res.status(400).json({ error: 'Заполните все обязательные поля' });
  }

  // Получаем следующий ID
  const nextId = (await kv.get('submissions:nextId')) || 0;
  const newId = nextId + 1;
  
  await kv.set('submissions:nextId', newId);

  const submission = {
    id: newId,
    name: name.trim(),
    username: username.trim().replace('@', ''),
    category: category.trim(),
    description: description?.trim() || '',
    contact: contact?.trim() || '',
    status: 'pending',
    createdAt: new Date().toISOString(),
    reviewedAt: null,
    reviewedBy: null,
    botUrl: null,
    botUsername: null,
  };

  // Сохраняем
  await kv.set(`submissions:${newId}`, submission);
  await kv.lpush('submissions:list', newId);

  // 🔔 Уведомляем админа
  try {
    await sendAdminNotification(submission);
  } catch (err) {
    console.error('Failed to send notification:', err);
  }

  return res.status(201).json({
    success: true,
    message: 'Заявка отправлена! Ожидайте проверки.',
    submissionId: newId,
  });
}