'use client';

import { Monitor, Gamepad2, Briefcase, BookOpen } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import clsx from 'clsx';

const categories = [
    {
        name: 'Gaming Laptops',
        icon: Gamepad2,
        description: 'High-performance gaming rigs',
        count: '150+ models',
    },
    {
        name: 'Business Laptops',
        icon: Briefcase,
        description: 'Professional workstations',
        count: '200+ models',
    },
    {
        name: 'Ultrabooks',
        icon: Monitor,
        description: 'Lightweight and portable',
        count: '100+ models',
    },
    {
        name: 'Student Laptops',
        icon: BookOpen,
        description: 'Affordable and reliable',
        count: '80+ models',
    },
];

export default function CategoriesSection() {
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
                )}>Shop by Category</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((category, idx) => {
                        const Icon = category.icon;
                        return (
                            <div
                                key={idx}
                                className={clsx(
                                    "rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 text-center cursor-pointer",
                                    theme === 'dark' ? 'bg-slate-700 hover:bg-slate-600' : 'bg-white'
                                )}
                            >
                                <div className="flex justify-center mb-4">
                                    <Icon className="w-12 h-12 text-blue-600" />
                                </div>
                                <h3 className={clsx(
                                    "text-xl font-semibold mb-2",
                                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                                )}>{category.name}</h3>
                                <p className={clsx(
                                    "mb-2",
                                    theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                                )}>{category.description}</p>
                                <span className="text-sm text-blue-600 font-medium">{category.count}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}