import React from 'react';
import { Metadata } from 'next';
import { RotateCcw, AlertCircle, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Return & Exchange Policy | Thanmay Collections',
  description: 'Guidelines on returns, replacements, and transit damage reporting for Thanmay Collections.',
};

export default function ReturnsPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <div className="border-b border-border-soft pb-6 space-y-2">
        <span className="text-xs font-semibold text-brand-pink uppercase tracking-widest">
          Customer Assurance
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary">
          Return and Exchange Policy
        </h1>
        <p className="text-xs text-text-secondary">Fair, Transparent Policies for Handcrafted Jewellery</p>
      </div>

      <div className="p-6 rounded-3xl bg-cream-warm border border-border-soft space-y-3">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-brand-pink" />
          <h2 className="font-serif text-xl font-bold text-text-primary">
            Mandatory Unboxing Video Requirement
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
          Because imitation jewellery is delicate and prone to transit handling issues, we require an <strong>uncut, continuous 360-degree unboxing video</strong> recorded from the opening of the outer courier flyer to the inspection of the jewellery. This ensures absolute protection and instant claims in the rare event of transit damage.
        </p>
      </div>

      <div className="prose prose-sm text-xs sm:text-sm text-text-secondary space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-serif text-base font-bold text-text-primary">1. Damaged or Defective Items Received</h3>
          <p>
            If your piece arrives with a broken stone, dislodged hook, or plating damage during transit, please share the unboxing video with our WhatsApp team within <strong>48 hours of delivery</strong>. Once verified, we will arrange a complimentary pickup and ship an identical replacement piece immediately at zero additional cost.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-base font-bold text-text-primary">2. Non-Returnable Scenarios</h3>
          <p>
            Due to strict personal hygiene standards applicable to jewellery that touches the skin:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Earrings and nose pins cannot be returned for change of mind once worn.</li>
            <li>Pieces damaged due to improper storage, exposure to water/perfume, or accidental pulling are not eligible for replacement.</li>
            <li>Customized bridal sets altered on request cannot be refunded.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-base font-bold text-text-primary">3. Processing Time</h3>
          <p>
            Verified exchange requests are typically inspected and processed within 2-3 business days upon arrival at our Bangalore vault.
          </p>
        </section>
      </div>
    </div>
  );
}
