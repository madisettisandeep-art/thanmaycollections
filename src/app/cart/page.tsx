'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';
import { useCart } from '@/lib/store/cart-store';
import { formatPrice } from '@/lib/utils/formatters';
import { WhatsAppCheckoutModal } from '@/components/cart/WhatsAppCheckoutModal';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalQuantity, subtotal } = useCart();
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-text-secondary">
        <Link href="/" className="hover:text-brand-pink transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-text-primary">Shopping Bag</span>
      </nav>

      {/* Header */}
      <div>
        <span className="text-xs font-semibold text-brand-pink uppercase tracking-widest">
          Order Review
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary mt-1">
          Your Shopping Bag ({totalQuantity})
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="p-16 text-center rounded-3xl bg-pure-white border border-border-soft shadow-subtle space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-cream-warm mx-auto flex items-center justify-center text-brand-pink">
            <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-text-primary">Your bag is currently empty</h2>
          <p className="text-xs sm:text-sm text-text-secondary">
            Your personal jewellery bag is waiting for its first royal addition. Explore our handcrafted imitation jewellery collections.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-pink hover:bg-brand-pink2 text-white text-xs font-semibold rounded-full shadow-subtle transition-all"
            >
              <span>Explore All Collections</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items List Table/Cards */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border-soft text-xs text-text-secondary">
              <span>Product Details</span>
              <button
                onClick={clearCart}
                className="hover:text-red-600 underline transition-colors"
              >
                Clear all items
              </button>
            </div>

            <div className="space-y-4">
              {items.map(({ product, quantity }) => {
                const unitPrice = product.discount_price ?? product.price;
                const lineTotal = unitPrice * quantity;
                const imageSrc = product.images?.[0]?.image_path || '/images/logo.png';

                return (
                  <div
                    key={product.id}
                    className="p-4 sm:p-5 rounded-2xl bg-pure-white border border-border-soft shadow-subtle flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-cream-warm border border-border-soft flex-shrink-0">
                        <Image src={imageSrc} alt={product.name} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-mono text-text-secondary uppercase">
                          {product.product_code}
                        </span>
                        <Link
                          href={`/product/${product.slug}`}
                          className="block font-serif text-base sm:text-lg font-bold text-text-primary hover:text-brand-pink transition-colors truncate"
                        >
                          {product.name}
                        </Link>
                        <div className="text-xs font-semibold text-brand-pink mt-1">
                          {formatPrice(unitPrice)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-border-soft">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-border-soft rounded-xl bg-cream-warm/50 p-1">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="px-2.5 py-1 text-xs font-semibold text-text-primary hover:text-brand-pink"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-text-primary">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="px-2.5 py-1 text-xs font-semibold text-text-primary hover:text-brand-pink"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line Total */}
                      <div className="text-right min-w-[80px]">
                        <span className="text-sm font-bold text-text-primary block">
                          {formatPrice(lineTotal)}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(product.id)}
                        className="p-2 text-text-secondary hover:text-red-600 rounded-lg transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-pink hover:underline"
              >
                &larr; Continue browsing jewellery
              </Link>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-pure-white border border-border-soft shadow-card space-y-6 sticky top-28">
            <h2 className="font-serif text-xl font-bold text-text-primary pb-3 border-b border-border-soft">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between text-text-secondary">
                <span>Subtotal ({totalQuantity} pieces):</span>
                <span className="font-semibold text-text-primary">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-text-secondary">
                <span>Estimated Packaging & Shipping:</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
              <div className="flex justify-between text-text-secondary">
                <span>Sales Tax / GST:</span>
                <span className="font-semibold text-text-primary">Included</span>
              </div>
              <div className="pt-3 border-t border-border-soft flex justify-between items-baseline">
                <span className="font-serif text-base font-bold text-text-primary">Total Payable:</span>
                <span className="font-serif text-2xl font-bold text-brand-pink">
                  {formatPrice(subtotal)}
                </span>
              </div>
            </div>

            <button
              onClick={() => setCheckoutModalOpen(true)}
              className="w-full py-4 px-6 bg-brand-pink hover:bg-brand-pink2 text-white font-semibold text-sm rounded-xl shadow-subtle hover:shadow-card flex items-center justify-center gap-2 transition-all"
            >
              <span>Proceed to WhatsApp Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="p-3.5 rounded-xl bg-cream-warm/60 border border-border-soft text-[11px] text-text-secondary space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-text-primary">
                <ShieldCheck className="w-4 h-4 text-brand-pink" />
                <span>Zero Risk WhatsApp Checkout</span>
              </div>
              <p>
                No credit cards or online payment credentials requested on this website. Our concierge verifies availability on WhatsApp before order confirmation.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Checkout Customer Details Modal */}
      <WhatsAppCheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
      />
    </div>
  );
}
