'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/store/cart-store';
import { formatPrice } from '@/lib/utils/formatters';
import { WhatsAppCheckoutModal } from './WhatsAppCheckoutModal';

export function CartDrawer() {
  const { items, removeItem, updateQuantity, clearCart, totalQuantity, subtotal, isOpen, setIsOpen } = useCart();
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-text-primary/50 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div className="w-screen max-w-md bg-pure-white shadow-2xl flex flex-col animate-fadeIn border-l border-border-soft">
            {/* Header */}
            <div className="p-5 border-b border-border-soft flex items-center justify-between bg-cream-warm/40">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-pink" />
                <h3 className="font-serif text-xl font-bold text-text-primary">
                  Shopping Bag ({totalQuantity})
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-text-secondary hover:text-text-primary hover:bg-pure-white transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-cream-warm flex items-center justify-center text-brand-pink">
                    <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-text-primary">Your bag is empty</h4>
                    <p className="text-xs text-text-secondary mt-1 max-w-xs">
                      Discover our exquisite collection of imitation jewellery and add your favourite pieces.
                    </p>
                  </div>
                  <Link
                    href="/shop"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-2.5 bg-brand-pink hover:bg-brand-pink2 text-white text-xs font-semibold rounded-full shadow-subtle transition-all"
                  >
                    Explore Collections
                  </Link>
                </div>
              ) : (
                items.map(({ product, quantity }) => {
                  const unitPrice = product.discount_price ?? product.price;
                  const lineTotal = unitPrice * quantity;
                  const imageSrc = product.images?.[0]?.image_path || '/images/logo.png';

                  return (
                    <div
                      key={product.id}
                      className="flex gap-4 p-3 rounded-xl border border-border-soft bg-pure-white hover:bg-cream-warm/30 transition-colors"
                    >
                      {/* Product Thumbnail */}
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-border-soft bg-cream-warm">
                        <Image
                          src={imageSrc}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-[10px] font-mono text-text-secondary uppercase">
                              {product.product_code}
                            </span>
                            <button
                              onClick={() => removeItem(product.id)}
                              className="text-text-secondary hover:text-red-600 transition-colors p-0.5"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <Link
                            href={`/product/${product.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="text-xs font-semibold text-text-primary hover:text-brand-pink line-clamp-1 transition-colors"
                          >
                            {product.name}
                          </Link>
                          <div className="text-xs font-semibold text-brand-pink mt-0.5">
                            {formatPrice(unitPrice)}
                          </div>
                        </div>

                        {/* Quantity controls & Line Total */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center border border-border-soft rounded-lg overflow-hidden bg-cream-warm">
                            <button
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="p-1 px-2 hover:bg-brand-pink8 text-text-primary transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-semibold text-text-primary">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="p-1 px-2 hover:bg-brand-pink8 text-text-primary transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="text-xs font-bold text-text-primary">
                            {formatPrice(lineTotal)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Summary */}
            {items.length > 0 && (
              <div className="p-5 border-t border-border-soft bg-cream-warm/40 space-y-3">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-text-secondary">
                    <span>Subtotal:</span>
                    <span className="font-semibold text-text-primary">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>Estimated Shipping:</span>
                    <span className="text-green-600 font-medium">Free (Standard)</span>
                  </div>
                  <div className="flex justify-between text-base font-serif font-bold text-text-primary pt-2 border-t border-border-soft">
                    <span>Total:</span>
                    <span className="text-brand-pink">{formatPrice(subtotal)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCheckoutModalOpen(true)}
                  className="w-full py-3.5 px-4 bg-brand-pink hover:bg-brand-pink2 text-white font-semibold rounded-xl shadow-subtle hover:shadow-card flex items-center justify-center gap-2 transition-all"
                >
                  <span>Proceed to WhatsApp Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={clearCart}
                    className="text-[11px] text-text-secondary hover:text-red-600 underline transition-colors"
                  >
                    Clear Bag
                  </button>
                  <Link
                    href="/cart"
                    onClick={() => setIsOpen(false)}
                    className="text-[11px] font-semibold text-brand-pink hover:underline"
                  >
                    View Full Cart Page &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* WhatsApp Checkout Customer Details Modal */}
      <WhatsAppCheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
      />
    </>
  );
}
