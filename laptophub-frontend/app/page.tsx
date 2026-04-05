'use client';

import { Laptop, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/types';
import clsx from 'clsx';

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
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    toast.success(`${product.name} added to cart!`, {
      icon: '🛒',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
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

      {/* Products Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Featured Laptops</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                {/* Product Image */}
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 h-48 flex items-center justify-center text-6xl">
                  {product.image}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-slate-600 mb-4">{product.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-slate-900">
                      ${product.price.toLocaleString()}
                    </span>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={clsx(
                      'w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg',
                      'bg-blue-600 hover:bg-blue-700 text-white font-semibold',
                      'transition duration-200 ease-in-out transform hover:scale-105'
                    )}
                  >
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Why Choose LaptopHub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Premium Quality',
                description: 'All laptops are hand-selected for quality and performance',
              },
              {
                title: 'Best Prices',
                description: 'Competitive pricing with exclusive discounts for members',
              },
              {
                title: 'Fast Shipping',
                description: 'Free shipping on orders over $500. Delivery in 2-3 days',
              },
            ].map((feature, idx) => (
              <div key={idx} className="text-center">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
