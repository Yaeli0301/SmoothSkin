'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'ds_countdown_end';

function getEndTime() {
  if (typeof window === 'undefined') return Date.now() + 24 * 60 * 60 * 1000;
  let end = localStorage.getItem(STORAGE_KEY);
  if (!end) {
    end = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem(STORAGE_KEY, String(end));
  }
  return Number(end);
}

export function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const end = getEndTime();
    const tick = () => {
      const diff = Math.max(0, end - Date.now());
      setTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return timeLeft;
}
