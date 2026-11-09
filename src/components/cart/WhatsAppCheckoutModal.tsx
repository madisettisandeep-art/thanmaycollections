'use client';

import React, { useState } from 'react';
import { X, Send, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { useCart } from '@/lib/store/cart-store';
import { formatPrice } from '@/lib/utils/formatters';
import { CustomerOrderDetails } from '@/types';

interface WhatsAppCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WhatsAppCheckoutModal({ isOpen, onClose }: WhatsAppCheckoutModalProps) {
  const { items, subtotal, clearCart, setIsOpen: setCartDrawerOpen } = useCart();

  const [formData, setFormData] = useState<CustomerOrderDetails>({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    notes: '',
    consent: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setError('Please enter a valid 10-digit WhatsApp phone number.');
      return;
    }
    if (!formData.address.trim()) {
      setError('Please enter your complete delivery address.');
      return;
    }
    if (!formData.city.trim() || !formData.state.trim() || !formData.pincode.trim()) {
      setError('Please provide City, State and PIN code for delivery.');
      return;
    }
    if (!formData.consent) {
      setError('You must consent to order processing to place your order.');
      return;
    }

    try {
      setIsLoading(true);

      // Call server validation API to recalculate prices and register order in database
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: formData,
          items: items.map((i) => ({
            productId: i.product.id,
            quantity: i.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to process order. Please try again.');
      }

      // Order created successfully!
      // Clear cart, close modals, and open WhatsApp Click-to-Chat URL
      clearCart();
      setCartDrawerOpen(false);
      onClose();

      if (data.whatsappUrl) {
        // Open WhatsApp in new tab/window
        window.open(data.whatsappUrl, '_blank', 'noopener,noreferrer');
      }

      // Redirect to order confirmation screen
      window.location.href = `/order-success?orderId=${encodeURIComponent(data.order.order_number)}&waUrl=${encodeURIComponent(data.whatsappUrl || '')}`;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-text-primary/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-pure-white rounded-2xl shadow-float border border-border-soft overflow-hidden z-10 max-h-[92vh] flex flex-col animate-fadeIn">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-border-soft flex items-center justify-between bg-cream-warm/40">
          <div>
            <span className="text-[11px] font-semibold text-brand-pink uppercase tracking-widest">
              Direct Order Channel
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-text-primary">
              WhatsApp Checkout
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-text-secondary hover:text-text-primary rounded-full hover:bg-pure-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm rounded-xl flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Order Summary Snapshot */}
          <div className="p-3 rounded-xl bg-cream-warm/50 border border-border-soft text-xs space-y-1">
            <div className="flex justify-between text-text-secondary">
              <span>Items in Order:</span>
              <span className="font-semibold text-text-primary">
                {items.reduce((s, i) => s + i.quantity, 0)} pieces
              </span>
            </div>
            <div className="flex justify-between text-sm font-semibold text-text-primary pt-1 border-t border-border-soft">
              <span>Total Payable Value:</span>
              <span className="text-brand-pink font-bold">{formatPrice(subtotal)}</span>
            </div>
          </div>

          {/* Form Fields */}
          <div>
            <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Priya Sundaram"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-border-soft bg-pure-white focus:outline-none focus:border-brand-pink transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1">
              WhatsApp Phone Number *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g. +91 98765 43210"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-border-soft bg-pure-white focus:outline-none focus:border-brand-pink transition-colors"
            />
            <p className="text-[11px] text-text-secondary mt-1">
              We will confirm your order details and delivery schedule on this WhatsApp number.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1">
              Delivery Street Address *
            </label>
            <textarea
              required
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Flat / House No., Apartment or Society, Street, Landmark"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-border-soft bg-pure-white focus:outline-none focus:border-brand-pink transition-colors"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1">
                City *
              </label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Bengaluru"
                className="w-full px-3 py-2 text-sm rounded-xl border border-border-soft bg-pure-white focus:outline-none focus:border-brand-pink transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1">
                State *
              </label>
              <input
                type="text"
                required
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                placeholder="Karnataka"
                className="w-full px-3 py-2 text-sm rounded-xl border border-border-soft bg-pure-white focus:outline-none focus:border-brand-pink transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1">
                PIN Code *
              </label>
              <input
                type="text"
                required
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                placeholder="560038"
                className="w-full px-3 py-2 text-sm rounded-xl border border-border-soft bg-pure-white focus:outline-none focus:border-brand-pink transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1">
              Special Delivery Instructions (Optional)
            </label>
            <input
              type="text"
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Gift packing request, specific delivery date, etc."
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-border-soft bg-pure-white focus:outline-none focus:border-brand-pink transition-colors"
            />
          </div>

          {/* Privacy Consent Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-text-secondary leading-snug">
              <input
                type="checkbox"
                required
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="mt-0.5 w-4 h-4 rounded border-border-soft text-brand-pink focus:ring-brand-pink"
              />
              <span>
                I consent to Thanmay Collections processing my order and contact details solely to confirm and deliver my jewellery pursuant to the Indian Digital Personal Data Protection Act.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-brand-pink hover:bg-brand-pink2 text-pure-white font-semibold rounded-xl shadow-subtle hover:shadow-card flex items-center justify-center gap-2 transition-all disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Validating & Creating Order...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Order to WhatsApp ({formatPrice(subtotal)})</span>
                </>
              )}
            </button>
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-text-secondary mt-2.5">
              <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
              <span>No online payment gateway needed. Pay directly after confirmation.</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
