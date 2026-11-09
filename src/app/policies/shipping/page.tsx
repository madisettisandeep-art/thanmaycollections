import React from 'react';
import { Metadata } from 'next';
import { Truck, ShieldCheck, Clock, PackageCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shipping Policy | Thanmay Collections',
  description: 'Pan-India shipping timelines, packaging safety, and tracking information for Thanmay Collections.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <div className="border-b border-border-soft pb-6 space-y-2">
        <span className="text-xs font-semibold text-brand-pink uppercase tracking-widest">
          Dispatch & Logistics
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary">
          Shipping & Delivery Policy
        </h1>
        <p className="text-xs text-text-secondary">Safe, Insured Delivery Across India</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-pure-white border border-border-soft flex items-start gap-3">
          <Clock className="w-5 h-5 text-brand-pink flex-shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-text-primary block text-sm">Dispatch Within 24-48 Hours</span>
            <span className="text-text-secondary">Orders confirmed on WhatsApp are dispatched promptly on the next business day.</span>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-pure-white border border-border-soft flex items-start gap-3">
          <Truck className="w-5 h-5 text-brand-pink flex-shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-text-primary block text-sm">3-6 Business Days Transit</span>
            <span className="text-text-secondary">Metro cities: 2-4 days; Rest of India: 4-6 business days via Bluedart / DTDC.</span>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-pure-white border border-border-soft flex items-start gap-3">
          <PackageCheck className="w-5 h-5 text-brand-pink flex-shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-text-primary block text-sm">Velvet Protective Packaging</span>
            <span className="text-text-secondary">Every necklace set is cushioned in a velvet box and bubble-shielded hard carton.</span>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-pure-white border border-border-soft flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-brand-pink flex-shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-text-primary block text-sm">Free Shipping Above ₹1,999</span>
            <span className="text-text-secondary">Standard shipping is complimentary on all orders exceeding ₹1,999 across India.</span>
          </div>
        </div>
      </div>

      <div className="prose prose-sm text-xs sm:text-sm text-text-secondary space-y-4 leading-relaxed pt-4 border-t border-border-soft">
        <h2 className="font-serif text-lg font-bold text-text-primary">Tracking Your Shipment</h2>
        <p>
          Once your package is handed over to the courier partner, an automated dispatch notification containing the tracking AWB number and live tracking link will be delivered directly to your WhatsApp number.
        </p>
      </div>
    </div>
  );
}
