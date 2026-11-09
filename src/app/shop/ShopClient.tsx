'use client';

import React, { useState, useMemo } from 'react';
import { Category, Product } from '@/types';
import { ProductCard } from '@/components/products/ProductCard';
import { Search, SlidersHorizontal, RotateCcw, X, Check } from 'lucide-react';

interface ShopClientProps {
  initialCategories: Category[];
  initialProducts: Product[];
  initialSearch?: string;
  initialCategory?: string;
  initialSort?: string;
}

export function ShopClient({
  initialCategories,
  initialProducts,
  initialSearch = '',
  initialCategory = '',
  initialSort = 'newest',
}: ShopClientProps) {
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState(initialSort);
  const [priceRange, setPriceRange] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const occasions = [
    'Weddings & Receptions',
    'Festivals & Traditional Ceremonies',
    'Sangeet & Festive Parties',
    'Daily Office & Casual Elegance',
  ];

  const filteredProducts = useMemo(() => {
    let list = [...initialProducts];

    // Search query
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.product_code.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.material && p.material.toLowerCase().includes(q))
      );
    }

    // Category
    if (selectedCategory && selectedCategory !== 'all') {
      list = list.filter((p) => p.category_id === selectedCategory || p.category?.slug === selectedCategory);
    }

    // In Stock Only
    if (inStockOnly) {
      list = list.filter((p) => p.stock_quantity > 0);
    }

    // Occasion
    if (selectedOccasion !== 'all') {
      list = list.filter((p) => p.occasion?.toLowerCase().includes(selectedOccasion.toLowerCase()));
    }

    // Price range
    if (priceRange === 'under-1500') {
      list = list.filter((p) => (p.discount_price ?? p.price) < 1500);
    } else if (priceRange === '1500-3000') {
      list = list.filter((p) => {
        const pr = p.discount_price ?? p.price;
        return pr >= 1500 && pr <= 3000;
      });
    } else if (priceRange === '3000-5000') {
      list = list.filter((p) => {
        const pr = p.discount_price ?? p.price;
        return pr >= 3000 && pr <= 5000;
      });
    } else if (priceRange === 'above-5000') {
      list = list.filter((p) => (p.discount_price ?? p.price) > 5000);
    }

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => (a.discount_price ?? a.price) - (b.discount_price ?? b.price));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => (b.discount_price ?? b.price) - (a.discount_price ?? a.price));
    } else if (sortBy === 'popularity') {
      list.sort((a, b) => (b.is_bestseller ? 1 : 0) - (a.is_bestseller ? 1 : 0));
    }

    return list;
  }, [initialProducts, search, selectedCategory, inStockOnly, selectedOccasion, priceRange, sortBy]);

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setPriceRange('all');
    setInStockOnly(false);
    setSelectedOccasion('all');
    setSortBy('newest');
  };

  const hasActiveFilters =
    Boolean(search) ||
    Boolean(selectedCategory) ||
    priceRange !== 'all' ||
    inStockOnly ||
    selectedOccasion !== 'all';

  return (
    <div className="space-y-6">
      {/* Top Search & Controls Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-pure-white border border-border-soft shadow-subtle">
        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, code or stone..."
            className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-xl border border-border-soft bg-cream-warm/30 focus:outline-none focus:border-brand-pink transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Controls right */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden px-3.5 py-2 rounded-xl border border-border-soft bg-cream-warm/40 text-xs font-semibold text-text-primary flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-4 h-4 text-brand-pink" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-brand-pink ml-1" />
            )}
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-text-secondary hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 text-xs font-semibold rounded-xl border border-border-soft bg-pure-white text-text-primary focus:outline-none focus:border-brand-pink cursor-pointer"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="popularity">Most Popular</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="hidden lg:flex items-center gap-1 text-xs text-text-secondary hover:text-brand-pink transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6 p-6 rounded-2xl bg-pure-white border border-border-soft shadow-subtle">
          <div className="flex items-center justify-between pb-3 border-b border-border-soft">
            <h3 className="font-serif text-lg font-bold text-text-primary">Filters</h3>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-brand-pink hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            )}
          </div>

          {/* Categories Filter */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider">
              Categories
            </h4>
            <div className="space-y-1 text-xs">
              <button
                onClick={() => setSelectedCategory('')}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                  !selectedCategory
                    ? 'bg-brand-pink8 text-brand-pink font-semibold'
                    : 'text-text-secondary hover:bg-cream-warm hover:text-text-primary'
                }`}
              >
                <span>All Categories</span>
                {!selectedCategory && <Check className="w-3.5 h-3.5" />}
              </button>
              {initialCategories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                    selectedCategory === c.id
                      ? 'bg-brand-pink8 text-brand-pink font-semibold'
                      : 'text-text-secondary hover:bg-cream-warm hover:text-text-primary'
                  }`}
                >
                  <span>{c.name}</span>
                  {selectedCategory === c.id && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2 pt-3 border-t border-border-soft">
            <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider">
              Price Range
            </h4>
            <div className="space-y-1 text-xs">
              {[
                { label: 'All Prices', val: 'all' },
                { label: 'Under ₹1,500', val: 'under-1500' },
                { label: '₹1,500 - ₹3,000', val: '1500-3000' },
                { label: '₹3,000 - ₹5,000', val: '3000-5000' },
                { label: 'Above ₹5,000', val: 'above-5000' },
              ].map((p) => (
                <button
                  key={p.val}
                  onClick={() => setPriceRange(p.val)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                    priceRange === p.val
                      ? 'bg-brand-pink8 text-brand-pink font-semibold'
                      : 'text-text-secondary hover:bg-cream-warm hover:text-text-primary'
                  }`}
                >
                  <span>{p.label}</span>
                  {priceRange === p.val && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Occasion Filter */}
          <div className="space-y-2 pt-3 border-t border-border-soft">
            <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider">
              Occasion
            </h4>
            <div className="space-y-1 text-xs">
              <button
                onClick={() => setSelectedOccasion('all')}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                  selectedOccasion === 'all'
                    ? 'bg-brand-pink8 text-brand-pink font-semibold'
                    : 'text-text-secondary hover:bg-cream-warm hover:text-text-primary'
                }`}
              >
                <span>All Occasions</span>
                {selectedOccasion === 'all' && <Check className="w-3.5 h-3.5" />}
              </button>
              {occasions.map((occ) => (
                <button
                  key={occ}
                  onClick={() => setSelectedOccasion(occ)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                    selectedOccasion === occ
                      ? 'bg-brand-pink8 text-brand-pink font-semibold'
                      : 'text-text-secondary hover:bg-cream-warm hover:text-text-primary'
                  }`}
                >
                  <span className="truncate">{occ}</span>
                  {selectedOccasion === occ && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="pt-3 border-t border-border-soft">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-text-primary">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded border-border-soft text-brand-pink focus:ring-brand-pink"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-3 space-y-6">
          <div className="text-xs text-text-secondary flex justify-between items-center">
            <span>Showing <strong className="text-text-primary">{filteredProducts.length}</strong> creations</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-pure-white border border-border-soft space-y-4">
              <div className="w-12 h-12 rounded-full bg-cream-warm mx-auto flex items-center justify-center text-brand-pink">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-text-primary">No designs found</h3>
              <p className="text-xs text-text-secondary max-w-sm mx-auto">
                We couldn&rsquo;t find any jewellery pieces matching your selected filters. Try resetting the criteria.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2 bg-brand-pink hover:bg-brand-pink2 text-pure-white text-xs font-semibold rounded-full shadow-subtle"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-text-primary/50 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-pure-white shadow-xl h-full flex flex-col z-10 p-5 overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-border-soft">
              <h3 className="font-serif text-lg font-bold text-text-primary">Filter Jewellery</h3>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-1">
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            </div>

            <div className="space-y-6 py-4 flex-1">
              {/* Category */}
              <div>
                <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
                  Category
                </h4>
                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => {
                      setSelectedCategory('');
                      setMobileFiltersOpen(false);
                    }}
                    className="w-full text-left py-1 text-text-secondary hover:text-brand-pink"
                  >
                    All Categories
                  </button>
                  {initialCategories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedCategory(c.id);
                        setMobileFiltersOpen(false);
                      }}
                      className="w-full text-left py-1 text-text-secondary hover:text-brand-pink"
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
                  Price
                </h4>
                <div className="space-y-1 text-xs">
                  {['all', 'under-1500', '1500-3000', '3000-5000', 'above-5000'].map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        setPriceRange(p);
                        setMobileFiltersOpen(false);
                      }}
                      className="w-full text-left py-1 text-text-secondary hover:text-brand-pink"
                    >
                      {p === 'all' ? 'All Prices' : p.replace('-', ' to ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border-soft">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full py-3 bg-brand-pink text-pure-white text-xs font-semibold rounded-xl"
              >
                Apply Filters ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
