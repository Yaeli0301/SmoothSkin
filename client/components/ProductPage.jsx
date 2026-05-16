'use client';

import { useMemo } from 'react';
import ImageGallery from '@/components/product/ImageGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ReviewsSection from '@/components/product/ReviewsSection';
import CheckoutModal from '@/components/CheckoutModal';
import StickyCTA from '@/components/StickyCTA';
import ExitIntentPopup from '@/components/ExitIntentPopup';
import { useAbTest } from '@/hooks/useAbTest';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useExitIntent } from '@/hooks/useExitIntent';
import { useCartStore } from '@/hooks/useCartStore';
import { getVariantPrice } from '@/utils/abTest';

export default function ProductPage({ product }) {
  const variant = useAbTest();
  const { checkoutOpen, openCheckout, closeCheckout } = useCartStore();
  useAnalytics('/product', variant.key);
  const { show, dismiss } = useExitIntent('/product', variant.key);

  const price = useMemo(
    () => getVariantPrice(product.price),
    [product.price]
  );

  return (
    <>
      <div className="section-padding grid md:grid-cols-2 gap-10 pt-6">
        <ImageGallery images={product.images} />
        <ProductInfo
          product={product}
          price={price}
          onBuy={openCheckout}
          ctaColor={variant.ctaColor}
        />
      </div>
      <ReviewsSection reviews={product.reviews} />
      <StickyCTA onClick={openCheckout} label="קני עכשיו" ctaColor={variant.ctaColor} />
      {checkoutOpen && (
        <CheckoutModal
          product={product}
          price={price}
          abVariant={variant.key}
          onClose={closeCheckout}
        />
      )}
      <ExitIntentPopup show={show} onDismiss={dismiss} />
    </>
  );
}
