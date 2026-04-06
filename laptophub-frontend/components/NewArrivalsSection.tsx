'use client';

import { Sparkles } from 'lucide-react';
import { Product } from '@/types';
import { useTheme } from '@/components/ThemeProvider';
import clsx from 'clsx';

const newArrivals: Product[] = [
    {
        id: 'new1',
        name: 'MacBook Pro 14" M3',
        price: 1999,
        description: 'M3 chip, 14-inch Liquid Retina XDR display',
        image: '💻',
    },
    {
        id: 'new2',
        name: 'Dell XPS 13 Plus',
        price: 1299,
        description: 'InfinityEdge display, 12th Gen Intel',
        image: '🖥️',
    },
    {
        id: 'new3',
        name: 'ASUS ZenBook Pro 16X',
        price: 2499,
        description: 'AMD Ryzen 9, RTX 3060, 16-inch 4K OLED',
        image: '🎮',
    },
    {
        id: 'new4',
        name: 'Lenovo ThinkPad X1 Carbon',
        price: 1599,
        description: 'Ultra-lightweight business laptop',
        image: '📱',
    },
];

export default function NewArrivalsSection() {
    const { theme } = useTheme();

    return (
        <section className={clsx(
            "py-20 px-4 sm:px-6 lg:px-8",
            theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'
        )}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <Sparkles className="w-12 h-12 text-purple-600" />
                    </div>
                    <h2 className={clsx(
                        "text-4xl font-bold mb-4",
                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                    )}>New Arrivals</h2>
                    <p className={clsx(
                        "text-xl",
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                    )}>Latest laptops hitting the market</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {newArrivals.map((product) => (
                        <div
                            key={product.id}
                            className={clsx(
                                "rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden relative",
                                theme === 'dark' ? 'bg-slate-700' : 'bg-white'
                            )}
                        >
                            {/* New Badge */}
                            <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                                NEW
                            </div>

                            {/* Product Image */}
                            <div className={clsx(
                                "h-48 flex items-center justify-center text-6xl",
                                theme === 'dark' ? 'bg-purple-900/30' : 'bg-linear-to-br from-purple-100 to-purple-50'
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
                                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}