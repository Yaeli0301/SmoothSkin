export default function LimitedStock({ stock = 23 }) {
  const pct = Math.min(100, Math.max(10, (stock / 50) * 100));

  return (
    <div className="bg-accent/50 rounded-card p-4">
      <p className="text-sm font-semibold text-primary mb-2">
        ⚡ המלאי מוגבל! נשארו רק {stock} יחידות
      </p>
      <div className="h-2 bg-white rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
