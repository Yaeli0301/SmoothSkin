'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set) => ({
      product: null,
      quantity: 1,
      checkoutOpen: false,
      setProduct: (product) => set({ product }),
      setQuantity: (quantity) => set({ quantity: Math.max(1, quantity) }),
      openCheckout: () => set({ checkoutOpen: true }),
      closeCheckout: () => set({ checkoutOpen: false }),
      clear: () => set({ product: null, quantity: 1, checkoutOpen: false }),
    }),
    { name: 'ds-cart' }
  )
);
