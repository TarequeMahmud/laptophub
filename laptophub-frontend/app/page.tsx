'use client';

import { Laptop } from 'lucide-react';
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
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Laptop className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6">
            Welcome to <span className="text-blue-600">LaptopHub</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover premium laptops for every need. From gaming rigs to professional workstations,
            find your perfect laptop today.
          </p>
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
