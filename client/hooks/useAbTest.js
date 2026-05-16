'use client';

import { useState, useEffect } from 'react';
import { getAbVariant } from '@/utils/abTest';
import { trackEvent } from '@/utils/api';
import { getSessionId } from '@/utils/analytics';

export function useAbTest() {
  const [variant, setVariant] = useState({ key: 'A', headline: '', ctaColor: 'primary' });

  useEffect(() => {
    const v = getAbVariant();
    setVariant(v);
    trackEvent({
      event: 'ab_exposure',
      sessionId: getSessionId(),
      abVariant: v.key,
      metadata: { headline: v.headline },
    });
  }, []);

  return variant;
}
