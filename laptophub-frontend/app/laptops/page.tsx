'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Funnel } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCartStore } from '@/store/cartStore';
import { useTheme } from '@/components/ThemeProvider';
import ProductCard from '@/components/ProductCard';
import { LAPTOP_PRODUCTS } from '@/lib/laptops';
import type { Product } from '@/types';
import clsx from 'clsx';

const CATEGORY_OPTIONS = ['All', 'Gaming', 'Business', 'Ultrabook', 'Student'];
const PRICE_RANGES = [
    { id: 'all', label: 'All prices', min: 0, max: Infinity },
    { id: 'under1200', label: 'Under $1,200', min: 0, max: 1200 },
    { id: '1200-1800', label: '$1,200 – $1,800', min: 1200, max: 1800 },
    { id: 'above1800', label: 'Above $1,800', min: 1800, max: Infinity },
];
const RATING_OPTIONS = [
    { value: 0, label: 'All ratings' },
    { value: 4, label: '4★ & up' },
    { value: 4.5, label: '4.5★ & up' },
    { value: 4.8, label: '4.8★ & up' },
];
const SORT_OPTIONS = [
    { value: 'newest', label: 'Newest arrivals' },
    { value: 'priceAsc', label: 'Price: Low to High' },
    { value: 'priceDesc', label: 'Price: High to Low' },
    { value: 'ratingDesc', label: 'Rating: High to Low' },
];
const PAGE_SIZE = 6;

