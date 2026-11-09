'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Heart,
  ShoppingBag,
  Send,
  MessageCircle,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Maximize2,
  X,
  Share2,
  Check,
} from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils/formatters';
import { useCart } from '@/lib/store/cart-store';
import { useWishlist } from '@/lib/store/wishlist-store';
import { generateProductEnquiryUrl } from '@/lib/utils/whatsapp';
import { WhatsAppCheckoutModal } from '@/components/cart/WhatsAppCheckoutModal';

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const activePrice = product.discount_price ?? product.price;
  const hasDiscount = product.discount_price !== null && product.discount_price < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discount_price!) / product.price) * 100)
    : 0;

  const images = product.images && product.images.length > 0
    ? product.images
    : [{ id: 'def', product_id: product.id, image_path: '/images/logo.png', alt_text: product.name, display_order: 1 }];

  const currentImage = images[selectedImageIndex] || images[0];

  const handleBuyNow = () => {
    addItem(product, quantity);
    setCheckoutModalOpen(true);
  };

  const handleShare = async () => {
    if (typeof window !== 'undefined') {
      try {
        if (navigator.share) {
          await navigator.share({
            title: product.name,
            text: `Check out ${product.name} on Thanmay Collections!`,
            url: window.location.href,
          });
        } else {
          await navigator.clipboard.writeText(window.location.href);
          setCopiedShare(true);
          setTimeout(() => setCopiedShare(false), 2500);
        }
      } catch {
        // User aborted share
      }
    }
  };

  const enquiryUrl = generateProductEnquiryUrl({
    productName: product.name,
    productCode: product.product_code,
    price: activePrice,
    productUrl: typeof window !== 'undefined' ? window.location.href : '',
  });

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* =========================================================================
            LEFT COLUMN: GALLERY & ZOOM
            ========================================================================= */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Display Image */}
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-cream-warm border border-border-soft shadow-subtle group">
            <Image
              src={currentImage.image_path}
              alt={currentImage.alt_text || product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
              {product.is_new_arrival && (
                <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-pure-white bg-brand-pink rounded-full shadow-sm">
                  New Arrival
                </span>
              )}
              {hasDiscount && (
                <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-pure-white bg-brand-pink2 rounded-full shadow-sm">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={() => setFullscreenImage(currentImage.image_path)}
              className="absolute bottom-4 right-4 p-2.5 rounded-full bg-pure-white/90 hover:bg-pure-white text-text-primary shadow-sm backdrop-blur-sm transition-all"
              aria-label="View fullscreen image"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnails row */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                    selectedImageIndex === idx
                      ? 'border-brand-pink ring-2 ring-brand-pink8 scale-105'
                      : 'border-border-soft opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img.image_path} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* =========================================================================
            RIGHT COLUMN: DETAILS & ACTIONS
            ========================================================================= */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header & Product Code */}
          <div>
            <div className="flex items-center justify-between text-xs text-text-secondary font-mono mb-2">
              <span>SKU: {product.product_code}</span>
              <span className={product.stock_quantity > 0 ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold'}>
                {product.stock_quantity > 0 ? `In Stock (${product.stock_quantity} available)` : 'Out of Stock'}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary leading-tight">
              {product.name}
            </h1>

            {product.category && (
              <Link
                href={`/category/${product.category.slug}`}
                className="inline-block text-xs font-semibold text-brand-pink hover:underline mt-1"
              >
                Collection: {product.category.name}
              </Link>
            )}
          </div>

          {/* Price Block */}
          <div className="p-4 rounded-2xl bg-cream-warm/50 border border-border-soft flex items-baseline gap-3">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-brand-pink">
              {formatPrice(activePrice)}
            </span>
            {hasDiscount && (
              <span className="text-lg text-text-secondary line-through">
                {formatPrice(product.price)}
              </span>
            )}
            <span className="text-xs text-text-secondary ml-auto">Inclusive of all taxes</span>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-text-primary uppercase tracking-wider">
              Artisan Description
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Product Specifications Table */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-text-primary uppercase tracking-wider">
              Piece Specifications
            </h3>
            <div className="divide-y divide-border-soft rounded-2xl border border-border-soft bg-pure-white text-xs">
              <div className="p-3 flex justify-between">
                <span className="text-text-secondary font-medium">Material Base</span>
                <span className="text-text-primary font-semibold">{product.material || 'Brass Alloy'}</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-text-secondary font-medium">Plating / Finish</span>
                <span className="text-text-primary font-semibold">24K Micron Gold Dip with Anti-Tarnish Coat</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-text-secondary font-medium">Best Suited For</span>
                <span className="text-text-primary font-semibold">{product.occasion || 'Weddings & Celebrations'}</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-text-secondary font-medium">Stone Setting</span>
                <span className="text-text-primary font-semibold">Uncut Polki Kundan & Hand-strung Pearls</span>
              </div>
            </div>
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity Selector */}
              <div className="flex items-center border border-border-soft rounded-xl bg-cream-warm/50 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-sm font-semibold text-text-primary hover:text-brand-pink"
                >
                  -
                </button>
                <span className="px-3 text-sm font-bold text-text-primary">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock_quantity || 99, quantity + 1))}
                  className="px-3 py-2 text-sm font-semibold text-text-primary hover:text-brand-pink"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => addItem(product, quantity)}
                disabled={product.stock_quantity <= 0}
                className="flex-1 py-3.5 px-4 bg-brand-pink hover:bg-brand-pink2 text-pure-white font-semibold text-sm rounded-xl shadow-subtle hover:shadow-card flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleItem(product)}
                className={`p-3.5 rounded-xl border border-border-soft transition-colors ${
                  inWishlist ? 'bg-brand-pink text-pure-white border-brand-pink' : 'hover:bg-cream-warm text-text-primary'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Buy Now (Direct WhatsApp Checkout) */}
            <button
              onClick={handleBuyNow}
              disabled={product.stock_quantity <= 0}
              className="w-full py-3.5 px-4 bg-text-primary hover:bg-black text-pure-white font-semibold text-sm rounded-xl shadow-subtle flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>Buy Now via WhatsApp ({formatPrice(activePrice * quantity)})</span>
            </button>

            {/* Direct WhatsApp Enquiry */}
            <a
              href={enquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl border border-border-soft bg-pure-white hover:bg-cream-warm text-xs font-semibold text-text-primary flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-green-600" />
              <span>Ask a question about this piece on WhatsApp</span>
            </a>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="w-full py-2 text-xs text-text-secondary hover:text-brand-pink flex items-center justify-center gap-1.5 transition-colors"
            >
              {copiedShare ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-green-600">Link copied to clipboard!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share this piece with friends or family</span>
                </>
              )}
            </button>
          </div>

          {/* Delivery & Assurance Info */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border-soft text-xs">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-cream-warm/40 border border-border-soft">
              <Truck className="w-4 h-4 text-brand-pink flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-text-primary block">Pan-India Dispatch</span>
                <span className="text-text-secondary text-[11px]">Dispatches in 24-48 hrs in velvet box packaging</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-cream-warm/40 border border-border-soft">
              <ShieldCheck className="w-4 h-4 text-brand-pink flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-text-primary block">Authentic Quality</span>
                <span className="text-text-secondary text-[11px]">Exact reproduction of real gold & polki designs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative w-full max-w-4xl h-[85vh]">
            <Image src={fullscreenImage} alt="" fill className="object-contain" />
          </div>
        </div>
      )}

      {/* WhatsApp Checkout Modal */}
      <WhatsAppCheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
      />
    </>
  );
}
