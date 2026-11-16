'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils/formatters';
import { useCart } from '@/lib/store/cart-store';
import { useWishlist } from '@/lib/store/wishlist-store';
import { QuickViewModal } from './QuickViewModal';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const activePrice = product.discount_price ?? product.price;
  const hasDiscount = product.discount_price !== null && product.discount_price < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discount_price!) / product.price) * 100)
    : 0;

  const primaryImage = product.images?.[0]?.image_path || '/images/logo.png';
  const secondaryImage = product.images?.[1]?.image_path || primaryImage;

  return (
    <>
      <div
        className="group relative bg-pure-white rounded-2xl border border-border-soft overflow-hidden shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-between"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Top Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
          {product.is_new_arrival && (
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-brand-pink rounded-full shadow-sm">
              New Arrival
            </span>
          )}
          {product.is_bestseller && (
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-text-primary bg-gold-light border border-gold-dark/40 rounded-full shadow-sm">
              Bestseller
            </span>
          )}
          {hasDiscount && (
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-brand-pink2 rounded-full shadow-sm">
              Save {discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Top Right Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleItem(product);
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            inWishlist
              ? 'bg-brand-pink text-white shadow-subtle'
              : 'bg-white/80 hover:bg-white text-text-primary hover:text-brand-pink shadow-sm'
          }`}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>

        {/* Product Image Area */}
        <Link href={`/product/${product.slug}`} prefetch={true} className="block relative aspect-square w-full overflow-hidden bg-cream-warm">
          <Image
            src={isHovered ? secondaryImage : primaryImage}
            alt={product.name}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Quick Action Overlay on Hover */}
          <div className="absolute inset-x-0 bottom-3 px-3 hidden sm:flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={(e) => {
                e.preventDefault();
                setQuickViewOpen(true);
              }}
              className="px-3.5 py-2 bg-pure-white/95 hover:bg-pure-white text-text-primary text-xs font-semibold rounded-xl shadow-card backdrop-blur-sm flex items-center gap-1.5 transition-transform hover:scale-105"
            >
              <Eye className="w-3.5 h-3.5 text-brand-pink" />
              <span>Quick View</span>
            </button>
          </div>
        </Link>

        {/* Product Info Section */}
        <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
          <div>
            <div className="flex items-center justify-between text-[11px] text-text-secondary font-mono mb-1">
              <span>{product.product_code}</span>
              {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
                <span className="text-amber-600 font-semibold">Only {product.stock_quantity} left</span>
              )}
            </div>

            <Link href={`/product/${product.slug}`} prefetch={true}>
              <h3 className="font-serif text-base sm:text-lg font-semibold text-text-primary hover:text-brand-pink transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>

            {product.material && (
              <p className="text-[11px] text-text-secondary mt-0.5 line-clamp-1">
                {product.material}
              </p>
            )}
          </div>

          {/* Price & Add to Cart button */}
          <div className="pt-3 mt-3 border-t border-border-soft/60 flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-base sm:text-lg font-bold text-brand-pink">
                  {formatPrice(activePrice)}
                </span>
                {hasDiscount && (
                  <span className="text-xs text-text-secondary line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => addItem(product, 1)}
              disabled={product.stock_quantity <= 0}
              className="p-2 sm:px-3 sm:py-2 bg-cream-warm hover:bg-brand-pink text-text-primary hover:text-white rounded-xl text-xs font-semibold border border-border-soft flex items-center gap-1.5 transition-all shadow-sm disabled:opacity-50"
              aria-label="Add to cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </>
  );
}
