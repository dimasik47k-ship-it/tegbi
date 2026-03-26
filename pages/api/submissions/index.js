// pages/api/submissions/index.js
import { readFile } from 'fs/promises';
import { join } from 'path';

const SUBMISSIONS_FILE = join(process.cwd(), 'data', 'submissions.json');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const fileData = await readFile(SUBMISSIONS_FILE, 'utf8');
    const data = JSON.parse(fileData);
    
    return res.status(200).json({
      success: true,
      data: data.submissions.sort((a, b) => b.id - a.id), // Новые сверху
    });
  } catch (err) {
    console.error('Error reading submissions:', err);
    return res.status(500).json({ error: 'Failed to read submissions' });
  }
}