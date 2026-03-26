// components/SubmissionStatus.js
export default function SubmissionStatus({ submissionId }) {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // В реальном проекте: fetch(`/api/submissions/${submissionId}`)
    // Для демо — заглушка
    setTimeout(() => {
      setStatus({ status: 'pending', message: 'Ваша заявка на рассмотрении' });
      setLoading(false);
    }, 500);
  }, [submissionId]);

  if (loading) return <div className="text-center py-4">Загрузка статуса...</div>;

  const colors = {
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    approved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    rejected: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  const icons = {
    pending: '⏳',
    approved: '✅',
    rejected: '❌',
  };

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium ${colors[status.status]}`}>
      <span>{icons[status.status]}</span>
      <span>{status.message}</span>
    </div>
  );
}