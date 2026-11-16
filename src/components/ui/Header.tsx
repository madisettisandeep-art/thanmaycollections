'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '@/lib/store/cart-store';
import { useWishlist } from '@/lib/store/wishlist-store';
import { SearchModal } from './SearchModal';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Shop All', href: '/shop' },
  {
    name: 'Categories',
    href: '/shop',
    children: [
      { name: 'Necklace Sets', href: '/category/necklace-sets' },
      { name: 'Earrings', href: '/category/earrings' },
      { name: 'Bangles', href: '/category/bangles' },
      { name: 'Bridal Jewellery', href: '/category/bridal-jewellery' },
      { name: 'Temple Jewellery', href: '/category/temple-jewellery' },
      { name: 'Kundan Jewellery', href: '/category/kundan-jewellery' },
      { name: 'Daily Wear', href: '/category/daily-wear-jewellery' },
      { name: 'Traditional', href: '/category/traditional-jewellery' },
    ],
  },
  { name: 'New Arrivals', href: '/shop?filter=new' },
  { name: 'Bridal Collection', href: '/category/bridal-jewellery' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const pathname = usePathname();
  const { totalQuantity, setIsOpen: setCartOpen } = useCart();
  const { totalWishlist } = useWishlist();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on path change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-pure-white/95 backdrop-blur-md shadow-card border-b border-border-soft'
            : 'bg-pure-white border-b border-border-soft/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">
            {/* Mobile menu trigger */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-text-primary hover:text-brand-pink transition-colors focus:outline-none"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Official Brand Logo - Pure Transparent Logo Without Box */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="group flex items-center focus:outline-none" aria-label="Thanmay Collections Home">
                <div className="relative h-16 sm:h-20 w-32 sm:w-44 transition-all duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_8px_rgba(220,193,140,0.35)]">
                  <Image
                    src="/images/thanmay-logo-transparent.png?v=3"
                    alt="Thanmay Collections - Elegance that celebrates tradition"
                    fill
                    priority
                    unoptimized
                    sizes="(max-width: 640px) 128px, 176px"
                    className="object-contain object-left"
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-3 xl:space-x-6 text-xs xl:text-sm">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;

                if (link.children) {
                  return (
                    <div
                      key={link.name}
                      className="relative group py-2"
                      onMouseEnter={() => setCategoriesOpen(true)}
                      onMouseLeave={() => setCategoriesOpen(false)}
                    >
                      <button
                        className={`flex items-center gap-1 text-sm font-medium tracking-wide transition-colors ${
                          isActive || pathname.startsWith('/category/')
                            ? 'text-brand-pink font-semibold'
                            : 'text-text-primary hover:text-brand-pink'
                        }`}
                      >
                        {link.name}
                        <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                      </button>

                      {/* Dropdown Menu */}
                      <div
                        className={`absolute left-0 top-full w-60 bg-pure-white rounded-xl shadow-card border border-border-soft py-2 transition-all duration-200 ${
                          categoriesOpen
                            ? 'opacity-100 translate-y-0 pointer-events-auto'
                            : 'opacity-0 translate-y-2 pointer-events-none'
                        }`}
                      >
                        <div className="px-4 py-2 border-b border-border-soft bg-cream-warm/40 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                          Shop by Craft & Style
                        </div>
                        {link.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-text-primary hover:bg-cream-warm hover:text-brand-pink transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-sm font-medium tracking-wide transition-colors py-1 ${
                      isActive
                        ? 'text-brand-pink font-semibold'
                        : 'text-text-primary hover:text-brand-pink'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-pink rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search Icon */}
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                className="p-2.5 rounded-full text-text-primary hover:text-brand-pink hover:bg-cream-warm transition-all"
                aria-label="Search jewellery"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Icon */}
              <Link
                href="/wishlist"
                className="relative p-2.5 rounded-full text-text-primary hover:text-brand-pink hover:bg-cream-warm transition-all"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {totalWishlist > 0 && (
                  <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[11px] font-bold text-white bg-brand-pink rounded-full shadow-subtle animate-fadeIn">
                    {totalWishlist}
                  </span>
                )}
              </Link>

              {/* Shopping Cart Icon with Badge */}
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                className="relative p-2.5 rounded-full text-text-primary hover:text-brand-pink hover:bg-cream-warm transition-all"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalQuantity > 0 && (
                  <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[11px] font-bold text-white bg-brand-pink rounded-full shadow-subtle animate-fadeIn">
                    {totalQuantity}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Overlay backdrop */}
          <div
            className="fixed inset-0 bg-text-primary/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative w-full max-w-xs bg-pure-white shadow-xl h-full flex flex-col z-10 overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-4 border-b border-border-soft flex items-center justify-between">
              <div className="relative h-14 w-28 filter drop-shadow-[0_2px_6px_rgba(220,193,140,0.3)]">
                <Image
                  src="/images/thanmay-logo-transparent.png?v=3"
                  alt="Thanmay Collections"
                  fill
                  unoptimized
                  className="object-contain object-left"
                />
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-text-secondary hover:text-text-primary rounded-full hover:bg-cream-warm"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="p-4 space-y-2 flex-1">
              {NAV_LINKS.map((link) => {
                if (link.children) {
                  return (
                    <div key={link.name} className="py-1">
                      <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider px-3 py-1">
                        {link.name}
                      </div>
                      <div className="pl-2 space-y-1 mt-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-3 py-2 text-sm font-medium text-text-primary hover:text-brand-pink hover:bg-cream-warm rounded-lg"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block px-3 py-2.5 text-base font-medium text-text-primary hover:text-brand-pink hover:bg-cream-warm rounded-lg transition-colors"
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Drawer Footer */}
            <div className="p-4 border-t border-border-soft bg-cream-warm/30 space-y-3">
              <Link
                href="/admin"
                className="block text-center text-xs text-text-secondary hover:text-brand-pink py-1"
              >
                Admin Portal
              </Link>
              <div className="text-center text-xs text-text-secondary">
                WhatsApp Orders: <span className="font-semibold text-text-primary">+91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
}
