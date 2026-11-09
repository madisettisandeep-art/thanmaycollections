import React from 'react';
import { Droplets, Sun, Sparkles, Package, ShieldCheck, Heart, AlertTriangle } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jewellery Care Guide | Thanmay Collections',
  description: 'Learn how to preserve the 24K micron gold polish, kundan stones, and luster of your Thanmay Collections imitation jewellery.',
};

export default function CareGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      <div className="text-center space-y-2">
        <span className="text-xs font-semibold text-brand-pink uppercase tracking-widest">
          Artisan Longevity Guide
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-text-primary">
          Jewellery Care & Preservation
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary max-w-xl mx-auto">
          High-micron gold plated imitation jewellery retains its regal brilliance for years when cared for with affection and precision.
        </p>
      </div>

      <div className="space-y-6">
        {/* Core Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-pure-white border border-border-soft shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-pink8 flex items-center justify-center text-brand-pink">
              <Droplets className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-text-primary">The &ldquo;Last On, First Off&rdquo; Principle</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Always put on your imitation jewellery as the final touch after your makeup, perfume, hairspray, and body lotions have completely dried. Chemical vapors and alcohol residues in perfumes can react with the micro-gold polish and accelerate oxidation.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-pure-white border border-border-soft shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-pink8 flex items-center justify-center text-brand-pink">
              <Sun className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-text-primary">Dry Storage & Humidity Protection</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Never store your jewellery in damp places like bathrooms. Wipe each piece gently with a dry cotton cloth after wearing to remove moisture and sweat, then store it in an airtight ziplock pouch inside the provided velvet box.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-pure-white border border-border-soft shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-pink8 flex items-center justify-center text-brand-pink">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-text-primary">Separate Compartments</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Keep individual necklaces, jhumkas, and bangles separated. Direct metal-to-metal rubbing can scratch the gold plating or dislodge delicate uncut polki and seed pearls.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-pure-white border border-border-soft shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-pink8 flex items-center justify-center text-brand-pink">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-text-primary">No Liquid Cleaners</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Do not use liquid jewellery dips, ultrasonic cleaners, soap water, or abrasive detergents. A clean, lint-free microfiber cloth is all you need to buff the piece to a lustrous shine.
            </p>
          </div>
        </div>

        {/* Polki & Kundan Special Note */}
        <div className="p-6 sm:p-8 rounded-3xl bg-cream-warm border border-border-soft space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-pink" />
            <h3 className="font-serif text-xl font-bold text-text-primary">
              Caring for Kundan & Meenakari Pieces
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            Kundan jewellery features hand-set stones backed by silver foil and delicate reverse enamel work (meenakari). Exposure to water can seep under the foil, causing discoloration. Treat these pieces like precious antique treasures—keep completely dry and store in soft fabric pouches.
          </p>
        </div>
      </div>
    </div>
  );
}
