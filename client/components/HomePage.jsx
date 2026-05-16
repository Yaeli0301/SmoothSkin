'use client';

import Hero from '@/components/home/Hero';
import SocialProof from '@/components/home/SocialProof';
import ProblemSolution from '@/components/home/ProblemSolution';
import Benefits from '@/components/home/Benefits';
import BeforeAfter from '@/components/home/BeforeAfter';
import FinalCTA from '@/components/home/FinalCTA';
import StickyCTA from '@/components/StickyCTA';
import ExitIntentPopup from '@/components/ExitIntentPopup';
import { useAbTest } from '@/hooks/useAbTest';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useExitIntent } from '@/hooks/useExitIntent';

export default function HomePage({ product }) {
  const variant = useAbTest();
  useAnalytics('/', variant.key);
  const { show, dismiss } = useExitIntent('/', variant.key);

  return (
    <>
      <Hero headline={variant.headline} />
      <SocialProof />
      <ProblemSolution />
      <Benefits benefits={product?.benefits} />
      <BeforeAfter />
      <FinalCTA />
      <StickyCTA href="/product" label="קני עכשיו" ctaColor={variant.ctaColor} />
      <ExitIntentPopup show={show} onDismiss={dismiss} />
    </>
  );
}
