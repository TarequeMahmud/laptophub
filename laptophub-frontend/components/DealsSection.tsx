'use client';

import { Tag, Percent } from 'lucide-react';
import { Product } from '@/types';
import { useTheme } from '@/components/ThemeProvider';
import clsx from 'clsx';

const deals: (Product & { originalPrice: number; discount: number })[] = [
    {
        id: 'deal1',
        name: 'MacBook Air M2',
        price: 1099,
        originalPrice: 1199,
        discount: 8,
        description: 'Latest M2 chip, 13-inch display',
        image: '💻',
    },
    {
        id: 'deal2',
        name: 'Dell XPS 15',
        price: 1799,
        originalPrice: 1999,
        discount: 10,
        description: 'Intel i7, 16GB RAM, 512GB SSD',
        image: '🖥️',
    },
    {
        id: 'deal3',
        name: 'ASUS ROG Strix',
        price: 1499,
        originalPrice: 1699,
        discount: 12,
        description: 'RTX 4060, 144Hz display',
        image: '🎮',
    },
];

export default function DealsSection() {
    const { theme } = useTheme();

    return (
        <section className={clsx(
            "py-20 px-4 sm:px-6 lg:px-8",
            theme === 'dark' ? 'bg-red-900/20' : 'bg-red-50'
        )}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <Tag className="w-12 h-12 text-red-600" />
                    </div>
                    <h2 className={clsx(
                        "text-4xl font-bold mb-4",
                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                    )}>Hot Deals & Discounts</h2>
                    <p className={clsx(
                        "text-xl",
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                    )}>Limited time offers on premium laptops</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {deals.map((deal) => (
                        <div
                            key={deal.id}
                            className={clsx(
                                "rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden relative",
                                theme === 'dark' ? 'bg-slate-800' : 'bg-white'
                            )}
                        >
                            {/* Discount Badge */}
                            <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                                <Percent size={14} />
                                {deal.discount}% OFF
                            </div>

                            {/* Product Image */}
                            <div className={clsx(
                                "h-48 flex items-center justify-center text-6xl",
                                theme === 'dark' ? 'bg-red-900/30' : 'bg-linear-to-br from-red-100 to-red-50'
                            )}>
                                {deal.image}
                            </div>

                            {/* Product Info */}
                            <div className="p-6">
                                <h3 className={clsx(
                                    "text-lg font-semibold mb-2",
                                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                                )}>{deal.name}</h3>
                                <p className={clsx(
                                    "text-sm mb-4",
                                    theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                                )}>{deal.description}</p>

                                {/* Price */}
                                <div className="mb-6">
                                    <div className="flex items-center gap-2">
                                        <span className={clsx(
                                            "text-2xl font-bold",
                                            theme === 'dark' ? 'text-white' : 'text-slate-900'
                                        )}>
                                            ${deal.price.toLocaleString()}
                                        </span>
                                        <span className={clsx(
                                            "text-lg line-through",
                                            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                                        )}>
                                            ${deal.originalPrice.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                {/* Add to Cart Button */}
                                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105">
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}