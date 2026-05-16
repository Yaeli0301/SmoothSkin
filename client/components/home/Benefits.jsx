const ICONS = {
  heart: '💗',
  mobile: '📱',
  zap: '⚡',
  shield: '🛡️',
};

export default function Benefits({ benefits }) {
  const items = benefits?.length
    ? benefits
    : [
        { icon: 'heart', label: 'ללא כאב' },
        { icon: 'mobile', label: 'נייד' },
        { icon: 'zap', label: 'מהיר' },
        { icon: 'shield', label: 'בטוח לעור' },
      ];

  return (
    <section className="section-padding bg-secondary text-white rounded-card mx-4 md:mx-8">
      <h2 className="text-3xl font-bold text-center mb-12">למה לבחור בנו?</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((b) => (
          <div key={b.label} className="text-center">
            <span className="text-4xl block mb-3">{ICONS[b.icon] || '✓'}</span>
            <p className="font-bold text-lg">{b.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
