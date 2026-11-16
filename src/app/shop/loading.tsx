import React from 'react';

export default function ShopLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse space-y-6">
      {/* Page Header Skeleton */}
      <div className="space-y-2 border-b border-border-soft pb-6">
        <div className="h-4 w-28 bg-brand-pink8/60 rounded-full" />
        <div className="h-8 sm:h-10 w-72 bg-cream-warm rounded-xl" />
        <div className="h-4 w-96 max-w-full bg-cream-warm/70 rounded" />
      </div>

      {/* Filter bar & Content grid */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filter Skeleton */}
        <div className="hidden lg:block w-64 shrink-0 space-y-6">
          <div className="p-5 rounded-2xl bg-pure-white border border-border-soft space-y-4">
            <div className="h-5 w-24 bg-cream-warm rounded" />
            <div className="space-y-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-6 w-full bg-cream-warm/60 rounded-lg" />
              ))}
            </div>
            <div className="h-px bg-border-soft" />
            <div className="h-5 w-20 bg-cream-warm rounded" />
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-6 w-full bg-cream-warm/60 rounded-lg" />
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid Skeleton */}
        <div className="flex-1 space-y-4">
          <div className="h-10 w-full bg-pure-white border border-border-soft rounded-xl" />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border-soft bg-pure-white p-3 space-y-3 shadow-subtle"
              >
                <div className="aspect-square w-full rounded-xl bg-cream-warm/70" />
                <div className="space-y-1.5 pt-1">
                  <div className="h-3 w-16 bg-border-soft/50 rounded" />
                  <div className="h-4 w-full bg-border-soft/80 rounded" />
                  <div className="h-3 w-28 bg-border-soft/40 rounded" />
                </div>
                <div className="pt-2 flex justify-between items-center border-t border-border-soft/50">
                  <div className="h-5 w-20 bg-border-soft/70 rounded" />
                  <div className="h-8 w-16 bg-border-soft/60 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
