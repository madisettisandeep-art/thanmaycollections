'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Heart, ShoppingBag, MessageCircle, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils/formatters';
import { useCart } from '@/lib/store/cart-store';
import { useWishlist } from '@/lib/store/wishlist-store';
import { generateProductEnquiryUrl } from '@/lib/utils/whatsapp';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const inWishlist = isInWishlist(product.id);
  const activePrice = product.discount_price ?? product.price;
  const hasDiscount = product.discount_price !== null && product.discount_price < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discount_price!) / product.price) * 100)
    : 0;

  const images = product.images && product.images.length > 0
    ? product.images
    : [{ id: 'default', product_id: product.id, image_path: '/images/logo.png', alt_text: product.name, display_order: 1 }];

  const currentImage = images[selectedImageIndex] || images[0];

  const handleAddToCart = () => {
    addItem(product, quantity);
    onClose();
  };

  const whatsappInquiryUrl = generateProductEnquiryUrl({
    productName: product.name,
    productCode: product.product_code,
    price: activePrice,
    productUrl: `${typeof window !== 'undefined' ? window.location.origin : ''}/product/${product.slug}`,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-text-primary/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-pure-white rounded-3xl shadow-float border border-border-soft overflow-hidden z-10 max-h-[92vh] flex flex-col md:flex-row animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-pure-white/80 hover:bg-pure-white text-text-primary shadow-sm transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Gallery Left Column */}
        <div className="w-full md:w-1/2 p-6 bg-cream-warm/40 flex flex-col justify-between border-b md:border-b-0 md:border-r border-border-soft">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-pure-white border border-border-soft shadow-sm">
            <Image
              src={currentImage.image_path}
              alt={currentImage.alt_text || product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {hasDiscount && (
              <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold text-pure-white bg-brand-pink rounded-full shadow-sm">
                Save {discountPercent}%
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                    selectedImageIndex === idx ? 'border-brand-pink scale-105' : 'border-border-soft opacity-70'
                  }`}
                >
                  <Image src={img.image_path} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Right Column */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-text-secondary font-mono">
                <span>{product.product_code}</span>
                <span className={product.stock_quantity > 0 ? 'text-green-600 font-semibold' : 'text-red-500'}>
                  {product.stock_quantity > 0 ? `In Stock (${product.stock_quantity} left)` : 'Out of Stock'}
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-primary mt-1">
                {product.name}
              </h2>
            </div>

            {/* Price section */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-bold text-brand-pink">
                {formatPrice(activePrice)}
              </span>
              {hasDiscount && (
                <span className="text-base text-text-secondary line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed line-clamp-3">
              {product.description}
            </p>

            {/* Material & Occasion specifications */}
            <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-cream-warm/50 border border-border-soft text-xs">
              <div>
                <span className="text-text-secondary block font-medium">Material:</span>
                <span className="text-text-primary font-semibold">{product.material || 'Premium Brass & Gold Polish'}</span>
              </div>
              <div>
                <span className="text-text-secondary block font-medium">Occasion:</span>
                <span className="text-text-primary font-semibold">{product.occasion || 'Festive & Weddings'}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-6 space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-border-soft rounded-xl bg-cream-warm/50 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-sm font-semibold text-text-primary hover:text-brand-pink"
                >
                  -
                </button>
                <span className="px-3 text-sm font-bold text-text-primary">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock_quantity || 99, quantity + 1))}
                  className="px-3 py-1.5 text-sm font-semibold text-text-primary hover:text-brand-pink"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock_quantity <= 0}
                className="flex-1 py-3 px-4 bg-brand-pink hover:bg-brand-pink2 text-pure-white font-semibold text-sm rounded-xl shadow-subtle hover:shadow-card flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>

              {/* Wishlist Toggle */}
              <button
                onClick={() => toggleItem(product)}
                className={`p-3 rounded-xl border border-border-soft transition-colors ${
                  inWishlist ? 'bg-brand-pink text-pure-white border-brand-pink' : 'hover:bg-cream-warm text-text-primary'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* WhatsApp Direct Enquiry */}
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl border border-border-soft bg-pure-white hover:bg-cream-warm text-xs font-semibold text-text-primary flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-green-600" />
              <span>Ask about this piece on WhatsApp</span>
            </a>

            <div className="text-center pt-1">
              <Link
                href={`/product/${product.slug}`}
                onClick={onClose}
                className="text-xs font-semibold text-brand-pink hover:underline"
              >
                View full product page with all specifications &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
