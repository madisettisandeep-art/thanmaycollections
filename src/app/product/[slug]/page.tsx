import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Shield, Droplets, Sun, Package } from 'lucide-react';
import { getProductBySlug, getProducts } from '@/lib/data/store-repository';
import { ProductDetailClient } from './ProductDetailClient';
import { ProductCard } from '@/components/products/ProductCard';
import { Metadata } from 'next';

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return { title: 'Product Not Found | Thanmay Collections' };
  }

  const activePrice = product.discount_price ?? product.price;
  const primaryImage = product.images?.[0]?.image_path || '/images/logo.png';

  return {
    title: `${product.name} | Thanmay Collections`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Thanmay Collections`,
      description: product.description,
      images: [{ url: primaryImage }],
    },
    other: {
      'product:price:amount': activePrice.toString(),
      'product:price:currency': 'INR',
    },
  };
}

export const revalidate = 60;

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    notFound();
  }

  // Fetch related products in the same category
  const relatedProducts = await getProducts({
    categoryId: product.category_id || undefined,
  });

  const activePrice = product.discount_price ?? product.price;
  const primaryImage = product.images?.[0]?.image_path || 'https://thanmaycollections.com/images/logo.png';

  const productJsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: [primaryImage],
    description: product.description,
    sku: product.product_code,
    mpn: product.product_code,
    brand: {
      '@type': 'Brand',
      name: 'Thanmay Collections',
    },
    offers: {
      '@type': 'Offer',
      url: `https://thanmaycollections.com/product/${product.slug}`,
      priceCurrency: 'INR',
      price: activePrice,
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.stock_quantity > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  };

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://thanmaycollections.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Shop',
        item: 'https://thanmaycollections.com/shop',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: `https://thanmaycollections.com/product/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-text-secondary">
          <Link href="/" className="hover:text-brand-pink transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/shop" className="hover:text-brand-pink transition-colors">
            Shop
          </Link>
          {product.category && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href={`/category/${product.category.slug}`} className="hover:text-brand-pink transition-colors">
                {product.category.name}
              </Link>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-text-primary truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Interactive Client Component */}
        <ProductDetailClient product={product} />

        {/* Jewellery Care Guide Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-cream-warm/60 border border-border-soft space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-brand-pink" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-text-primary">
              Thanmay Jewellery Care Guidelines
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-text-secondary">
            Keep your Thanmay Collections imitation jewellery glowing with enduring luster for years by observing these essential artisan guidelines:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-pure-white border border-border-soft flex items-start gap-3">
              <Droplets className="w-4 h-4 text-brand-pink flex-shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-semibold text-text-primary block">Avoid Liquids</span>
                <span className="text-text-secondary">Apply perfumes, lotions and hairsprays before wearing jewellery.</span>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-pure-white border border-border-soft flex items-start gap-3">
              <Sun className="w-4 h-4 text-brand-pink flex-shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-semibold text-text-primary block">Store Dry</span>
                <span className="text-text-secondary">Keep in zip-lock pouches or the velvet box provided. Avoid humidity.</span>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-pure-white border border-border-soft flex items-start gap-3">
              <Shield className="w-4 h-4 text-brand-pink flex-shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-semibold text-text-primary block">Gentle Cleaning</span>
                <span className="text-text-secondary">Wipe gently with a dry, soft cotton or microfiber cloth after each wear.</span>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-pure-white border border-border-soft flex items-start gap-3">
              <Package className="w-4 h-4 text-brand-pink flex-shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-semibold text-text-primary block">Separate Storage</span>
                <span className="text-text-secondary">Store pieces individually to prevent stone scratching and entangling.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 1 && (
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-brand-pink uppercase tracking-widest">
                  Pairing Suggestions
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-primary mt-0.5">
                  You May Also Admire
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-xs font-semibold text-brand-pink hover:text-brand-pink2 underline"
              >
                View all &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts
                .filter((p) => p.id !== product.id)
                .slice(0, 4)
                .map((rel) => (
                  <ProductCard key={rel.id} product={rel} />
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
