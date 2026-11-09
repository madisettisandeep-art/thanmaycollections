import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Heart, ShieldCheck, Star, Instagram, ChevronRight } from 'lucide-react';
import { getCategories, getProducts } from '@/lib/data/store-repository';
import { ProductCard } from '@/components/products/ProductCard';
import { TESTIMONIALS, INSTAGRAM_POSTS } from '@/lib/data/mock-data';

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage() {
  const [categories, featuredProducts, newArrivals, bestsellers] = await Promise.all([
    getCategories(),
    getProducts({ featured: true }),
    getProducts({ newArrival: true }),
    getProducts({ bestseller: true }),
  ]);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* =========================================================================
          SECTION 3: HERO SECTION
          ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cream-warm via-cream-soft to-cream-ivory pt-8 pb-16 sm:py-24 border-b border-border-soft">
        {/* Soft background ambient blush circles */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-pink8/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-gold-light/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-pink8/60 border border-brand-pink6 text-xs sm:text-sm font-medium text-text-primary">
                <Sparkles className="w-4 h-4 text-brand-pink" />
                <span className="tracking-wide">Bespoke Heritage & Bridal Imitation Jewellery</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-bold text-text-primary tracking-tight leading-[1.1]">
                Elegance that <br className="hidden sm:inline" />
                <span className="text-pink-gradient font-editorial italic font-normal">
                  celebrates tradition.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto lg:mx-0">
                Discover timeless jewellery that brings beauty, tradition and elegance together. Handcrafted royal kundan choker sets, temple haar masterpieces, and anti-tarnish daily wear.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto px-8 py-4 bg-brand-pink hover:bg-brand-pink2 text-pure-white font-semibold text-sm rounded-full shadow-subtle hover:shadow-card flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  <span>Explore Collections</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/shop?sort=newest"
                  className="w-full sm:w-auto px-8 py-4 bg-pure-white hover:bg-cream-warm text-text-primary font-semibold text-sm rounded-full border border-border-soft hover:border-brand-pink4 flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <span>Shop New Arrivals</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-border-soft/80 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-text-primary">24K</div>
                  <div className="text-xs text-text-secondary">Micro Gold Polish</div>
                </div>
                <div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-text-primary">100%</div>
                  <div className="text-xs text-text-secondary">Artisanal Kundan</div>
                </div>
                <div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-text-primary">Direct</div>
                  <div className="text-xs text-text-secondary">WhatsApp Concierge</div>
                </div>
              </div>
            </div>

            {/* Right Editorial Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main luxury editorial portrait */}
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-pure-white">
                  <Image
                    src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85"
                    alt="Indian model wearing Thanmay Collections Royal Kundan Choker Set"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                  {/* Subtle inner champagne gold vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-text-primary/40 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-pure-white/90 backdrop-blur-md border border-border-soft shadow-lg">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-brand-pink font-semibold">
                      Featured Masterpiece
                    </span>
                    <h3 className="font-serif text-base font-bold text-text-primary">
                      Padmavati Royal Kundan Choker
                    </h3>
                    <div className="flex items-center justify-between text-xs mt-1">
                      <span className="text-text-secondary">Hand-set Uncut Polki & Emerald Drops</span>
                      <span className="text-brand-pink font-bold">₹3,999</span>
                    </div>
                  </div>
                </div>

                {/* Floating decorative badge */}
                <div className="absolute -top-4 -left-4 sm:-left-6 p-3 rounded-2xl bg-pure-white/95 backdrop-blur-md shadow-card border border-border-soft flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-pink8 flex items-center justify-center text-brand-pink">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-text-primary">Heritage Finish</div>
                    <div className="text-[10px] text-text-secondary">Skin-Safe & Nickel-Free</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: SHOP BY CATEGORY
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold text-brand-pink uppercase tracking-widest">
            Artisanal Categories
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary mt-1">
            Shop by Category
          </h2>
          <div className="w-16 h-0.5 bg-brand-pink mx-auto mt-3 rounded-full" />
          <p className="text-xs sm:text-sm text-text-secondary mt-3">
            Explore our curated departments ranging from grand bridal trousseau sets to delicate everyday wristwear.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden border border-border-soft bg-pure-white shadow-subtle hover:shadow-card transition-all duration-300 aspect-[3/4] flex flex-col justify-end p-5"
            >
              <Image
                src={cat.image_url || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-text-primary/80 via-text-primary/20 to-transparent group-hover:from-text-primary/90 transition-colors" />

              <div className="relative z-10 text-pure-white">
                <h3 className="font-serif text-lg sm:text-xl font-bold tracking-wide group-hover:text-brand-pink8 transition-colors">
                  {cat.name}
                </h3>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-cream-warm group-hover:translate-x-1 transition-transform mt-1">
                  <span>Explore Pieces</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: NEW ARRIVALS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold text-brand-pink uppercase tracking-widest">
              Fresh In Store
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary mt-1">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/shop?filter=new"
            className="text-xs sm:text-sm font-semibold text-brand-pink hover:text-brand-pink2 flex items-center gap-1.5 transition-colors"
          >
            <span>View All New Pieces</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: BESTSELLERS
          ========================================================================= */}
      <section className="bg-cream-warm/60 py-16 border-y border-border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-brand-pink uppercase tracking-widest">
              Most Loved Pieces
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary mt-1">
              Thanmay Bestsellers
            </h2>
            <div className="w-16 h-0.5 bg-brand-pink mx-auto mt-3 rounded-full" />
            <p className="text-xs sm:text-sm text-text-secondary mt-3">
              Cherished by brides and jewellery connoisseurs across India for exquisite detailing and authentic royal finish.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7 & 8: BRIDAL SPOTLIGHT & FEATURED COLLECTIONS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bridal Banner */}
          <div className="relative rounded-3xl overflow-hidden bg-brand-pink8/40 border border-border-soft p-8 sm:p-12 flex flex-col justify-between min-h-[420px] shadow-card">
            <div className="relative z-10 space-y-3 max-w-md">
              <span className="px-3 py-1 rounded-full bg-pure-white text-[11px] font-bold uppercase tracking-wider text-brand-pink shadow-sm inline-block">
                Royal Bridal Trousseau
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary">
                A Grand Celebration of Bridal Royalty
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Step into your wedding day with handcrafted grandeur. Complete 7-piece trousseau sets including rani haar, choker, maang tikka, nath, and hathphool.
              </p>
              <div className="pt-2">
                <Link
                  href="/category/bridal-jewellery"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-pink hover:bg-brand-pink2 text-pure-white text-xs font-semibold rounded-full shadow-subtle transition-all"
                >
                  <span>Explore Bridal Trousseau</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-30 lg:opacity-60 pointer-events-none">
              <Image
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80"
                alt="Bridal Jewellery"
                fill
                className="object-cover object-left"
              />
            </div>
          </div>

          {/* Temple Heritage Banner */}
          <div className="relative rounded-3xl overflow-hidden bg-gold-light/40 border border-gold-dark/30 p-8 sm:p-12 flex flex-col justify-between min-h-[420px] shadow-card">
            <div className="relative z-10 space-y-3 max-w-md">
              <span className="px-3 py-1 rounded-full bg-pure-white text-[11px] font-bold uppercase tracking-wider text-gold-dark shadow-sm inline-block">
                South Indian Heritage
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary">
                Intricate Deity Carvings & Antique Matte Gold
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Recreating the hallowed beauty of South Indian temple art with Goddess Lakshmi and peacock motifs in antique matte gold finish.
              </p>
              <div className="pt-2">
                <Link
                  href="/category/temple-jewellery"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-text-primary hover:bg-black text-pure-white text-xs font-semibold rounded-full shadow-subtle transition-all"
                >
                  <span>Discover Temple Jewellery</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-30 lg:opacity-60 pointer-events-none">
              <Image
                src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80"
                alt="Temple Jewellery"
                fill
                className="object-cover object-left"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: SPECIAL OCCASION JEWELLERY
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold text-brand-pink uppercase tracking-widest">
            Curated Occasions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary mt-1">
            Jewellery for Every Occasion
          </h2>
          <div className="w-16 h-0.5 bg-brand-pink mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { title: 'Weddings', desc: 'Grand Chokers & Haars', filter: 'Weddings', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80' },
            { title: 'Festivals', desc: 'Temple & Kasu Malas', filter: 'Festivals', img: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=600&q=80' },
            { title: 'Sangeet & Parties', desc: 'Meenakari Jhumkas', filter: 'Parties', img: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80' },
            { title: 'Pujas & Ceremonies', desc: 'Antique Gold Kadas', filter: 'Traditional', img: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=600&q=80' },
            { title: 'Everyday Styling', desc: 'Anti-Tarnish Minimal', filter: 'Daily', img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80' },
          ].map((item) => (
            <Link
              key={item.title}
              href={`/shop?search=${encodeURIComponent(item.filter)}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-cream-warm border border-border-soft shadow-subtle hover:shadow-card transition-all"
            >
              <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-text-primary/80 via-text-primary/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-pure-white">
                <h4 className="font-serif text-base font-bold group-hover:text-brand-pink8 transition-colors">
                  {item.title}
                </h4>
                <p className="text-[10px] text-cream-warm">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: INSTAGRAM GALLERY
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 text-brand-pink text-xs font-semibold uppercase tracking-wider mb-1">
            <Instagram className="w-4 h-4" />
            <span>@newthanmay_collections</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary">
            Follow Our Jewellery Journey
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-2">
            Connect with us on Instagram for daily styling inspiration, bride of the month features, and new design reveals.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={post.post_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden border border-border-soft bg-cream-warm shadow-subtle hover:shadow-card transition-all"
            >
              <Image
                src={post.image_url}
                alt={post.caption}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brand-pink/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center text-pure-white">
                <Instagram className="w-6 h-6 mb-2" />
                <p className="text-xs line-clamp-3 font-medium">{post.caption}</p>
                <span className="text-[11px] underline mt-2 font-semibold">View on Instagram</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 11: TESTIMONIALS
          ========================================================================= */}
      <section className="bg-cream-warm/50 py-16 border-y border-border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-brand-pink uppercase tracking-widest">
              Verified Client Love
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary mt-1">
              Words of Appreciation
            </h2>
            <div className="w-16 h-0.5 bg-brand-pink mx-auto mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-2xl bg-pure-white border border-border-soft shadow-subtle flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 text-gold-dark mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-text-primary leading-relaxed italic">
                    &ldquo;{t.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-border-soft flex items-center justify-between">
                  <div>
                    <div className="font-serif text-base font-bold text-text-primary">
                      {t.customer_name}
                    </div>
                    <div className="text-[11px] text-text-secondary">{t.city}</div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Client
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 12: BRAND STORY & CRAFTSMANSHIP
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-pure-white border border-border-soft shadow-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-border-soft bg-cream-warm">
            <Image
              src="https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=800&q=80"
              alt="Craftsmanship at Thanmay Collections"
              fill
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-semibold text-brand-pink uppercase tracking-widest">
              The Thanmay Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary">
              Crafting Heirloom Memories with Modern Grace
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              At <strong className="text-text-primary font-semibold">Thanmay Collections</strong>, we believe every piece of jewellery carries emotion, heritage, and the soul of celebrations. Founded with a vision to make luxury traditional imitation jewellery accessible, we partner directly with generational artisans in Jaipur, Hyderabad, and South India.
            </p>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Every creation is dipped in high-micron 24K gold polish, set with uncut polki kundan, and carefully examined for durability, hypoallergenic comfort, and weight balance.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-semibold text-brand-pink hover:text-brand-pink2 underline underline-offset-4"
              >
                <span>Read Our Full Story & Craft Heritage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
