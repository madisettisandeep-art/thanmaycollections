import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Heart, ShieldCheck, ArrowRight, Award } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | The Thanmay Collections Story',
  description: 'Elegance that celebrates tradition. Discover the artisanal craftsmanship behind Thanmay Collections imitation jewellery.',
};

export default function AboutPage() {
  return (
    <div className="space-y-16 sm:space-y-24 py-12 sm:py-16">
      {/* Hero Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-semibold text-brand-pink uppercase tracking-widest">
          Our Heritage & Passion
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-text-primary leading-tight">
          Elegance that celebrates tradition.
        </h1>
        <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
          Thanmay Collections was born out of deep reverence for Indian jewellery heritage—the timeless allure of royal polki kundan, sacred temple engravings, and celebratory bridal ornaments.
        </p>
      </div>

      {/* Narrative Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-border-soft shadow-card bg-cream-warm">
            <Image
              src="https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1200&q=85"
              alt="Thanmay Collections Artisans at work"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <span className="px-3 py-1 rounded-full bg-cream-warm text-xs font-bold uppercase tracking-wider text-gold-dark border border-gold-dark/30 inline-block">
              Artisanal Craftsmanship
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary">
              Where Royal Heritage Meets Contemporary Feminine Charm
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Every woman deserves to feel like royalty during weddings, festivals, and family milestones without bearing the burden and anxiety of storing solid gold. Our artisans painstakingly sculpt copper-brass alloys, apply thick 24K micron gold plating, and set uncut polki kundan stones with matching precision.
            </p>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              From our signature Padmavati choker sets to lightweight, waterproof anti-tarnish daily wear, every piece in our collection undergoes stringent triple-point quality inspections.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border-soft">
              <div>
                <div className="font-serif text-2xl font-bold text-brand-pink">Jaipur & South</div>
                <div className="text-[11px] text-text-secondary">Artisan Clusters</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-brand-pink">24K Micron</div>
                <div className="text-[11px] text-text-secondary">Gold Polish</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-brand-pink">Zero Compromise</div>
                <div className="text-[11px] text-text-secondary">Hypoallergenic Finish</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Values */}
      <div className="bg-cream-warm/50 py-16 border-y border-border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary">
              Our Core Guiding Principles
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary">
              What sets Thanmay Collections apart in the world of luxury imitation jewellery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-pure-white border border-border-soft shadow-subtle space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-pink8 flex items-center justify-center text-brand-pink">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-text-primary">Authentic Weight & Polish</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                We design our jewellery with the balanced heft, reverse meenakari detailing, and natural gold hue so it looks and feels indistinguishable from heirloom gold jewelry.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-pure-white border border-border-soft shadow-subtle space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-pink8 flex items-center justify-center text-brand-pink">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-text-primary">Ethical & Transparent</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                We believe in straightforward pricing without artificial markups, zero hidden fees, and transparent direct communication through WhatsApp.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-pure-white border border-border-soft shadow-subtle space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-pink8 flex items-center justify-center text-brand-pink">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-text-primary">Personalised Concierge Care</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                No automated bot maze. Every customer speaks directly with our bridal stylists on WhatsApp to answer matching questions, verify blouse neckline suitability, and preview live videos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-text-primary">
          Ready to discover your next statement piece?
        </h2>
        <p className="text-xs sm:text-sm text-text-secondary">
          Browse our newest arrivals or reach out directly for personalized bridal styling advice.
        </p>
        <div className="pt-2">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-pink hover:bg-brand-pink2 text-pure-white text-xs font-semibold rounded-full shadow-subtle"
          >
            <span>Explore Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
