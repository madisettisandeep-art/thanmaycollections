import React from 'react';

export default function CategoryLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse space-y-8">
      {/* Category Hero Banner Skeleton */}
      <div className="h-52 sm:h-72 rounded-3xl bg-cream-warm/90 border border-border-soft flex flex-col justify-center items-center p-8 space-y-3">
        <div className="h-4 w-32 bg-border-soft/60 rounded-full" />
        <div className="h-9 w-64 bg-border-soft/80 rounded-xl" />
        <div className="h-4 w-80 max-w-full bg-border-soft/50 rounded-full" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-border-soft bg-pure-white p-3 space-y-3 shadow-subtle"
          >
            <div className="aspect-square w-full rounded-xl bg-cream-warm/70" />
            <div className="space-y-1.5 pt-1">
              <div className="h-3 w-16 bg-border-soft/50 rounded" />
              <div className="h-4 w-full bg-border-soft/80 rounded" />
              <div className="h-4 w-24 bg-border-soft/60 rounded" />
            </div>
            <div className="pt-2 flex justify-between items-center border-t border-border-soft/50">
              <div className="h-5 w-20 bg-border-soft/70 rounded" />
              <div className="h-8 w-14 bg-border-soft/60 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
