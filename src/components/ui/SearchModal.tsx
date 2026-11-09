'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight } from 'lucide-react';
import { INITIAL_PRODUCTS } from '@/lib/data/mock-data';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils/formatters';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = INITIAL_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.product_code.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.material && p.material.toLowerCase().includes(q))
    );
    setResults(filtered.slice(0, 6));
  }, [query]);

  // Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-text-primary/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-pure-white rounded-2xl shadow-float border border-border-soft overflow-hidden z-10 animate-fadeIn">
        {/* Search input header */}
        <div className="p-4 sm:p-5 border-b border-border-soft flex items-center gap-3">
          <Search className="w-5 h-5 text-brand-pink flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search necklace sets, jhumkas, bridal haars, bangles..."
            autoFocus
            className="w-full text-base sm:text-lg bg-transparent text-text-primary placeholder:text-text-secondary focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-text-secondary hover:text-text-primary p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs uppercase tracking-wider font-semibold text-text-secondary hover:text-brand-pink px-2 py-1"
          >
            Esc
          </button>
        </div>

        {/* Live results list */}
        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-border-soft">
          {query && results.length === 0 && (
            <div className="text-center py-10 text-text-secondary text-sm">
              No jewellery pieces found matching &ldquo;<span className="font-semibold text-text-primary">{query}</span>&rdquo;.
              <div className="mt-2 text-xs">Try searching by category, e.g. &ldquo;Kundan&rdquo;, &ldquo;Earrings&rdquo;, &ldquo;Temple&rdquo;</div>
            </div>
          )}

          {!query && (
            <div className="py-4 text-xs text-text-secondary">
              <span className="font-semibold uppercase tracking-wider text-text-primary">Popular Searches:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {['Padmavati Choker', 'Kundan Jhumkas', 'Lakshmi Haar', 'Bridal Set', 'Openable Kada'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1 bg-cream-warm hover:bg-brand-pink8 text-text-primary hover:text-brand-pink rounded-full border border-border-soft transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.map((product) => {
            const activePrice = product.discount_price ?? product.price;
            const primaryImage = product.images?.[0]?.image_path || '/images/logo.png';

            return (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                onClick={onClose}
                className="flex items-center gap-4 py-3 group hover:bg-cream-warm/50 px-2 rounded-xl transition-colors"
              >
                <div className="relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden border border-border-soft bg-cream-warm">
                  <Image
                    src={primaryImage}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-text-secondary font-mono">{product.product_code}</div>
                  <h4 className="text-sm font-semibold text-text-primary group-hover:text-brand-pink truncate transition-colors">
                    {product.name}
                  </h4>
                  <div className="text-xs text-brand-pink font-semibold">
                    {formatPrice(activePrice)}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-text-secondary group-hover:text-brand-pink group-hover:translate-x-1 transition-all" />
              </Link>
            );
          })}
        </div>

        {results.length > 0 && (
          <div className="p-3 bg-cream-warm/40 border-t border-border-soft text-center">
            <Link
              href={`/shop?search=${encodeURIComponent(query)}`}
              onClick={onClose}
              className="text-xs font-semibold text-brand-pink hover:text-brand-pink2 tracking-wide inline-flex items-center gap-1"
            >
              View all results in Shop &rarr;
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
