'use client';

import Image from 'next/image';
import { useTheme } from '@/components/ThemeProvider';
import { CartItem } from '@/types';
import { ShippingData } from '@/app/checkout/page';
import clsx from 'clsx';

interface OrderSummaryProps {
    items: CartItem[];
    totalPrice: number;
    shippingData?: ShippingData;
}

export default function OrderSummary({ items, totalPrice, shippingData }: OrderSummaryProps) {
    const { theme } = useTheme();

    // Calculate additional costs
    const subtotal = totalPrice;
    const shipping = subtotal > 100 ? 0 : 9.99; // Free shipping over $100
    const tax = subtotal * 0.08; // 8% tax
    const finalTotal = subtotal + shipping + tax;

    return (
        <div className={clsx(
            'rounded-2xl border p-6 sticky top-8',
            theme === 'dark' ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
        )}>
            <h2 className={clsx(
                'text-xl font-bold mb-6',
                theme === 'dark' ? 'text-white' : 'text-slate-900'
            )}>
                Order Summary
            </h2>

            {/* Order Items */}
            <div className="space-y-4 mb-6">
                {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                        <div className={clsx(
                            'relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0',
                            theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'
                        )}>
                            {item.image ? (
                                typeof item.image === 'string' && /^(https?:\/\/|data:image\/)/.test(item.image) ? (
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                        sizes="48px"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-lg">
                                        {item.image}
                                    </div>
                                )
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-lg">
                                    📦
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className={clsx(
                                'font-medium truncate',
                                theme === 'dark' ? 'text-white' : 'text-slate-900'
                            )}>
                                {item.name}
                            </h3>
                            <p className={clsx(
                                'text-sm',
                                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                            )}>
                                Qty: {item.quantity}
                            </p>
                        </div>
                        <div className={clsx(
                            'font-semibold',
                            theme === 'dark' ? 'text-white' : 'text-slate-900'
                        )}>
                            ${(item.price * item.quantity).toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>

            {/* Shipping Address Preview */}
            {shippingData && (
                <div className="mb-6 p-4 rounded-lg bg-slate-50 dark:bg-slate-700">
                    <h3 className={clsx(
                        'text-sm font-semibold mb-2',
                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                    )}>
                        Shipping to:
                    </h3>
                    <p className={clsx(
                        'text-sm',
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    )}>
                        {shippingData.firstName} {shippingData.lastName}<br />
                        {shippingData.address}<br />
                        {shippingData.city}, {shippingData.state} {shippingData.zipCode}
                    </p>
                </div>
            )}

            {/* Price Breakdown */}
            <div className="space-y-3 border-t pt-4 border-slate-200 dark:border-slate-700">
                <div className="flex justify-between text-sm">
                    <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                        Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)
                    </span>
                    <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>
                        ${subtotal.toLocaleString()}
                    </span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                        Shipping
                    </span>
                    <span className={clsx(
                        shipping === 0
                            ? 'text-green-600 font-medium'
                            : theme === 'dark' ? 'text-white' : 'text-slate-900'
                    )}>
                        {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                        Tax
                    </span>
                    <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>
                        ${tax.toFixed(2)}
                    </span>
                </div>

                <div className={clsx(
                    'flex justify-between text-lg font-bold pt-3 border-t',
                    theme === 'dark' ? 'border-slate-600 text-white' : 'border-slate-300 text-slate-900'
                )}>
                    <span>Total</span>
                    <span>${finalTotal.toLocaleString()}</span>
                </div>
            </div>

            {/* Shipping Notice */}
            {subtotal < 100 && (
                <div className={clsx(
                    'mt-4 p-3 rounded-lg text-sm',
                    theme === 'dark' ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-50 text-amber-700'
                )}>
                    Add ${(100 - subtotal).toLocaleString()} more for free shipping!
                </div>
            )}
        </div>
    );
}