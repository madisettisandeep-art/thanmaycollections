import type { Metadata, Viewport } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/store/cart-store';
import { WishlistProvider } from '@/lib/store/wishlist-store';
import { ToastProvider } from '@/components/ui/Toast';
import { AnnouncementBar } from '@/components/ui/AnnouncementBar';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';

export const viewport: Viewport = {
  themeColor: '#5F143F',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://thanmaycollections.com'),
  title: {
    default: 'Thanmay Collections | Premium Imitation Jewellery',
    template: '%s | Thanmay Collections',
  },
  description:
    'Elegance that celebrates tradition. Discover timeless Indian imitation jewellery, regal kundan choker sets, antique temple haars, bridal jewellery, and anti-tarnish daily wear.',
  keywords: [
    'Thanmay Collections',
    'Imitation Jewellery',
    'Indian Jewellery',
    'Kundan Choker',
    'Temple Jewellery',
    'Bridal Jewellery Set',
    'South Indian Jewellery',
    'Antique Gold Jewellery',
    'Jhumkas',
    'Meenakari Jewellery',
  ],
  authors: [{ name: 'Thanmay Collections' }],
  creator: 'Thanmay Collections',
  publisher: 'Thanmay Collections',
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '512x512', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://thanmaycollections.com',
    siteName: 'Thanmay Collections',
    title: 'Thanmay Collections | Premium Imitation Jewellery',
    description: 'Elegance that celebrates tradition. Bespoke bridal, temple, and kundan jewellery.',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Thanmay Collections - Elegance that celebrates tradition',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thanmay Collections | Premium Imitation Jewellery',
    description: 'Elegance that celebrates tradition. Discover royal kundan, temple, and bridal collections.',
    images: ['/images/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'JewelryStore',
    name: 'Thanmay Collections',
    description: 'Premium imitation jewellery brand celebrating Indian heritage and bridal tradition.',
    url: 'https://thanmaycollections.com',
    logo: 'https://thanmaycollections.com/images/logo.png',
    telephone: '+91 98765 43210',
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    sameAs: ['https://www.instagram.com/newthanmay_collections/'],
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-soft-cream text-text-primary antialiased selection:bg-brand-pink7 selection:text-text-primary">
        <CartProvider>
          <WishlistProvider>
            <ToastProvider>
              <AnnouncementBar />
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <CartDrawer />
            </ToastProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
