'use client';

import { Laptop, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCartStore } from '@/store/cartStore';
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

// Mock product data
const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'MacBook Pro 16"',
    price: 2499,
    description: 'Powerful laptop for professionals',
    image: '💻',
  },
  {
    id: '2',
    name: 'Dell XPS 13',
    price: 999,
    description: 'Ultrabook with amazing display',
    image: '🖥️',
  },
  {
    id: '3',
    name: 'ASUS ROG Gaming',
    price: 1899,
    description: 'High-performance gaming laptop',
    image: '🎮',
  },
  {
    id: '4',
    name: 'Lenovo ThinkPad',
    price: 1299,
    description: 'Business laptop with reliability',
    image: '📱',
  },
];

export default function Home() {
  const { theme } = useTheme();
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    toast.success(`${product.name} added to cart!`, {
      icon: '🛒',
    });
  };

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
