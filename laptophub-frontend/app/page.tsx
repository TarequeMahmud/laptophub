'use client';

import { Laptop, Sparkles } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { Product } from '@/types';
import clsx from 'clsx';
import CategoriesSection from '@/components/CategoriesSection';
import TopBrandsSection from '@/components/TopBrandsSection';
import DealsSection from '@/components/DealsSection';
import NewArrivalsSection from '@/components/NewArrivalsSection';
import BestSellersSection from '@/components/BestSellersSection';
import AccessoriesSection from '@/components/AccessoriesSection';
import CustomerReviewsSection from '@/components/CustomerReviewsSection';
import NewsletterSignup from '@/components/NewsletterSignup';
import Footer from '@/components/Footer';
import ProductShowcase from '@/components/ProductShowcase';

// Mock product data
const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'MacBook Pro 16"',
    price: 2499,
    originalPrice: 2799,
    rating: 4.9,
    reviews: 1247,
    badge: 'Best Seller',
    availability: 'In Stock',
    tags: ['M3', '16-inch', 'Liquid Retina'],
    description: 'Powerful laptop for professionals',
    image: '💻',
    href: '#',
  },
  {
    id: '2',
    name: 'Dell XPS 13',
    price: 999,
    originalPrice: 1149,
    rating: 4.8,
    reviews: 892,
    badge: 'Sale',
    availability: 'Limited Stock',
    tags: ['12th Gen Intel', 'Touchscreen'],
    description: 'Ultrabook with amazing display',
    image: '🖥️',
    href: '#',
  },
  {
    id: '3',
    name: 'ASUS ROG Strix G16',
    price: 1899,
    rating: 4.7,
    reviews: 654,
    availability: 'In Stock',
    tags: ['RTX 4070', '144Hz', 'Gaming'],
    description: 'High-performance gaming laptop',
    image: '🎮',
    href: '#',
  },
  {
    id: '4',
    name: 'Lenovo ThinkPad X1',
    price: 1299,
    originalPrice: 1499,
    rating: 4.6,
    reviews: 423,
    badge: 'Business',
    availability: 'In Stock',
    tags: ['Business', 'Lightweight'],
    description: 'Business laptop with reliability',
    image: '📱',
    href: '#',
  },
];

export default function Home() {
  const { theme } = useTheme();

  return (
    <div className={clsx(
      "min-h-screen",
      theme === 'dark' ? 'bg-slate-900' : 'bg-linear-to-b from-slate-50 to-slate-100'
    )}>
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 right-0 hidden w-2 rounded-l-full bg-linear-to-b from-sky-500 to-cyan-500 opacity-30 blur-2xl lg:block" />
            <div className="relative grid gap-8 lg:grid-cols-[1.4fr_0.8fr] items-center">
              <div>
                <div className="flex justify-center mb-6 lg:justify-start">
                  <Laptop className="w-16 h-16 text-blue-600" />
                </div>
                <h1 className={clsx(
                  'text-5xl sm:text-6xl font-bold mb-6',
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                )}>
                  Welcome to <span className="text-blue-600">LaptopHub</span>
                </h1>
                <p className={clsx(
                  'text-xl max-w-2xl leading-8',
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                )}>
                  Discover premium laptops for every need. From gaming rigs to professional workstations,
                  find your perfect laptop today.
                </p>
              </div>

              <div className={clsx(
                'rounded-3xl p-6 shadow-2xl ring-1 ring-white/10',
                theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-linear-to-r from-sky-600 via-cyan-500 to-slate-900 text-white'
              )}>
                <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-3 text-sm font-semibold shadow-lg backdrop-blur-sm animate-pulse">
                  <Sparkles className="h-4 w-4" />
                  New laptops available!
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-100/80">
                  The latest premium laptops are ready to shop — always curated for performance, design, and value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Laptop Category Showcase */}
      <ProductShowcase
        title="Premium Laptops for Every Need"
        subtitle="Browse our curated laptop collection with business-ready performance, sleek design, and premium support."
        products={PRODUCTS}
        categoryLabel="Laptop Collection"
        viewAllHref="/laptops"
        viewAllLabel="Explore all laptops"
      />

      {/* Categories Section */}
      <CategoriesSection />

      {/* Top Brands Section */}
      <TopBrandsSection />

      {/* Deals Section */}
      <DealsSection />

      {/* New Arrivals Section */}
      <NewArrivalsSection />

      {/* Best Sellers Section */}
      <BestSellersSection />

      {/* Accessories Section */}
      <AccessoriesSection />

      {/* Customer Reviews Section */}
      <CustomerReviewsSection />

      {/* Newsletter Signup */}
      <NewsletterSignup />

      {/* Footer */}
      <Footer />
    </div>
  );
}
