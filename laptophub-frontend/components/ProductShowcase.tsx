'use client';

import { ChevronRight } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import clsx from 'clsx';
import type { Product } from '@/types';
import ProductCard from '@/components/ProductCard';

interface ProductShowcaseProps {
    title: string;
    subtitle?: string;
    products: Product[];
    viewAllHref?: string;
    viewAllLabel?: string;
    categoryLabel?: string;
    emptyMessage?: string;
}

export default function ProductShowcase({
    title,
    subtitle,
    products,
    viewAllHref,
    viewAllLabel = 'View all products',
    categoryLabel,
    emptyMessage = 'No products are available in this category right now.',
}: ProductShowcaseProps) {
    const { theme } = useTheme();

    return (
        <section className={clsx(
            'py-20 px-4 sm:px-6 lg:px-8',
            theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'
        )}>
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-12">
                    <div>
                        <p className={clsx(
                            'text-sm font-semibold uppercase tracking-[0.3em] mb-3',
                            theme === 'dark' ? 'text-slate-400' : 'text-blue-600'
                        )}>
                            {categoryLabel ?? 'Featured Products'}
                        </p>
                        <h2 className={clsx(
                            'text-4xl sm:text-5xl font-semibold tracking-tight',
                            theme === 'dark' ? 'text-white' : 'text-slate-900'
                        )}>
                            {title}
                        </h2>
                        {subtitle ? (
                            <p className={clsx(
                                'mt-4 max-w-2xl text-lg leading-8',
                                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                            )}>
                                {subtitle}
                            </p>
                        ) : null}
                    </div>

                    {viewAllHref ? (
                        <a
                            href={viewAllHref}
                            className={clsx(
                                'inline-flex items-center gap-2 text-sm font-semibold transition duration-200',
                                theme === 'dark'
                                    ? 'text-slate-100 hover:text-white'
                                    : 'text-slate-900 hover:text-slate-700'
                            )}
                        >
                            {viewAllLabel}
                            <ChevronRight className="w-4 h-4" />
                        </a>
                    ) : null}
                </div>

                {products.length === 0 ? (
                    <div className={clsx(
                        'rounded-3xl border p-10 text-center',
                        theme === 'dark' ? 'border-slate-700 bg-slate-800 text-slate-300' : 'border-slate-200 bg-white text-slate-700'
                    )}>
                        <p className="text-lg font-medium">{emptyMessage}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                primaryActionLabel="View details"
                                secondaryActionHref={product.href}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
