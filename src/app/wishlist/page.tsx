'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Trash2, ArrowRight, ChevronRight, Share2 } from 'lucide-react';
import { useWishlist } from '@/lib/store/wishlist-store';
import { useCart } from '@/lib/store/cart-store';
import { formatPrice } from '@/lib/utils/formatters';

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();

  const handleMoveToBag = (product: typeof items[0]) => {
    addItem(product, 1);
    removeItem(product.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-text-secondary">
        <Link href="/" className="hover:text-brand-pink transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-text-primary">Saved Pieces</span>
      </nav>

      {/* Header */}
      <div>
        <span className="text-xs font-semibold text-brand-pink uppercase tracking-widest">
          Personal Curation
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary mt-1">
          My Wishlist ({items.length})
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary mt-1">
          Save your favourite bridal sets, kundan chokers, and jhumkas to review or purchase anytime.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="p-16 text-center rounded-3xl bg-pure-white border border-border-soft shadow-subtle space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-cream-warm mx-auto flex items-center justify-center text-brand-pink">
            <Heart className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-text-primary">Your wishlist is empty</h2>
          <p className="text-xs sm:text-sm text-text-secondary">
            Keep track of the imitation jewellery pieces you love by tapping the heart icon on any product.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-pink hover:bg-brand-pink2 text-white text-xs font-semibold rounded-full shadow-subtle transition-all"
            >
              <span>Discover Collections</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product) => {
            const activePrice = product.discount_price ?? product.price;
            const primaryImage = product.images?.[0]?.image_path || '/images/logo.png';

            return (
              <div
                key={product.id}
                className="group relative bg-pure-white rounded-2xl border border-border-soft overflow-hidden shadow-subtle hover:shadow-card transition-all flex flex-col justify-between"
              >
                {/* Remove button */}
                <button
                  onClick={() => removeItem(product.id)}
                  className="absolute top-3 right-3 z-10 p-2 rounded-full bg-pure-white/90 hover:bg-pure-white text-text-secondary hover:text-red-600 shadow-sm transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* Thumbnail */}
                <Link href={`/product/${product.slug}`} className="block relative aspect-square bg-cream-warm overflow-hidden">
                  <Image
                    src={primaryImage}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                {/* Info */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[10px] font-mono text-text-secondary uppercase">
                      {product.product_code}
                    </span>
                    <Link
                      href={`/product/${product.slug}`}
                      className="block font-serif text-base font-bold text-text-primary hover:text-brand-pink line-clamp-1 transition-colors mt-0.5"
                    >
                      {product.name}
                    </Link>
                    <div className="text-sm font-bold text-brand-pink mt-1">
                      {formatPrice(activePrice)}
                    </div>
                  </div>

                  {/* Move to bag button */}
                  <div className="pt-4 mt-3 border-t border-border-soft">
                    <button
                      onClick={() => handleMoveToBag(product)}
                      disabled={product.stock_quantity <= 0}
                      className="w-full py-2.5 px-3 bg-brand-pink hover:bg-brand-pink2 text-white font-semibold text-xs rounded-xl shadow-subtle flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
