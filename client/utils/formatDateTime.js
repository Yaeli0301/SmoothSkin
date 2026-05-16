/** תאריך ושעה עם השעה בצד שמאל (LTR) */
export function formatDateTime(dateInput) {
  const d = new Date(dateInput);
  if (Number.isNaN(d.getTime())) return '—';

  const pad = (n) => String(n).padStart(2, '0');
  const time = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  const date = `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;

  return { time, date, full: `${time} · ${date}` };
}

/** YYYY-MM-DD → DD/MM/YYYY */
export function formatDateKey(isoDate) {
  if (!isoDate) return '—';
  const [y, m, day] = isoDate.split('-');
  if (!y || !m || !day) return isoDate;
  return `${day}/${m}/${y}`;
}
