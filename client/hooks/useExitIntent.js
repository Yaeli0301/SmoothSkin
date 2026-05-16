'use client';

import { useState, useEffect, useCallback } from 'react';
import { trackExitIntent } from '@/utils/analytics';

export function useExitIntent(page, abVariant) {
  const [show, setShow] = useState(false);

  const dismiss = useCallback(() => setShow(false), []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const shown = sessionStorage.getItem('exit_intent_shown');
    if (shown) return;

    const handleMouseLeave = (e) => {
      if (e.clientY <= 0) {
        setShow(true);
        sessionStorage.setItem('exit_intent_shown', '1');
        trackExitIntent(page, abVariant);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [page, abVariant]);

  return { show, dismiss };
}
