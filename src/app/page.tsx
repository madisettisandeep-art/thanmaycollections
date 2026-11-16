import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Heart, ShieldCheck, Instagram, ChevronRight, CheckCircle2 } from 'lucide-react';
import { getCategories, getProducts, getHeroBanners, getCinemaScrollItems } from '@/lib/data/store-repository';
import { ProductCard } from '@/components/products/ProductCard';
import { HeroSlider } from '@/components/home/HeroSlider';
import { CinemaScroll } from '@/components/home/CinemaScroll';
import { TESTIMONIALS, INSTAGRAM_POSTS } from '@/lib/data/mock-data';

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage() {
  const [categories, featuredProducts, newArrivals, bestsellers, heroBanners, cinemaItems] = await Promise.all([
    getCategories(),
    getProducts({ featured: true }),
    getProducts({ newArrival: true }),
    getProducts({ bestseller: true }),
    getHeroBanners(),
    getCinemaScrollItems(),
  ]);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* =========================================================================
          SECTION 3: LUXURY HERO BANNER SLIDER (Auto-scrolling right-to-left)
          ========================================================================= */}
      <HeroSlider banners={heroBanners} />

      {/* Trust Highlights Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-20">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-card border border-border-soft p-5 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3 sm:gap-4 justify-center sm:justify-start">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-brand-pink8/60 border border-brand-pink6 flex items-center justify-center flex-shrink-0 text-brand-pink">
              <span className="font-serif font-bold text-base sm:text-lg">24K</span>
            </div>
            <div>
              <div className="font-serif text-sm sm:text-base font-bold text-text-primary">Micro Gold Polish</div>
              <div className="text-[11px] sm:text-xs text-text-secondary">Authentic long-lasting lustre</div>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 justify-center sm:justify-start">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-brand-pink8/60 border border-brand-pink6 flex items-center justify-center flex-shrink-0 text-brand-pink">
              <span className="font-serif font-bold text-base sm:text-lg">100%</span>
            </div>
            <div>
              <div className="font-serif text-sm sm:text-base font-bold text-text-primary">Artisanal Kundan</div>
              <div className="text-[11px] sm:text-xs text-text-secondary">Hand-set uncut polki stones</div>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 justify-center sm:justify-start">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-brand-pink8/60 border border-brand-pink6 flex items-center justify-center flex-shrink-0 text-brand-pink">
              <ShieldCheck className="w-5 h-5 text-brand-pink" />
            </div>
            <div>
              <div className="font-serif text-sm sm:text-base font-bold text-text-primary">Skin-Safe & Anti-Tarnish</div>
              <div className="text-[11px] sm:text-xs text-text-secondary">Nickel-free hypoallergenic base</div>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 justify-center sm:justify-start">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-brand-pink8/60 border border-brand-pink6 flex items-center justify-center flex-shrink-0 text-brand-pink">
              <CheckCircle2 className="w-5 h-5 text-brand-pink" />
            </div>
            <div>
              <div className="font-serif text-sm sm:text-base font-bold text-text-primary">Direct WhatsApp Orders</div>
              <div className="text-[11px] sm:text-xs text-text-secondary">Personalized concierge help</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: SHOP BY CATEGORY
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold text-brand-pink uppercase tracking-widest block">
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
              className="group relative rounded-2xl overflow-hidden border border-border-soft bg-white shadow-subtle hover:shadow-card transition-all duration-300 aspect-[3/4] flex flex-col justify-end p-5"
            >
              <Image
                src={cat.image_url || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent group-hover:from-black/90 transition-colors" />

              <div className="relative z-10 text-white">
                <h3 className="font-serif text-lg sm:text-xl font-bold tracking-wide group-hover:text-gold-light transition-colors text-white">
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
          LIVE CINEMA SCROLL: LATEST COLLECTIONS IN MOTION
          ========================================================================= */}
      <CinemaScroll items={cinemaItems} />

      {/* =========================================================================
          SECTION 5: NEW ARRIVALS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold text-brand-pink uppercase tracking-widest block">
              Fresh In Store
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary mt-1">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/shop?sort=newest"
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
            <span className="text-xs font-semibold text-brand-pink uppercase tracking-widest block">
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
            <div className="relative z-10 space-y-4 max-w-md">
              <span className="px-3 py-1 rounded-full bg-white text-[11px] font-bold uppercase tracking-wider text-brand-pink shadow-sm inline-block">
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
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-pink hover:bg-brand-pink2 text-white text-xs font-semibold rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  <span className="text-white font-semibold">Explore Bridal Trousseau</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
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
            <div className="relative z-10 space-y-4 max-w-md">
              <span className="px-3 py-1 rounded-full bg-white text-[11px] font-bold uppercase tracking-wider text-gold-dark shadow-sm inline-block">
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
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-text-primary hover:bg-black text-white text-xs font-semibold rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  <span className="text-white font-semibold">Discover Temple Jewellery</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
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
          <span className="text-xs font-semibold text-brand-pink uppercase tracking-widest block">
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h4 className="font-serif text-base font-bold group-hover:text-gold-light transition-colors text-white">
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
              <div className="absolute inset-0 bg-brand-pink/75 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center text-white">
                <Instagram className="w-6 h-6 mb-2 text-white" />
                <p className="text-xs line-clamp-3 font-medium text-white">{post.caption}</p>
                <span className="text-[11px] underline mt-2 font-semibold text-white">View on Instagram</span>
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
            <span className="text-xs font-semibold text-brand-pink uppercase tracking-widest block">
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
                className="p-6 rounded-2xl bg-white border border-border-soft shadow-subtle flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-brand-pink font-semibold text-xs tracking-wider uppercase mb-3">
                    <span className="px-2 py-0.5 rounded-md bg-brand-pink8/60 border border-brand-pink6 text-brand-pink font-bold">
                      5.0 / 5.0
                    </span>
                    <span className="text-text-secondary text-[11px]">Client Rating</span>
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
          SECTION 12: BRAND STORY
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-cream-warm via-white to-brand-pink8/30 border border-border-soft p-8 sm:p-14 shadow-card">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="text-xs font-semibold text-brand-pink uppercase tracking-widest block">
              Our Heritage & Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-text-primary">
              Crafting Heirloom Memories for Every Celebration
            </h2>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              At Thanmay Collections, we believe true luxury honors tradition. Every piece in our curation—from royal uncut polki kundan chokers to antique temple malas—is handcrafted by master artisans who pour generations of Indian heritage into every setting. We bring you jewelry that looks and feels majestic, accessible right at your fingertips with personalized WhatsApp assistance.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/about"
                className="px-8 py-3.5 bg-brand-pink hover:bg-brand-pink2 text-white font-semibold text-xs rounded-full shadow-md hover:shadow-lg transition-all"
              >
                <span className="text-white font-semibold">Read Our Full Story</span>
              </Link>
              <Link
                href="/care-guide"
                className="px-8 py-3.5 bg-white hover:bg-cream-warm text-text-primary font-semibold text-xs rounded-full border border-border-soft hover:border-brand-pink transition-all"
              >
                Jewellery Care Guide
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
