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
    <div className="relative bg-brand-pink8 text-text-primary border-b border-border-soft text-xs sm:text-sm py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center font-medium">
        <Sparkles className="w-3.5 h-3.5 text-brand-pink flex-shrink-0 animate-pulse" />
        <span className="tracking-wide">{message}</span>
        {linkText && linkHref && (
          <Link
            href={linkHref}
            className="hidden sm:inline-flex items-center font-semibold text-brand-pink hover:text-brand-pink2 underline underline-offset-4 ml-1 transition-colors"
          >
            {linkText} &rarr;
          </Link>
        )}
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary p-1 rounded-full transition-colors"
        aria-label="Close announcement bar"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
