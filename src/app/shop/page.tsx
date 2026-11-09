import React from 'react';
import { getCategories, getProducts } from '@/lib/data/store-repository';
import { ShopClient } from './ShopClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop All Collections | Premium Imitation Jewellery',
  description: 'Explore our complete catalogue of premium imitation jewellery: Kundan chokers, temple haars, jhumkas, bridal trousseau sets, and kadas.',
};

export const revalidate = 60;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const initialSearch = typeof searchParams.search === 'string' ? searchParams.search : '';
  const initialCategory = typeof searchParams.category === 'string' ? searchParams.category : '';
  const initialSort = typeof searchParams.sort === 'string' ? searchParams.sort : 'newest';
  const filterParam = typeof searchParams.filter === 'string' ? searchParams.filter : '';

  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({
      newArrival: filterParam === 'new' ? true : undefined,
      bestseller: filterParam === 'bestseller' ? true : undefined,
    }),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-semibold text-brand-pink uppercase tracking-widest">
          Complete Catalogue
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-text-primary mt-1">
          {filterParam === 'new' ? 'New Arrivals Collection' : 'All Jewellery Collections'}
        </h1>
        <div className="w-16 h-0.5 bg-brand-pink mx-auto mt-3 rounded-full" />
        <p className="text-xs sm:text-sm text-text-secondary mt-3">
          Handcrafted imitation jewellery celebrating India&rsquo;s regal heritage, festivals, and bridal ceremonies.
        </p>
      </div>

      <ShopClient
        initialCategories={categories}
        initialProducts={products}
        initialSearch={initialSearch}
        initialCategory={initialCategory}
        initialSort={initialSort}
      />
    </div>
  );
}
