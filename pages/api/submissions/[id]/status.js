// pages/api/submissions/[id]/status.js
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { sendApprovalEmail } from '../../../../lib/notifications';

const SUBMISSIONS_FILE = join(process.cwd(), 'data', 'submissions.json');

export default async function handler(req, res) {
  // CORS для Telegram webhook
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { id } = req.query;
  const { action, botUrl, botUsername, userEmail, comment } = req.body;

  // Читаем данные
  let data;
  try {
    const fileData = await readFile(SUBMISSIONS_FILE, 'utf8');
    data = JSON.parse(fileData);
  } catch {
    return res.status(500).json({ error: 'Failed to read submissions' });
  }

  // Находим заявку
  const submission = data.submissions.find(s => String(s.id) === String(id));
  if (!submission) {
    return res.status(404).json({ error: 'Submission not found' });
  }

  // Обновляем статус
  if (action === 'approve') {
    submission.status = 'approved';
    submission.botUrl = botUrl;
    submission.botUsername = botUsername;
    submission.reviewedAt = new Date().toISOString();
    submission.reviewedBy = 'admin';

    // 🔁 Добавляем бота в основной каталог (опционально)
    // import { addBotToCatalog } from '../../../lib/bots';
    // await addBotToCatalog({ ...submission, id: Date.now() });

    // ✉️ Отправляем письмо пользователю
    if (userEmail) {
      try {
        await sendApprovalEmail(userEmail, submission, botUrl);
      } catch (err) {
        console.error('Failed to send approval email:', err);
      }
    }

  } else if (action === 'reject') {
    submission.status = 'rejected';
    submission.reviewedAt = new Date().toISOString();
    submission.reviewedBy = 'admin';
    if (comment) submission.rejectionReason = comment;
  }

  // Сохраняем
  await writeFile(SUBMISSIONS_FILE, JSON.stringify(data, null, 2));

  return res.status(200).json({
    success: true,
    message: action === 'approve' ? 'Бот принят и письмо отправлено' : 'Заявка отклонена',
    submission,
  });
}