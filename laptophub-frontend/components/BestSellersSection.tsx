'use client';

import { Trophy, Star } from 'lucide-react';
import { Product } from '@/types';
import { useTheme } from '@/components/ThemeProvider';
import clsx from 'clsx';

const bestSellers: (Product & { rating: number; reviews: number })[] = [
    {
        id: 'best1',
        name: 'MacBook Pro 16"',
        price: 2499,
        description: 'M2 Max chip, 16-inch Liquid Retina XDR',
        image: '💻',
        rating: 4.9,
        reviews: 1247,
    },
    {
        id: 'best2',
        name: 'Dell XPS 13',
        price: 999,
        description: 'InfinityEdge display, 11th Gen Intel',
        image: '🖥️',
        rating: 4.8,
        reviews: 892,
    },
    {
        id: 'best3',
        name: 'ASUS ROG Zephyrus G15',
        price: 1899,
        description: 'AMD Ryzen 9, RTX 4070, 15.6" 144Hz',
        image: '🎮',
        rating: 4.7,
        reviews: 654,
    },
    {
        id: 'best4',
        name: 'Lenovo ThinkPad X1 Carbon',
        price: 1399,
        description: '12th Gen Intel, 14" display, lightweight',
        image: '📱',
        rating: 4.6,
        reviews: 423,
    },
];

export default function BestSellersSection() {
    const { theme } = useTheme();

    return (
        <section className={clsx(
            "py-20 px-4 sm:px-6 lg:px-8",
            theme === 'dark' ? 'bg-slate-800' : 'bg-white'
        )}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <Trophy className="w-12 h-12 text-yellow-600" />
                    </div>
                    <h2 className={clsx(
                        "text-4xl font-bold mb-4",
                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                    )}>Best Sellers</h2>
                    <p className={clsx(
                        "text-xl",
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                    )}>Most popular laptops among our customers</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {bestSellers.map((product) => (
                        <div
                            key={product.id}
                            className={clsx(
                                "rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden",
                                theme === 'dark' ? 'bg-slate-700' : 'bg-white'
                            )}
                        >
                            {/* Product Image */}
                            <div className={clsx(
                                "h-48 flex items-center justify-center text-6xl",
                                theme === 'dark' ? 'bg-yellow-900/30' : 'bg-linear-to-br from-yellow-100 to-yellow-50'
                            )}>
                                {product.image}
                            </div>

                            {/* Product Info */}
                            <div className="p-6">
                                <h3 className={clsx(
                                    "text-lg font-semibold mb-2",
                                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                                )}>{product.name}</h3>
                                <p className={clsx(
                                    "text-sm mb-4",
                                    theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                                )}>{product.description}</p>

                                {/* Rating */}
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex items-center">
                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                        <span className={clsx(
                                            "text-sm font-medium ml-1",
                                            theme === 'dark' ? 'text-white' : 'text-slate-900'
                                        )}>{product.rating}</span>
                                    </div>
                                    <span className={clsx(
                                        "text-sm",
                                        theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                                    )}>({product.reviews} reviews)</span>
                                </div>

                                {/* Price */}
                                <div className="mb-6">
                                    <span className={clsx(
                                        "text-3xl font-bold",
                                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                                    )}>
                                        ${product.price.toLocaleString()}
                                    </span>
                                </div>

                                {/* Add to Cart Button */}
                                <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}