export default function StarRating({ rating = 5, size = 'sm' }) {
  const cls = size === 'lg' ? 'text-lg' : 'text-sm';
  return (
    <span className={`text-amber-400 ${cls}`} aria-label={`דירוג ${rating} מתוך 5`}>
      {'★'.repeat(Math.round(rating))}
      {'☆'.repeat(5 - Math.round(rating))}
    </span>
  );
}
