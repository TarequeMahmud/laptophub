'use client';

import { useCartStore } from '@/store/cartStore';
import { useTheme } from '@/components/ThemeProvider';
import CartItem from '@/components/CartItem';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

export default function CartPage() {
    const { theme } = useTheme();
    const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore();

    const totalPrice = getTotalPrice();
    const itemCount = items.length;
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <div className={clsx(
                        'w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center',
                        theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'
                    )}>
                        <ShoppingBag className={clsx(
                            'w-12 h-12',
                            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                        )} />
                    </div>
                    <h1 className={clsx(
                        'text-2xl font-bold mb-4',
                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                    )}>
                        Your cart is empty
                    </h1>
                    <p className={clsx(
                        'text-lg mb-8',
                        theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                    )}>
                        Add some laptops to get started!
                    </p>
                    <Link
                        href="/laptops"
                        className={clsx(
                            'inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition duration-200',
                            theme === 'dark'
                                ? 'bg-blue-600 text-white hover:bg-blue-500'
                                : 'bg-slate-900 text-white hover:bg-slate-800'
                        )}
                    >
                        Browse Laptops
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className={clsx(
                    'text-3xl font-bold mb-2',
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                )}>
                    Shopping Cart
                </h1>
                <p className={clsx(
                    'text-lg',
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                )}>
                    {itemCount} {itemCount === 1 ? 'item' : 'items'} ({totalItems} total)
                </p>
            </div>

            {/* Cart Items */}
            <div className="space-y-6 mb-8">
                {items.map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeItem}
                    />
                ))}
            </div>

            {/* Cart Summary */}
            <div className={clsx(
                'rounded-2xl border p-6',
                theme === 'dark' ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
            )}>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className={clsx(
                            'text-xl font-semibold mb-1',
                            theme === 'dark' ? 'text-white' : 'text-slate-900'
                        )}>
                            Order Summary
                        </h2>
                        <p className={clsx(
                            'text-sm',
                            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                        )}>
                            {totalItems} {totalItems === 1 ? 'item' : 'items'}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className={clsx(
                            'text-3xl font-bold',
                            theme === 'dark' ? 'text-white' : 'text-slate-900'
                        )}>
                            ${totalPrice.toLocaleString()}
                        </p>
                        <p className={clsx(
                            'text-sm uppercase tracking-wide',
                            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                        )}>
                            Total
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={clearCart}
                        className={clsx(
                            'flex-1 px-6 py-3 rounded-xl font-semibold transition duration-200 border',
                            theme === 'dark'
                                ? 'border-slate-600 bg-slate-700 text-slate-300 hover:bg-slate-600'
                                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                        )}
                    >
                        Clear Cart
                    </button>
                    <Link href="/checkout" className="block">
                        <button
                            className={clsx(
                                'w-full px-6 py-3 rounded-xl font-semibold transition duration-200 flex items-center justify-center gap-2',
                                theme === 'dark'
                                    ? 'bg-blue-600 text-white hover:bg-blue-500'
                                    : 'bg-slate-900 text-white hover:bg-slate-800'
                            )}
                        >
                            Proceed to Checkout
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </Link>
                </div>
            </div>

            {/* Continue Shopping */}
            <div className="text-center mt-8">
                <Link
                    href="/laptops"
                    className={clsx(
                        'inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition duration-200',
                        theme === 'dark'
                            ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    )}
                >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
}