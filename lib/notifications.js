// lib/notifications.js
import nodemailer from 'nodemailer';

// 🔔 Уведомление админу в Telegram
export async function sendAdminNotification(submission) {
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;

  if (!BOT_TOKEN || !ADMIN_CHAT_ID) {
    console.warn('⚠️ Telegram bot credentials not set');
    return;
  }

  const message = `
📥 <b>Новая заявка на бота!</b>
━━━━━━━━━━━━━━━━━━━━━━
🤖 <b>Название:</b> ${submission.name}
📝 <b>Username:</b> @${submission.username}
📂 <b>Категория:</b> ${submission.category}
👤 <b>Контакты:</b> ${submission.contact || 'Не указано'}
📋 <b>Описание:</b> ${submission.description?.substring(0, 200) || '—'}
━━━━━━━━━━━━━━━━━━━━━━
<b>ID заявки:</b> #${submission.id}
<b>Дата:</b> ${new Date(submission.createdAt).toLocaleString('ru-RU')}

[✅ Принять] [❌ Отклонить] [📝 Комментарий]
  `.trim();

  const keyboard = {
    inline_keyboard: [
      [
        { text: '✅ Принять', callback_data: `approve_${submission.id}` },
        { text: '❌ Отклонить', callback_data: `reject_${submission.id}` },
      ],
      [
        { text: '📝 Комментарий', callback_data: `comment_${submission.id}` },
      ],
    ],
  };

  const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: ADMIN_CHAT_ID,
      text: message,
      parse_mode: 'HTML',
      reply_markup: keyboard,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Telegram API error: ${error.description}`);
  }

  return response.json();
}

// ✉️ Email пользователю (упрощённая версия)
export async function sendApprovalEmail(userEmail, submission, botUrl) {
  // Если нет SMTP настроек — просто логируем
  if (!process.env.SMTP_HOST) {
    console.log(`📧 Email would be sent to ${userEmail} for bot @${submission.username}`);
    return { messageId: 'mock-id' };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Tegbi Catalog" <${process.env.EMAIL_FROM}>`,
    to: userEmail,
    subject: '✅ Ваш бот добавлен в Tegbi Catalog!',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #3B82F6, #8B5CF6); padding: 24px; border-radius: 16px 16px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">🎉 Поздравляем!</h1>
        </div>
        <div style="background: white; padding: 24px; border: 1px solid #e5e7eb; border-radius: 0 0 16px 16px;">
          <p style="margin: 0 0 16px 0; color: #374151;">Здравствуйте!</p>
          <p style="margin: 0 0 16px 0; color: #374151;">
            Ваш бот <b>@${submission.username}</b> успешно прошёл проверку и добавлен в каталог <b>Tegbi Catalog</b>.
          </p>
          <div style="background: #f9fafb; padding: 16px; border-radius: 12px; margin: 16px 0;">
            <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">🔗 Ссылка на страницу:</p>
            <a href="${botUrl}" style="color: #3B82F6; text-decoration: none; font-weight: 500;">
              ${botUrl}
            </a>
          </div>
          <p style="margin: 0 0 24px 0; color: #374151;">
            Спасибо за заявку!<br>
            <b>Команда Tegbi</b>
          </p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
          <p style="margin: 0; color: #9ca3af; font-size: 12px;">
            Это письмо отправлено автоматически. Пожалуйста, не отвечайте на него.
          </p>
        </div>
      </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}