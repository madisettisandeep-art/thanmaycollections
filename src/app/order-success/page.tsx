'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, MessageCircle, ArrowRight, ShieldCheck, Copy, Check } from 'lucide-react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'TC-ORDER';
  const waUrl = searchParams.get('waUrl');
  const [copied, setCopied] = React.useState(false);

  const handleCopyId = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-16 sm:py-24 text-center space-y-8 animate-fadeIn">
      {/* Brand logo */}
      <div className="relative h-18 w-36 mx-auto filter drop-shadow-[0_2px_8px_rgba(220,193,140,0.35)]">
        <Image src="/images/thanmay-logo-transparent.png?v=3" alt="Thanmay Collections" fill unoptimized className="object-contain" />
      </div>

      <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 mx-auto flex items-center justify-center text-green-600 shadow-sm">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <div className="space-y-3">
        <span className="text-xs font-semibold text-brand-pink uppercase tracking-widest">
          Order Registered
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary">
          Thank you for choosing Thanmay!
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
          Your order request has been logged in our system. If WhatsApp didn&rsquo;t open automatically, please tap the button below to send your pre-filled order message.
        </p>
      </div>

      {/* Order Reference Box */}
      <div className="p-5 rounded-2xl bg-pure-white border border-border-soft shadow-subtle space-y-3 max-w-sm mx-auto">
        <span className="text-[11px] text-text-secondary uppercase tracking-wider block">
          Your Official Order ID
        </span>
        <div className="flex items-center justify-center gap-2">
          <span className="font-mono text-xl sm:text-2xl font-bold text-text-primary tracking-wider">
            {orderId}
          </span>
          <button
            onClick={handleCopyId}
            className="p-1.5 text-text-secondary hover:text-brand-pink rounded-lg transition-colors"
            title="Copy Order ID"
          >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-semibold border border-amber-200">
          <span>Status: Awaiting WhatsApp Confirmation</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 max-w-sm mx-auto">
        {waUrl && (
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold text-sm rounded-xl shadow-subtle hover:shadow-card flex items-center justify-center gap-2 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Open Order in WhatsApp</span>
          </a>
        )}

        <Link
          href="/shop"
          className="w-full py-3.5 px-6 bg-pure-white hover:bg-cream-warm text-text-primary border border-border-soft font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="p-4 rounded-2xl bg-cream-warm/60 border border-border-soft max-w-md mx-auto text-xs text-text-secondary flex items-start gap-3 text-left">
        <ShieldCheck className="w-5 h-5 text-brand-pink flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-text-primary font-semibold block">What happens next?</strong>
          Our concierge will verify product availability, check your delivery PIN code, and share final packing photos directly on WhatsApp before dispatch.
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center py-24 text-sm text-text-secondary">Loading order confirmation...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
