'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, PackageCheck, Clock, CheckCircle2, Truck, AlertCircle, MessageCircle, ChevronRight, ShieldCheck, Loader2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils/formatters';

interface TrackedOrder {
  order_number: string;
  customer_name: string;
  city: string;
  state: string;
  order_status: string;
  subtotal: number;
  created_at: string;
  updated_at: string;
  items_count: number;
}

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<TrackedOrder | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setOrder(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/orders/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderNumber, phone }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Could not locate order details.');
      }

      setOrder(data.order);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error retrieving order status');
    } finally {
      setIsLoading(false);
    }
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_BUSINESS_NUMBER || '919876543210';
  const conciergeUrl = `https://wa.me/${whatsappNumber.replace(/[^\d]/g, '')}?text=${encodeURIComponent(
    `Hello Thanmay Collections! Could you please update me on my order status for Order ID: ${order?.order_number || orderNumber}? Thank you!`
  )}`;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-text-secondary">
        <Link href="/" className="hover:text-brand-pink transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-text-primary">Track Order</span>
      </nav>

      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-semibold text-brand-pink uppercase tracking-widest">
          Live Dispatch & Verification
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-text-primary">
          Track Your Jewellery Order
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary max-w-md mx-auto">
          Enter your official Order ID (TC-XXXXXXXX) and WhatsApp number to check real-time verification and shipping status.
        </p>
      </div>

      {/* Lookup Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-pure-white border border-border-soft shadow-subtle space-y-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1">
                Order ID *
              </label>
              <input
                type="text"
                required
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="e.g. TC-9A82F101"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-border-soft font-mono uppercase bg-cream-warm/20 focus:outline-none focus:border-brand-pink"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1">
                WhatsApp Phone Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 9845012345"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-border-soft bg-cream-warm/20 focus:outline-none focus:border-brand-pink"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-brand-pink hover:bg-brand-pink2 text-white font-semibold text-xs rounded-xl shadow-subtle flex items-center justify-center gap-2 transition-all disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Checking Vault & Courier Status...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Track Order Status</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Result Card */}
      {order && (
        <div className="p-6 sm:p-8 rounded-3xl bg-pure-white border border-border-soft shadow-card space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border-soft gap-2">
            <div>
              <span className="text-[11px] font-mono text-text-secondary uppercase">
                Order Reference
              </span>
              <h3 className="font-mono text-2xl font-bold text-text-primary">
                {order.order_number}
              </h3>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-warm text-brand-pink font-semibold text-xs border border-border-soft self-start sm:self-auto">
              <span>{order.order_status}</span>
            </div>
          </div>

          {/* Customer & Location */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-cream-warm/50">
              <span className="text-text-secondary block font-medium">Customer</span>
              <span className="font-bold text-text-primary">{order.customer_name}</span>
            </div>
            <div className="p-3 rounded-xl bg-cream-warm/50">
              <span className="text-text-secondary block font-medium">Destination</span>
              <span className="font-bold text-text-primary">{order.city}, {order.state}</span>
            </div>
          </div>

          {/* Timeline Progress */}
          <div className="py-4 space-y-4">
            <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider">
              Order Timeline
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-green-800 space-y-1">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="font-bold block">1. Registered</span>
                <span className="text-[11px] text-green-700">Order logged in vault</span>
              </div>

              <div className={`p-3 rounded-xl border space-y-1 ${
                order.order_status !== 'Pending' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-gray-50 border-gray-200 text-gray-500'
              }`}>
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="font-bold block">2. Verified</span>
                <span className="text-[11px]">Availability confirmed</span>
              </div>

              <div className={`p-3 rounded-xl border space-y-1 ${
                ['Processing', 'Shipped', 'Delivered'].includes(order.order_status)
                  ? 'bg-green-50 border-green-200 text-green-800'
                  : 'bg-gray-50 border-gray-200 text-gray-500'
              }`}>
                <PackageCheck className="w-4 h-4" />
                <span className="font-bold block">3. Velvet Packed</span>
                <span className="text-[11px]">Inspected & boxed</span>
              </div>

              <div className={`p-3 rounded-xl border space-y-1 ${
                ['Shipped', 'Delivered'].includes(order.order_status)
                  ? 'bg-green-50 border-green-200 text-green-800'
                  : 'bg-gray-50 border-gray-200 text-gray-500'
              }`}>
                <Truck className="w-4 h-4" />
                <span className="font-bold block">4. In Transit</span>
                <span className="text-[11px]">Courier dispatch</span>
              </div>
            </div>
          </div>

          {/* WhatsApp Concierge Action */}
          <div className="pt-4 border-t border-border-soft flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-text-secondary">
              Need immediate updates or packing photos?
            </div>
            <a
              href={conciergeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask Concierge on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
