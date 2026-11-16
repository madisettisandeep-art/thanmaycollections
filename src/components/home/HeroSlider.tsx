'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { HeroBanner } from '@/types';

interface HeroSliderProps {
  banners: HeroBanner[];
}

export function HeroSlider({ banners }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const activeBanners = banners && banners.length > 0 ? banners : [];
  const total = activeBanners.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-advance slider every 5 seconds (scroll from right to left)
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, total, nextSlide]);

  if (total === 0) return null;

  return (
    <section
      className="relative w-full overflow-hidden bg-black select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (diff > 50) nextSlide();
        else if (diff < -50) prevSlide();
        touchStartX.current = null;
      }}
      aria-label="Featured Jewellery Collections"
    >
      {/* Banner Slides Container - Smooth Right to Left Motion */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-[520px] sm:h-[580px] lg:h-[660px] xl:h-[720px] w-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {activeBanners.map((banner, idx) => (
          <div
            key={banner.id}
            className="relative w-full flex-shrink-0 h-full flex items-center justify-start"
          >
            {/* Background Banner Image */}
            <Image
              src={banner.image_url}
              alt={banner.title}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover object-center"
            />

            {/* Gradient Overlays for Supreme Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
              <div className="max-w-2xl space-y-4 sm:space-y-6">
                {/* Badge */}
                {banner.badge && (
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-pink/90 backdrop-blur-md border border-gold/40 text-xs sm:text-sm font-semibold text-white tracking-wide shadow-md">
                    <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
                    <span>{banner.badge}</span>
                  </div>
                )}

                {/* Main Headline */}
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight drop-shadow-lg">
                  {banner.title}
                </h1>

                {/* Subtitle / Description */}
                {banner.subtitle && (
                  <p className="text-sm sm:text-lg text-cream-warm/95 font-normal leading-relaxed max-w-xl drop-shadow">
                    {banner.subtitle}
                  </p>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2 sm:pt-4">
                  <Link
                    href={banner.button_link || '/shop'}
                    className="px-8 py-3.5 sm:py-4 bg-brand-pink hover:bg-brand-pink2 text-white font-semibold text-sm sm:text-base rounded-full shadow-lg hover:shadow-xl flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5 border border-gold/30"
                  >
                    <span className="text-white font-semibold">{banner.button_text || 'Explore Collection'}</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </Link>

                  <Link
                    href="/shop?sort=newest"
                    className="px-7 py-3.5 sm:py-4 bg-white/95 hover:bg-white text-text-primary font-semibold text-sm sm:text-base rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 border border-border-soft"
                  >
                    Shop New Arrivals
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Chevrons */}
      {total > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/40 hover:bg-black/75 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all z-20 hover:scale-105"
            aria-label="Previous banner"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/40 hover:bg-black/75 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all z-20 hover:scale-105"
            aria-label="Next banner"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Indicator Navigation Pills */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/10">
            {activeBanners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === idx
                    ? 'w-8 h-2.5 bg-gold shadow-sm'
                    : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
