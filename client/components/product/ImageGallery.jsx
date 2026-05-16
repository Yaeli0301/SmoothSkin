'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ImageGallery({ images = [] }) {
  const [active, setActive] = useState(0);
  const list = images.length ? images : ['https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80'];

  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-card overflow-hidden shadow-soft">
        <Image
          src={list[active]}
          alt="תמונת מוצר"
          fill
          priority={active === 0}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      {list.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {list.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActive(i)}
              className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 ${
                active === i ? 'border-primary' : 'border-transparent'
              }`}
            >
              <Image src={img} alt="" fill sizes="80px" className="object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
