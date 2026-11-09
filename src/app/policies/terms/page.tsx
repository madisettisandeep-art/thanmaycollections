import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Thanmay Collections',
  description: 'Terms and conditions governing the purchase and ordering of imitation jewellery from Thanmay Collections.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <div className="border-b border-border-soft pb-6 space-y-2">
        <span className="text-xs font-semibold text-brand-pink uppercase tracking-widest">
          Terms of Service
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary">
          Terms and Conditions
        </h1>
        <p className="text-xs text-text-secondary">Effective Date: November 2026</p>
      </div>

      <div className="prose prose-sm text-xs sm:text-sm text-text-secondary space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-text-primary">1. Nature of Products</h2>
          <p>
            Thanmay Collections specializes exclusively in <strong>premium imitation / fashion jewellery</strong>. Our items are crafted using copper-brass alloys with 24K micron gold finish, synthetic stones, Austrian zirconia, and simulated uncut polki kundan. None of our products contain solid 22K/24K mined gold or natural diamonds unless explicitly stated.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-text-primary">2. WhatsApp Ordering Channel</h2>
          <p>
            Placing an order on this website generates a formal reservation request with a unique reference number (TC-XXXXXXXX) and opens WhatsApp Click-to-Chat. An order is <strong>not finalized</strong> until our concierge manually verifies piece availability, checks shipping destination feasibility, and confirms the order with you on WhatsApp.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-text-primary">3. Pricing and Stock Availability</h2>
          <p>
            All prices listed on the website are in Indian Rupees (INR) and are inclusive of statutory taxes. While we endeavor to maintain real-time inventory synchronization, artisanal pieces are produced in limited batches. In the event of a simultaneous stock depletion, you will be notified immediately on WhatsApp with alternative options or expected restock dates.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-text-primary">4. Handcrafted Variation Disclaimer</h2>
          <p>
            Due to the artisanal hand-setting of kundan stones and manual meenakari enamel handiwork, subtle variations in color, tone, and pearl clusters may occur between batches. These natural variations highlight authentic handcrafting and are not considered manufacturing defects.
          </p>
        </section>
      </div>
    </div>
  );
}
