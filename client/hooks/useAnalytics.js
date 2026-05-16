'use client';

import { useEffect } from 'react';
import { trackPageView } from '@/utils/analytics';

export function useAnalytics(page, abVariant) {
  useEffect(() => {
    if (abVariant) trackPageView(page, abVariant);
  }, [page, abVariant]);
}
