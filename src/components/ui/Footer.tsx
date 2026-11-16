import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Instagram, MessageCircle, Mail, MapPin, Phone, ShieldCheck, Award } from 'lucide-react';

export function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_BUSINESS_NUMBER || '919876543210';
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^\d]/g, '')}?text=${encodeURIComponent(
    'Hello Thanmay Collections! I would like to inquire about your jewellery collections.'
  )}`;

  return (
    <footer className="bg-cream-warm border-t border-border-soft text-text-primary pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-border-soft text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-4 p-4 rounded-xl bg-pure-white/70 border border-border-soft">
            <div className="w-10 h-10 rounded-full bg-brand-pink8 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5 text-brand-pink" />
            </div>
            <div>
              <h4 className="font-serif text-base font-semibold text-text-primary">Micro Gold Micron Polish</h4>
              <p className="text-xs text-text-secondary">Long-lasting shine & authentic finish</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-4 p-4 rounded-xl bg-pure-white/70 border border-border-soft">
            <div className="w-10 h-10 rounded-full bg-brand-pink8 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-brand-pink" />
            </div>
            <div>
              <h4 className="font-serif text-base font-semibold text-text-primary">Handcrafted Excellence</h4>
              <p className="text-xs text-text-secondary">Artisanal Kundan & Temple work</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-4 p-4 rounded-xl bg-pure-white/70 border border-border-soft">
            <div className="w-10 h-10 rounded-full bg-brand-pink8 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-brand-pink" />
            </div>
            <div>
              <h4 className="font-serif text-base font-semibold text-text-primary">WhatsApp Ordering</h4>
              <p className="text-xs text-text-secondary">Personalized concierge assistance</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-4 p-4 rounded-xl bg-pure-white/70 border border-border-soft">
            <div className="w-10 h-10 rounded-full bg-brand-pink8 flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5 text-brand-pink" />
            </div>
            <div>
              <h4 className="font-serif text-base font-semibold text-text-primary">Safe Pan-India Delivery</h4>
              <p className="text-xs text-text-secondary">Velvet-lined protective box packaging</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative h-16 sm:h-20 w-32 sm:w-40 filter drop-shadow-[0_2px_8px_rgba(220,193,140,0.3)]">
              <Image
                src="/images/thanmay-logo-transparent.png?v=3"
                alt="Thanmay Collections"
                fill
                unoptimized
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm font-serif italic text-gold-dark font-medium text-base">
              Elegance that celebrates tradition.
            </p>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-sm">
              Thanmay Collections brings you bespoke imitation jewellery crafted to mirror the majesty of heritage gold, uncut polki, temple sculptures, and imperial kundan artistry.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://www.instagram.com/newthanmay_collections/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-pure-white border border-border-soft flex items-center justify-center text-text-primary hover:text-brand-pink hover:border-brand-pink transition-colors shadow-sm"
                aria-label="Instagram @newthanmay_collections"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-pure-white border border-border-soft flex items-center justify-center text-text-primary hover:text-green-600 hover:border-green-500 transition-colors shadow-sm"
                aria-label="WhatsApp Business Concierge"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-semibold text-text-primary uppercase tracking-wider text-xs">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
              <li>
                <Link href="/" prefetch={true} className="hover:text-brand-pink transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" prefetch={true} className="hover:text-brand-pink transition-colors">
                  Shop All Collections
                </Link>
              </li>
              <li>
                <Link href="/shop?filter=new" prefetch={true} className="hover:text-brand-pink transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/wishlist" prefetch={true} className="hover:text-brand-pink transition-colors">
                  My Wishlist
                </Link>
              </li>
              <li>
                <Link href="/about" prefetch={true} className="hover:text-brand-pink transition-colors">
                  About Our Craft
                </Link>
              </li>
              <li>
                <Link href="/contact" prefetch={true} className="hover:text-brand-pink transition-colors">
                  Contact Concierge
                </Link>
              </li>
            </ul>
          </div>

          {/* Collections */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-semibold text-text-primary uppercase tracking-wider text-xs">
              Jewellery Styles
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
              <li>
                <Link href="/category/necklace-sets" prefetch={true} className="hover:text-brand-pink transition-colors">
                  Necklace Sets
                </Link>
              </li>
              <li>
                <Link href="/category/earrings" prefetch={true} className="hover:text-brand-pink transition-colors">
                  Earrings & Jhumkas
                </Link>
              </li>
              <li>
                <Link href="/category/bangles" prefetch={true} className="hover:text-brand-pink transition-colors">
                  Kada Bangles
                </Link>
              </li>
              <li>
                <Link href="/category/bridal-jewellery" prefetch={true} className="hover:text-brand-pink transition-colors">
                  Bridal Trousseau
                </Link>
              </li>
              <li>
                <Link href="/category/temple-jewellery" prefetch={true} className="hover:text-brand-pink transition-colors">
                  Temple Jewellery
                </Link>
              </li>
              <li>
                <Link href="/category/kundan-jewellery" prefetch={true} className="hover:text-brand-pink transition-colors">
                  Polki Kundan Sets
                </Link>
              </li>
              <li>
                <Link href="/category/daily-wear-jewellery" prefetch={true} className="hover:text-brand-pink transition-colors">
                  Daily Wear Anti-Tarnish
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies & Care */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-semibold text-text-primary uppercase tracking-wider text-xs">
              Client Care & Policies
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
              <li>
                <Link href="/care-guide" prefetch={true} className="hover:text-brand-pink transition-colors">
                  Jewellery Care Guide
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping" prefetch={true} className="hover:text-brand-pink transition-colors">
                  Shipping & Dispatch
                </Link>
              </li>
              <li>
                <Link href="/policies/returns" prefetch={true} className="hover:text-brand-pink transition-colors">
                  Return & Exchange Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy" prefetch={true} className="hover:text-brand-pink transition-colors">
                  Privacy Policy (DPDP Act)
                </Link>
              </li>
              <li>
                <Link href="/policies/terms" prefetch={true} className="hover:text-brand-pink transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 border-t border-border-soft flex flex-col sm:flex-row items-center justify-between text-xs text-text-secondary gap-4">
          <p>&copy; {new Date().getFullYear()} Thanmay Collections. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Official Instagram:{' '}
            <a
              href="https://www.instagram.com/newthanmay_collections/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-pink hover:underline"
            >
              @newthanmay_collections
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
