import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ChevronRight } from 'lucide-react';
import { getProducts } from '@/lib/data/store-repository';
import { ProductCard } from '@/components/products/ProductCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Arrivals | Latest Imitation Jewellery Collections',
  description: 'Discover the newest arrivals in bridal kundan chokers, antique temple haar designs, and anti-tarnish daily wear from Thanmay Collections.',
};

export const revalidate = 60;

export default async function NewArrivalsPage() {
  const newArrivals = await getProducts({ newArrival: true });

  return (
    <div className="space-y-12 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-cream-warm via-cream-soft to-brand-pink8/50 border-b border-border-soft py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center sm:text-left">
          <nav className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-text-secondary">
            <Link href="/" className="hover:text-brand-pink transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-text-primary">New Arrivals</span>
          </nav>

          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pure-white text-[11px] font-bold uppercase tracking-wider text-brand-pink shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fresh Artisan Drops</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-text-primary">
              The New Arrivals Collection
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Explore our latest seasonal releases fresh from the artisan benches of Jaipur and South India. Hand-set polki kundan, radiant champagne pearls, and anti-tarnish modern essentials.
            </p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>Showing <strong className="text-text-primary">{newArrivals.length}</strong> new arrivals</span>
          <Link href="/shop" className="hover:text-brand-pink font-semibold">
            View All Collections &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
