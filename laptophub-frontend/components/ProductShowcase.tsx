'use client';

import { ShoppingCart, Star, ChevronRight } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import clsx from 'clsx';
import type { Product } from '@/types';

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
                            <article
                                key={product.id}
                                className={clsx(
                                    'group rounded-4xl border transition duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden',
                                    theme === 'dark' ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
                                )}
                            >
                                <div className={clsx(
                                    'relative h-64 flex items-center justify-center overflow-hidden',
                                    theme === 'dark' ? 'bg-slate-700/70' : 'bg-slate-100'
                                )}>
                                    {product.badge ? (
                                        <span className={clsx(
                                            'absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em]',
                                            product.badge === 'Best Seller'
                                                ? 'bg-yellow-500 text-slate-950'
                                                : product.badge === 'Sale'
                                                    ? 'bg-rose-500 text-white'
                                                    : 'bg-blue-600 text-white'
                                        )}>
                                            {product.badge}
                                        </span>
                                    ) : null}

                                    {product.image ? (
                                        <div className={clsx(
                                            'text-7xl md:text-8xl',
                                            typeof product.image === 'string' && product.image.startsWith('http') ? 'w-full h-full' : ''
                                        )}>
                                            {product.image}
                                        </div>
                                    ) : (
                                        <div className={clsx(
                                            'w-full h-full flex items-center justify-center text-6xl',
                                            theme === 'dark' ? 'text-slate-300' : 'text-slate-400'
                                        )}>
                                            📦
                                        </div>
                                    )}
                                </div>

                                <div className="p-8 flex flex-col h-full">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className={clsx(
                                                'text-2xl font-semibold tracking-tight mb-2',
                                                theme === 'dark' ? 'text-white' : 'text-slate-900'
                                            )}>
                                                {product.name}
                                            </h3>
                                            {product.description ? (
                                                <p className={clsx(
                                                    'text-sm leading-6',
                                                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                                                )}>
                                                    {product.description}
                                                </p>
                                            ) : null}
                                        </div>

                                        {product.rating ? (
                                            <div className="flex items-center gap-1 text-sm font-semibold text-amber-400">
                                                <Star className="w-4 h-4" />
                                                <span>{product.rating.toFixed(1)}</span>
                                            </div>
                                        ) : null}
                                    </div>

                                    {product.tags?.length ? (
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {product.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className={clsx(
                                                        'rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.18em]',
                                                        theme === 'dark' ? 'bg-slate-700 text-slate-200' : 'bg-slate-100 text-slate-700'
                                                    )}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    ) : null}

                                    <div className="mt-6 flex items-center justify-between gap-4">
                                        <div>
                                            <p className={clsx(
                                                'text-sm uppercase tracking-[0.2em] mb-1',
                                                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                                            )}>
                                                Starting at
                                            </p>
                                            <div className="flex items-center gap-3">
                                                <span className={clsx(
                                                    'text-3xl font-semibold',
                                                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                                                )}>
                                                    ${product.price.toLocaleString()}
                                                </span>
                                                {product.originalPrice && product.originalPrice > product.price ? (
                                                    <span className={clsx(
                                                        'text-sm line-through',
                                                        theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
                                                    )}>
                                                        ${product.originalPrice.toLocaleString()}
                                                    </span>
                                                ) : null}
                                            </div>
                                        </div>

                                        <span className={clsx(
                                            'rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]',
                                            product.availability === 'Out of Stock'
                                                ? 'bg-rose-500 text-white'
                                                : product.availability === 'Limited Stock'
                                                    ? 'bg-amber-500 text-slate-950'
                                                    : theme === 'dark'
                                                        ? 'bg-slate-700 text-slate-200'
                                                        : 'bg-slate-100 text-slate-700'
                                        )}>
                                            {product.availability ?? 'In Stock'}
                                        </span>
                                    </div>

                                    <div className="mt-8 pt-6 border-t flex flex-col gap-3">
                                        <button
                                            type="button"
                                            className={clsx(
                                                'inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition duration-200',
                                                theme === 'dark'
                                                    ? 'bg-blue-600 text-white hover:bg-blue-500'
                                                    : 'bg-slate-900 text-white hover:bg-slate-800'
                                            )}
                                        >
                                            <ShoppingCart className="w-4 h-4" />
                                            Add to cart
                                        </button>
                                        <a
                                            href={product.href ?? '#'}
                                            className={clsx(
                                                'text-sm font-semibold transition duration-200',
                                                theme === 'dark'
                                                    ? 'text-slate-200 hover:text-white'
                                                    : 'text-slate-700 hover:text-slate-900'
                                            )}
                                        >
                                            View details
                                        </a>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
