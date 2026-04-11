'use client';

import Image from 'next/image';
import { ShoppingCart, Star } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import clsx from 'clsx';
import type { Product } from '@/types';

interface ProductCardProps {
    product: Product;
    primaryActionLabel?: string;
    onPrimaryAction?: () => void;
    secondaryActionLabel?: string;
    secondaryActionHref?: string;
}

export default function ProductCard({
    product,
    primaryActionLabel = 'View details',
    onPrimaryAction,
    secondaryActionLabel,
    secondaryActionHref,
}: ProductCardProps) {
    const { theme } = useTheme();
    const isImageUrl = typeof product.image === 'string' && /^(https?:\/\/|data:image\/)/.test(product.image);

    const primaryAction = onPrimaryAction ? (
        <button
            type="button"
            onClick={onPrimaryAction}
            className={clsx(
                'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-200',
                theme === 'dark'
                    ? 'bg-blue-600 text-white hover:bg-blue-500'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
            )}
        >
            <ShoppingCart className="w-4 h-4" />
            {primaryActionLabel}
        </button>
    ) : secondaryActionHref ? (
        <a
            href={secondaryActionHref}
            className={clsx(
                'inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold transition duration-200',
                theme === 'dark'
                    ? 'border-slate-700 bg-slate-800 text-slate-100 hover:border-slate-600 hover:bg-slate-700'
                    : 'border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50'
            )}
        >
            {primaryActionLabel}
        </a>
    ) : (
        <button
            type="button"
            disabled
            className={clsx(
                'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold opacity-60 cursor-not-allowed',
                theme === 'dark' ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-500'
            )}
        >
            {primaryActionLabel}
        </button>
    );

    return (
        <article className={clsx(
            'group rounded-4xl border transition duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden',
            theme === 'dark' ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
        )}>
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

                {product.availability ? (
                    <span className={clsx(
                        'absolute bottom-4 right-4 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]',
                        product.availability === 'Out of Stock'
                            ? 'bg-rose-500 text-white'
                            : product.availability === 'Limited Stock'
                                ? 'bg-amber-500 text-slate-950'
                                : theme === 'dark'
                                    ? 'bg-slate-700 text-slate-200'
                                    : 'bg-slate-100 text-slate-700'
                    )}>
                        {product.availability}
                    </span>
                ) : null}

                {product.image ? (
                    isImageUrl ? (
                        <div className="relative h-full w-full">
                            <Image
                                src={product.image}
                                alt={product.imageAlt ?? product.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                    ) : (
                        <div className={clsx(
                            'text-7xl md:text-8xl',
                            theme === 'dark' ? 'text-slate-300' : 'text-slate-400'
                        )}>
                            {product.image}
                        </div>
                    )
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
                </div>

                <div className="mt-auto pt-6 border-t flex flex-col gap-3">
                    {primaryAction}
                    {secondaryActionHref && secondaryActionLabel ? (
                        <a
                            href={secondaryActionHref}
                            className={clsx(
                                'text-sm font-semibold transition duration-200',
                                theme === 'dark'
                                    ? 'text-slate-200 hover:text-white'
                                    : 'text-slate-700 hover:text-slate-900'
                            )}
                        >
                            {secondaryActionLabel}
                        </a>
                    ) : null}
                </div>
            </div>
        </article>
    );
}
