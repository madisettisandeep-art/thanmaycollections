'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, X } from 'lucide-react';

interface AnnouncementBarProps {
  message?: string;
  linkText?: string;
  linkHref?: string;
}

export function AnnouncementBar({
  message = 'Discover our latest imitation jewellery collection | Free shipping on orders above ₹1,999',
  linkText = 'Shop New Arrivals',
  linkHref = '/shop?sort=newest',
}: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-brand-pink text-pure-white border-b border-brand-pink2/40 text-xs sm:text-sm py-2.5 px-4 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center font-medium">
        <Sparkles className="w-3.5 h-3.5 text-gold flex-shrink-0 animate-pulse" />
        <span className="tracking-wide text-cream-warm">{message}</span>
        {linkText && linkHref && (
          <Link
            href={linkHref}
            className="hidden sm:inline-flex items-center font-semibold text-gold-light hover:text-pure-white underline underline-offset-4 ml-1 transition-colors"
          >
            {linkText} &rarr;
          </Link>
        )}
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-cream-warm/70 hover:text-pure-white p-1 rounded-full transition-colors"
        aria-label="Close announcement bar"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
