import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getCategories, getCategoryBySlug, getProducts } from '@/lib/data/store-repository';
import { ProductCard } from '@/components/products/ProductCard';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';

interface CategoryPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  if (!category) {
    return { title: 'Category Not Found | Thanmay Collections' };
  }
  return {
    title: `${category.name} | Thanmay Collections`,
    description: category.description || `Explore exquisite handcrafted ${category.name} by Thanmay Collections.`,
    openGraph: {
      title: `${category.name} | Thanmay Collections`,
      description: category.description || '',
      images: category.image_url ? [{ url: category.image_url }] : [],
    },
  };
}

export const revalidate = 60;

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await getCategoryBySlug(params.slug);
  if (!category) {
    notFound();
  }

  const [allCategories, products] = await Promise.all([
    getCategories(),
    getProducts({ categoryId: category.id }),
  ]);

  return (
    <div className="space-y-10 sm:space-y-12 pb-16">
      {/* Category Hero Banner */}
      <div className="relative bg-gradient-to-r from-cream-warm via-cream-soft to-brand-pink8/40 border-b border-border-soft py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-text-secondary mb-4">
            <Link href="/" className="hover:text-brand-pink transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/shop" className="hover:text-brand-pink transition-colors">
              Shop
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-text-primary">{category.name}</span>
          </nav>

          <div className="max-w-2xl space-y-3">
            <span className="px-3 py-1 rounded-full bg-pure-white text-[11px] font-bold uppercase tracking-wider text-brand-pink shadow-sm inline-block">
              Curated Style
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-text-primary">
              {category.name}
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Category Pills Bar */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Link
            href="/shop"
            className="px-4 py-2 rounded-full border border-border-soft text-xs font-semibold whitespace-nowrap bg-pure-white text-text-primary hover:border-brand-pink"
          >
            All Jewellery
          </Link>
          {allCategories.map((c) => (
            <Link
              key={c.id}
              href={`/category/${c.slug}`}
              className={`px-4 py-2 rounded-full border text-xs font-semibold whitespace-nowrap transition-colors ${
                c.slug === params.slug
                  ? 'bg-brand-pink text-white border-brand-pink shadow-subtle'
                  : 'bg-pure-white text-text-primary border-border-soft hover:border-brand-pink'
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>

        {/* Product Grid */}
        <div>
          <div className="flex items-center justify-between mb-6 text-xs text-text-secondary">
            <span>
              Showing <strong className="text-text-primary">{products.length}</strong> creations in {category.name}
            </span>
            <Link href="/shop" className="hover:text-brand-pink font-semibold flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all collections</span>
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-pure-white border border-border-soft space-y-3">
              <h3 className="font-serif text-xl font-bold text-text-primary">New designs coming soon</h3>
              <p className="text-xs text-text-secondary max-w-sm mx-auto">
                Our artisans are currently crafting new {category.name}. Check back shortly or browse other categories.
              </p>
              <Link
                href="/shop"
                className="inline-block mt-2 px-5 py-2.5 bg-brand-pink text-white text-xs font-semibold rounded-full shadow-subtle"
              >
                Browse Shop All
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
