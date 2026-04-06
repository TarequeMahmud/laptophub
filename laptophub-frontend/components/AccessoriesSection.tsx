'use client';

import { Mouse, Keyboard, Headphones, HardDrive } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import clsx from 'clsx';

const accessories = [
    {
        name: 'Wireless Mouse',
        icon: Mouse,
        price: 29,
        description: 'Ergonomic wireless mouse',
    },
    {
        name: 'Mechanical Keyboard',
        icon: Keyboard,
        price: 89,
        description: 'RGB backlit mechanical keyboard',
    },
    {
        name: 'Gaming Headset',
        icon: Headphones,
        price: 79,
        description: 'Noise-cancelling gaming headset',
    },
    {
        name: 'External SSD',
        icon: HardDrive,
        price: 129,
        description: '1TB portable SSD drive',
    },
];

export default function AccessoriesSection() {
    const { theme } = useTheme();

    return (
        <section className={clsx(
            "py-20 px-4 sm:px-6 lg:px-8",
            theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'
        )}>
            <div className="max-w-7xl mx-auto">
                <h2 className={clsx(
                    "text-4xl font-bold mb-12 text-center",
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                )}>Essential Accessories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {accessories.map((accessory, idx) => {
                        const Icon = accessory.icon;
                        return (
                            <div
                                key={idx}
                                className={clsx(
                                    "rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 text-center",
                                    theme === 'dark' ? 'bg-slate-700' : 'bg-white'
                                )}
                            >
                                <div className="flex justify-center mb-4">
                                    <Icon className="w-12 h-12 text-green-600" />
                                </div>
                                <h3 className={clsx(
                                    "text-xl font-semibold mb-2",
                                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                                )}>{accessory.name}</h3>
                                <p className={clsx(
                                    "mb-4",
                                    theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                                )}>{accessory.description}</p>
                                <div className="mb-6">
                                    <span className={clsx(
                                        "text-2xl font-bold",
                                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                                    )}>
                                        ${accessory.price}
                                    </span>
                                </div>
                                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105">
                                    Add to Cart
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}