'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import clsx from 'clsx';
import type { CartItem } from '@/types';

interface CartItemProps {
    item: CartItem;
    onUpdateQuantity: (productId: string, quantity: number) => void;
    onRemove: (productId: string) => void;
}

export default function CartItemComponent({
    item,
    onUpdateQuantity,
    onRemove,
}: CartItemProps) {
    const { theme } = useTheme();
    const isImageUrl = typeof item.image === 'string' && /^(https?:\/\/|data:image\/)/.test(item.image);

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 0) {
            onUpdateQuantity(item.id, newQuantity);
        }
    };

    const subtotal = item.price * item.quantity;

    return (
        <div className={clsx(
            'flex gap-6 p-6 rounded-2xl border transition duration-200',
            theme === 'dark' ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
        )}>
            {/* Product Image */}
            <div className={clsx(
                'relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0',
                theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'
            )}>
                {item.image ? (
                    isImageUrl ? (
                        <Image
                            src={item.image}
                            alt={item.imageAlt ?? item.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                        />
                    ) : (
                        <div className={clsx(
                            'w-full h-full flex items-center justify-center text-4xl',
                            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                        )}>
                            {item.image}
                        </div>
                    )
                ) : (
                    <div className={clsx(
                        'w-full h-full flex items-center justify-center text-2xl',
                        theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                    )}>
                        📦
                    </div>
                )}
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <Link
                            href={item.href || `/laptops/${item.id}`}
                            className={clsx(
                                'text-lg font-semibold hover:text-blue-600 transition duration-200 block truncate',
                                theme === 'dark' ? 'text-white' : 'text-slate-900'
                            )}
                        >
                            {item.name}
                        </Link>
                        {item.description && (
                            <p className={clsx(
                                'text-sm mt-1 line-clamp-2',
                                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                            )}>
                                {item.description}
                            </p>
                        )}
                        {item.category && (
                            <p className={clsx(
                                'text-xs uppercase tracking-wide mt-2',
                                theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
                            )}>
                                {item.category}
                            </p>
                        )}
                    </div>

                    {/* Price */}
                    <div className="text-right flex-shrink-0">
                        <p className={clsx(
                            'text-lg font-semibold',
                            theme === 'dark' ? 'text-white' : 'text-slate-900'
                        )}>
                            ${item.price.toLocaleString()}
                        </p>
                        {item.quantity > 1 && (
                            <p className={clsx(
                                'text-sm',
                                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                            )}>
                                each
                            </p>
                        )}
                    </div>
                </div>

                {/* Quantity Controls and Subtotal */}
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleQuantityChange(item.quantity - 1)}
                                className={clsx(
                                    'w-8 h-8 rounded-full flex items-center justify-center transition duration-200',
                                    theme === 'dark'
                                        ? 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                )}
                                aria-label="Decrease quantity"
                            >
                                <Minus className="w-4 h-4" />
                            </button>

                            <span className={clsx(
                                'w-12 text-center font-semibold',
                                theme === 'dark' ? 'text-white' : 'text-slate-900'
                            )}>
                                {item.quantity}
                            </span>

                            <button
                                onClick={() => handleQuantityChange(item.quantity + 1)}
                                className={clsx(
                                    'w-8 h-8 rounded-full flex items-center justify-center transition duration-200',
                                    theme === 'dark'
                                        ? 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                                        : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                                )}
                                aria-label="Increase quantity"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Remove Button */}
                        <button
                            onClick={() => onRemove(item.id)}
                            className={clsx(
                                'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition duration-200',
                                theme === 'dark'
                                    ? 'text-red-400 hover:bg-red-500/10 hover:text-red-300'
                                    : 'text-red-600 hover:bg-red-50 hover:text-red-700'
                            )}
                            aria-label="Remove item"
                        >
                            <Trash2 className="w-4 h-4" />
                            Remove
                        </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right flex-shrink-0">
                        <p className={clsx(
                            'text-lg font-semibold',
                            theme === 'dark' ? 'text-white' : 'text-slate-900'
                        )}>
                            ${subtotal.toLocaleString()}
                        </p>
                        <p className={clsx(
                            'text-sm',
                            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                        )}>
                            subtotal
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}