export default function LaptopListingPage() {
    const { theme } = useTheme();
    const addItem = useCartStore((state) => state.addItem);
    const [category, setCategory] = useState('All');
    const [priceRange, setPriceRange] = useState('all');
    const [customMin, setCustomMin] = useState('');
    const [customMax, setCustomMax] = useState('');
    const [rating, setRating] = useState(0);
    const [sortBy, setSortBy] = useState('newest');
    const [page, setPage] = useState(1);

    const handleAddToCart = (product: Product) => {
        addItem(product, 1);
        toast.success(`${product.name} added to cart!`, {
            icon: '🛒',
        });
    };

    const activePriceRange = PRICE_RANGES.find((range) => range.id === priceRange) ?? PRICE_RANGES[0];
    const minPrice = customMin !== '' ? Number(customMin) : activePriceRange.min;
    const maxPrice = customMax !== '' ? Number(customMax) : activePriceRange.max;

    const filteredProducts = useMemo(() => {
        const result = LAPTOP_PRODUCTS.filter((product) => {
            const matchesCategory = category === 'All' || product.category === category;
            const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
            const matchesRating = rating === 0 || (product.rating ?? 0) >= rating;
            return matchesCategory && matchesPrice && matchesRating;
        });

        return [...result].sort((a, b) => {
            if (sortBy === 'priceAsc') return a.price - b.price;
            if (sortBy === 'priceDesc') return b.price - a.price;
            if (sortBy === 'ratingDesc') return (b.rating ?? 0) - (a.rating ?? 0);
            const dateA = new Date(a.releaseDate ?? '1970-01-01').getTime();
            const dateB = new Date(b.releaseDate ?? '1970-01-01').getTime();
            return dateB - dateA;
        });
    }, [category, minPrice, maxPrice, rating, sortBy]);

    const pageCount = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));

    const pageItems = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return filteredProducts.slice(start, start + PAGE_SIZE);
    }, [filteredProducts, page]);

    return (
        <div className={clsx(
            'min-h-screen py-16',
            theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'
        )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                    <Link href="/" className="transition hover:text-slate-900">Home</Link>
                    <span>›</span>
                    <span className={clsx('font-semibold', theme === 'dark' ? 'text-slate-200' : 'text-slate-900')}>
                        Laptops
                    </span>
                </nav>

                <div className="mt-12 grid gap-8 xl:grid-cols-[320px_minmax(0,1fr)]">
                    <aside className={clsx(
                        'rounded-4xl border p-6 shadow-sm',
                        theme === 'dark' ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'
                    )}>
                        <div className="mb-6 flex items-center gap-2 text-slate-500">
                            <Funnel className="h-4 w-4" />
                            <span className="text-sm font-semibold uppercase tracking-[0.25em]">Filters</span>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h2 className={clsx('text-sm font-semibold uppercase tracking-[0.18em] mb-4', theme === 'dark' ? 'text-slate-400' : 'text-slate-600')}>
                                    Category
                                </h2>
                                <div className="grid gap-3">
                                    {CATEGORY_OPTIONS.map((option) => (
                                        <button
                                            key={option}
                                            type="button"
                                            onClick={() => {
                                                setCategory(option);
                                                setPage(1);
                                            }}
                                            className={clsx(
                                                'rounded-2xl px-4 py-3 text-left text-sm font-medium transition duration-200',
                                                category === option
                                                    ? 'bg-sky-600 text-white shadow-lg'
                                                    : theme === 'dark'
                                                        ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                            )}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2 className={clsx('text-sm font-semibold uppercase tracking-[0.18em] mb-4', theme === 'dark' ? 'text-slate-400' : 'text-slate-600')}>
                                    Price range
                                </h2>
                                <div className="grid gap-3">
                                    {PRICE_RANGES.map((range) => (
                                        <button
                                            key={range.id}
                                            type="button"
                                            onClick={() => {
                                                setPriceRange(range.id);
                                                setCustomMin('');
                                                setCustomMax('');
                                                setPage(1);
                                            }}
                                            className={clsx(
                                                'rounded-2xl px-4 py-3 text-left text-sm font-medium transition duration-200',
                                                priceRange === range.id
                                                    ? 'bg-sky-600 text-white shadow-lg'
                                                    : theme === 'dark'
                                                        ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                            )}
                                        >
                                            {range.label}
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-5 space-y-3">
                                    <label className="block text-sm font-semibold text-slate-500">Custom min</label>
                                    <input
                                        type="number"
                                        value={customMin}
                                        onChange={(event) => {
                                            setCustomMin(event.target.value);
                                            setPriceRange('all');
                                            setPage(1);
                                        }}
                                        placeholder="0"
                                        className={clsx(
                                            'w-full rounded-2xl border px-4 py-3 text-sm focus:outline-none focus:ring-2',
                                            theme === 'dark'
                                                ? 'border-slate-700 bg-slate-800 text-slate-100 focus:ring-sky-500'
                                                : 'border-slate-200 bg-white text-slate-900 focus:ring-sky-500'
                                        )}
                                    />
                                    <label className="block text-sm font-semibold text-slate-500">Custom max</label>
                                    <input
                                        type="number"
                                        value={customMax}
                                        onChange={(event) => {
                                            setCustomMax(event.target.value);
                                            setPriceRange('all');
                                            setPage(1);
                                        }}
                                        placeholder="Any"
                                        className={clsx(
                                            'w-full rounded-2xl border px-4 py-3 text-sm focus:outline-none focus:ring-2',
                                            theme === 'dark'
                                                ? 'border-slate-700 bg-slate-800 text-slate-100 focus:ring-sky-500'
                                                : 'border-slate-200 bg-white text-slate-900 focus:ring-sky-500'
                                        )}
                                    />
                                </div>
                            </div>

                            <div>
                                <h2 className={clsx('text-sm font-semibold uppercase tracking-[0.18em] mb-4', theme === 'dark' ? 'text-slate-400' : 'text-slate-600')}>
                                    Rating
                                </h2>
                                <div className="grid gap-3">
                                    {RATING_OPTIONS.map((option) => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => {
                                                setRating(option.value);
                                                setPage(1);
                                            }}
                                            className={clsx(
                                                'rounded-2xl px-4 py-3 text-left text-sm font-medium transition duration-200',
                                                rating === option.value
                                                    ? 'bg-sky-600 text-white shadow-lg'
                                                    : theme === 'dark'
                                                        ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                            )}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    <main>
                        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className={clsx('text-sm font-semibold uppercase tracking-[0.2em]', theme === 'dark' ? 'text-slate-400' : 'text-slate-500')}>
                                    Showing {filteredProducts.length} laptops
                                </p>
                                <p className={clsx('mt-2 text-sm', theme === 'dark' ? 'text-slate-400' : 'text-slate-600')}>
                                    Browse {filteredProducts.length} premium options tailored to your selected filters.
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <label className={clsx('text-sm font-semibold', theme === 'dark' ? 'text-slate-300' : 'text-slate-700')}>
                                    Sort by
                                </label>
                                <select
                                    value={sortBy}
                                    onChange={(event) => {
                                        setSortBy(event.target.value);
                                        setPage(1);
                                    }}
                                    className={clsx(
                                        'rounded-2xl border px-4 py-3 text-sm focus:outline-none focus:ring-2',
                                        theme === 'dark'
                                            ? 'border-slate-700 bg-slate-900 text-slate-100 focus:ring-sky-500'
                                            : 'border-slate-200 bg-white text-slate-900 focus:ring-sky-500'
                                    )}
                                >
                                    {SORT_OPTIONS.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                            {pageItems.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    primaryActionLabel="Add to cart"
                                    onPrimaryAction={() => handleAddToCart(product)}
                                />
                            ))}
                        </div>

                        <div className="mt-10 flex flex-col gap-4 items-center justify-between sm:flex-row">
                            <p className={clsx('text-sm', theme === 'dark' ? 'text-slate-400' : 'text-slate-600')}>
                                Page {page} of {pageCount}
                            </p>

                            <div className="flex flex-wrap items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setPage((current) => Math.max(1, current - 1))}
                                    disabled={page === 1}
                                    className={clsx(
                                        'rounded-full px-5 py-3 text-sm font-semibold transition duration-200',
                                        page === 1
                                            ? 'cursor-not-allowed bg-slate-200 text-slate-400'
                                            : theme === 'dark'
                                                ? 'bg-slate-700 text-slate-100 hover:bg-slate-600'
                                                : 'bg-slate-900 text-white hover:bg-slate-800'
                                    )}
                                >
                                    Previous
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
                                    disabled={page === pageCount}
                                    className={clsx(
                                        'rounded-full px-5 py-3 text-sm font-semibold transition duration-200',
                                        page === pageCount
                                            ? 'cursor-not-allowed bg-slate-200 text-slate-400'
                                            : theme === 'dark'
                                                ? 'bg-slate-700 text-slate-100 hover:bg-slate-600'
                                                : 'bg-slate-900 text-white hover:bg-slate-800'
                                    )}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
