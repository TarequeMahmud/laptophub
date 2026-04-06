'use client';

import { useTheme } from '@/components/ThemeProvider';
import clsx from 'clsx';

const brands = [
    { name: 'Apple', logo: '🍎' },
    { name: 'Dell', logo: '🖥️' },
    { name: 'HP', logo: '💻' },
    { name: 'Lenovo', logo: '📱' },
    { name: 'ASUS', logo: '🎮' },
    { name: 'Acer', logo: '🖱️' },
    { name: 'MSI', logo: '⚡' },
    { name: 'Samsung', logo: '📺' },
];

export default function TopBrandsSection() {
    const { theme } = useTheme();

    return (
        <section className={clsx(
            "py-20 px-4 sm:px-6 lg:px-8",
            theme === 'dark' ? 'bg-slate-800' : 'bg-white'
        )}>
            <div className="max-w-7xl mx-auto">
                <h2 className={clsx(
                    "text-4xl font-bold mb-12 text-center",
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                )}>Top Brands</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
                    {brands.map((brand, idx) => (
                        <div
                            key={idx}
                            className={clsx(
                                "rounded-lg p-6 text-center hover:bg-opacity-80 transition-colors duration-300 cursor-pointer",
                                theme === 'dark' ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-slate-50 hover:bg-slate-100 text-slate-900'
                            )}
                        >
                            <div className="text-4xl mb-2">{brand.logo}</div>
                            <h3 className="text-lg font-semibold">{brand.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}