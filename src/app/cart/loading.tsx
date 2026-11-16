import React from 'react';

export default function CartLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 animate-pulse space-y-6">
      <div className="h-8 w-48 bg-cream-warm rounded-xl" />
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-4 rounded-2xl bg-pure-white border border-border-soft flex gap-4 items-center">
            <div className="w-20 h-20 rounded-xl bg-cream-warm shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-40 bg-cream-warm rounded" />
              <div className="h-3 w-20 bg-cream-warm/60 rounded" />
              <div className="h-4 w-24 bg-brand-pink/20 rounded" />
            </div>
          </div>
        ))}
      </div>
      <div className="p-6 rounded-2xl bg-cream-warm/60 border border-border-soft space-y-4">
        <div className="h-6 w-full bg-cream-warm rounded" />
        <div className="h-12 w-full bg-brand-pink/30 rounded-xl" />
      </div>
    </div>
  );
}
