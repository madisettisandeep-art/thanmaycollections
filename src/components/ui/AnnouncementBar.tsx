'use client';

import React from 'react';
import Link from 'next/link';

const ANNOUNCEMENTS = [
  { text: 'Discover Our Latest Imitation Jewellery Collection', linkText: 'Explore New Arrivals', href: '/shop?sort=newest' },
  { text: 'Free Insured Pan-India Express Delivery on Orders Above ₹1,999', linkText: 'Shop Now', href: '/shop' },
  { text: 'Handcrafted 24K Micro Gold Dip & Artisanal Uncut Polki Kundan Sets', linkText: 'View Collections', href: '/category/kundan-jewellery' },
  { text: 'Bespoke South Indian Antique Temple Jewellery Haars & Kasu Malas', linkText: 'Discover Temple Jewels', href: '/category/temple-jewellery' },
  { text: 'WhatsApp Concierge: Direct Video Consultation & Sizing Assistance', linkText: 'Chat on WhatsApp', href: 'https://wa.me/919876543210' },
  { text: 'Signature Velvet Gift Box & Anti-Tarnish Protective Packaging with Every Order', linkText: 'Learn Care Guide', href: '/care-guide' },
];

export function AnnouncementBar() {
  return (
    <div className="relative bg-brand-pink text-white border-b border-brand-pink2/60 text-xs sm:text-sm py-2 overflow-hidden shadow-sm select-none z-30">
      {/* Seamless Infinite Horizontal Marquee */}
      <div className="flex animate-announcement-ticker whitespace-nowrap">
        {/* Set 1 */}
        <div className="flex items-center space-x-8 sm:space-x-12 px-4 flex-shrink-0">
          {ANNOUNCEMENTS.map((item, idx) => (
            <div key={`set1-${idx}`} className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block flex-shrink-0" />
              <span className="font-medium tracking-wide text-white">{item.text}</span>
              <Link
                href={item.href}
                className="font-semibold text-gold-light hover:text-white underline underline-offset-4 ml-1 transition-colors flex-shrink-0"
              >
                {item.linkText} &rarr;
              </Link>
            </div>
          ))}
        </div>

        {/* Set 2 (Duplicate for continuous loop) */}
        <div className="flex items-center space-x-8 sm:space-x-12 px-4 flex-shrink-0" aria-hidden="true">
          {ANNOUNCEMENTS.map((item, idx) => (
            <div key={`set2-${idx}`} className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block flex-shrink-0" />
              <span className="font-medium tracking-wide text-white">{item.text}</span>
              <Link
                href={item.href}
                className="font-semibold text-gold-light hover:text-white underline underline-offset-4 ml-1 transition-colors flex-shrink-0"
              >
                {item.linkText} &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
