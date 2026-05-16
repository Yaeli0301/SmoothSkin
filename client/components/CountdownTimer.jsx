'use client';

import { useCountdown } from '@/hooks/useCountdown';

export default function CountdownTimer({ label = 'מבצע נגמר בעוד' }) {
  const { hours, minutes, seconds } = useCountdown();

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm font-medium text-primary">{label}</p>
      <div className="flex gap-2 text-center">
        {[
          { val: hours, unit: 'שעות' },
          { val: minutes, unit: 'דקות' },
          { val: seconds, unit: 'שניות' },
        ].map(({ val, unit }) => (
          <div
            key={unit}
            className="bg-secondary text-white rounded-lg px-3 py-2 min-w-[60px]"
          >
            <span className="text-xl font-bold block">{pad(val)}</span>
            <span className="text-xs opacity-80">{unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
