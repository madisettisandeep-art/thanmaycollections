'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CinemaScrollItem } from '@/types';

interface CinemaScrollProps {
  items: CinemaScrollItem[];
}

export function CinemaScroll({ items }: CinemaScrollProps) {
  const activeItems = items && items.length > 0 ? items : [];

  if (activeItems.length === 0) return null;

  return (
    <section className="w-full py-12 sm:py-16 bg-cream-warm/40 border-y border-border-soft overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-brand-pink uppercase tracking-widest block">
            Live Cinema Showcase
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-text-primary mt-1">
            Latest Collections in Motion
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-text-secondary max-w-md text-center sm:text-right">
          Glide through our latest runway edits, uncut polki creations, and temple jewellery masterpieces.
        </p>
      </div>

      {/* Infinite Cinema Reel Container */}
      <div className="relative w-full overflow-hidden">
        {/* Soft edge fade masks for cinema aesthetic */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-cream-warm/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-cream-warm/90 to-transparent z-10 pointer-events-none" />

        {/* Continuous Gliding Track */}
        <div className="flex animate-cinema-reel whitespace-nowrap">
          {/* Reel Set 1 */}
          <div className="flex items-center space-x-4 sm:space-x-6 px-3 flex-shrink-0">
            {activeItems.map((item, idx) => (
              <CinemaCard key={`reel1-${item.id || idx}`} item={item} />
            ))}
          </div>

          {/* Reel Set 2 (Seamless loop clone) */}
          <div className="flex items-center space-x-4 sm:space-x-6 px-3 flex-shrink-0" aria-hidden="true">
            {activeItems.map((item, idx) => (
              <CinemaCard key={`reel2-${item.id || idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CinemaCard({ item }: { item: CinemaScrollItem }) {
  return (
    <Link
      href={item.link_url || '/shop'}
      className="group relative block w-[280px] sm:w-[340px] md:w-[380px] aspect-[16/10] rounded-2xl overflow-hidden border border-border-soft bg-black shadow-card hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 flex-shrink-0"
    >
      {/* Background High-Res Visual */}
      <Image
        src={item.image_url}
        alt={item.title}
        fill
        sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 380px"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
      />

      {/* Cinematic Gradient Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:from-black/95 transition-colors" />

      {/* Frame Details */}
      <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between text-white z-10">
        {/* Top Tag */}
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] sm:text-xs font-semibold text-gold uppercase tracking-wider border border-gold/30">
            {item.collection_name || 'Haute Jewellery'}
          </span>
          <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-brand-pink text-white backdrop-blur-md flex items-center justify-center transition-colors">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Bottom Details */}
        <div className="space-y-1">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-gold-light transition-colors line-clamp-1 drop-shadow">
            {item.title}
          </h3>
          {item.subtitle && (
            <p className="text-xs text-cream-warm/90 font-normal line-clamp-1 drop-shadow">
              {item.subtitle}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
