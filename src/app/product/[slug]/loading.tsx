import React from 'react';

export default function ProductLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse space-y-12">
      {/* Product Details Layout Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left: Gallery Skeleton */}
        <div className="space-y-4">
          <div className="aspect-square w-full rounded-3xl bg-cream-warm/80 border border-border-soft" />
          <div className="flex gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-20 h-20 rounded-2xl bg-cream-warm/60 border border-border-soft" />
            ))}
          </div>
        </div>

        {/* Right: Info & Purchase Skeleton */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="h-4 w-32 bg-border-soft/60 rounded-full" />
            <div className="h-9 w-3/4 bg-cream-warm rounded-xl" />
            <div className="h-4 w-28 bg-border-soft/40 rounded" />
          </div>

          <div className="h-10 w-40 bg-cream-warm rounded-xl" />

          <div className="space-y-2 py-4 border-y border-border-soft">
            <div className="h-4 w-full bg-cream-warm/60 rounded" />
            <div className="h-4 w-5/6 bg-cream-warm/60 rounded" />
            <div className="h-4 w-2/3 bg-cream-warm/60 rounded" />
          </div>

          <div className="space-y-3">
            <div className="h-12 w-full bg-brand-pink/20 rounded-2xl" />
            <div className="h-12 w-full bg-emerald-100/50 rounded-2xl" />
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 rounded-xl bg-cream-warm/50 border border-border-soft" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
