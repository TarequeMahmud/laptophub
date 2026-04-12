'use client';

import { useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { PaymentData } from '@/app/checkout/page';
import { CreditCard, Shield, Lock } from 'lucide-react';
import clsx from 'clsx';

interface PaymentMethodProps {
    initialData: PaymentData;
    onSubmit: (data: PaymentData) => void;
    onBack: () => void;
}

export default function PaymentMethod({ initialData, onSubmit, onBack }: PaymentMethodProps) {
    const { theme } = useTheme();
    const [formData, setFormData] = useState<PaymentData>(initialData);
    const [errors, setErrors] = useState<Partial<PaymentData>>({});

    const validateForm = (): boolean => {
        const newErrors: Partial<PaymentData> = {};

        if (formData.method === 'card') {
            if (!formData.cardNumber?.trim()) newErrors.cardNumber = 'Card number is required';
            else if (!/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
                newErrors.cardNumber = 'Invalid card number';
            }

            if (!formData.expiryDate?.trim()) newErrors.expiryDate = 'Expiry date is required';
            else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
                newErrors.expiryDate = 'Invalid expiry date (MM/YY)';
            }

            if (!formData.cvv?.trim()) newErrors.cvv = 'CVV is required';
            else if (!/^\d{3,4}$/.test(formData.cvv)) {
                newErrors.cvv = 'Invalid CVV';
            }

            if (!formData.cardholderName?.trim()) newErrors.cardholderName = 'Cardholder name is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    const handleChange = (field: keyof PaymentData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(' ');
        } else {
            return v;
        }
    };

    const formatExpiryDate = (value: string) => {
        const v = value.replace(/\D/g, '');
        if (v.length >= 2) {
            return v.substring(0, 2) + '/' + v.substring(2, 4);
        }
        return v;
    };

    const inputClasses = clsx(
        'w-full px-4 py-3 rounded-lg border transition duration-200',
        theme === 'dark'
            ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
    );

    const labelClasses = clsx(
        'block text-sm font-medium mb-2',
        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
    );

    const paymentOptionClasses = (selected: boolean) => clsx(
        'flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition duration-200',
        selected
            ? theme === 'dark'
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-blue-500 bg-blue-50'
            : theme === 'dark'
                ? 'border-slate-600 bg-slate-800 hover:border-slate-500'
                : 'border-slate-300 bg-white hover:border-slate-400'
    );

    return (
        <div className={clsx(
            'rounded-2xl border p-8',
            theme === 'dark' ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
        )}>
            <h2 className={clsx(
                'text-2xl font-bold mb-6',
                theme === 'dark' ? 'text-white' : 'text-slate-900'
            )}>
                Payment Method
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Payment Method Selection */}
                <div>
                    <label className={labelClasses}>
                        Select Payment Method *
                    </label>
                    <div className="space-y-3">
                        {/* Credit Card Option */}
                        <div
                            onClick={() => handleChange('method', 'card')}
                            className={paymentOptionClasses(formData.method === 'card')}
                        >
                            <CreditCard className={clsx(
                                'w-6 h-6',
                                formData.method === 'card'
                                    ? 'text-blue-500'
                                    : theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                            )} />
                            <div className="flex-1">
                                <div className={clsx(
                                    'font-medium',
                                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                                )}>
                                    Credit or Debit Card
                                </div>
                                <div className={clsx(
                                    'text-sm',
                                    theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                                )}>
                                    Visa, Mastercard, American Express
                                </div>
                            </div>
                            <div className={clsx(
                                'w-4 h-4 rounded-full border-2 flex items-center justify-center',
                                formData.method === 'card'
                                    ? 'border-blue-500 bg-blue-500'
                                    : theme === 'dark' ? 'border-slate-500' : 'border-slate-300'
                            )}>
                                {formData.method === 'card' && (
                                    <div className="w-2 h-2 rounded-full bg-white" />
                                )}
                            </div>
                        </div>

                        {/* PayPal Option */}
                        <div
                            onClick={() => handleChange('method', 'paypal')}
                            className={paymentOptionClasses(formData.method === 'paypal')}
                        >
                            <div className={clsx(
                                'w-6 h-6 rounded flex items-center justify-center text-xs font-bold',
                                formData.method === 'paypal'
                                    ? 'bg-blue-600 text-white'
                                    : theme === 'dark' ? 'bg-slate-700 text-slate-300' : 'bg-blue-600 text-white'
                            )}>
                                P
                            </div>
                            <div className="flex-1">
                                <div className={clsx(
                                    'font-medium',
                                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                                )}>
                                    PayPal
                                </div>
                                <div className={clsx(
                                    'text-sm',
                                    theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                                )}>
                                    Pay with your PayPal account
                                </div>
                            </div>
                            <div className={clsx(
                                'w-4 h-4 rounded-full border-2 flex items-center justify-center',
                                formData.method === 'paypal'
                                    ? 'border-blue-500 bg-blue-500'
                                    : theme === 'dark' ? 'border-slate-500' : 'border-slate-300'
                            )}>
                                {formData.method === 'paypal' && (
                                    <div className="w-2 h-2 rounded-full bg-white" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card Details Form */}
                {formData.method === 'card' && (
                    <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-2 text-sm">
                            <Shield className="w-4 h-4 text-green-500" />
                            <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                                Your payment information is secure and encrypted
                            </span>
                        </div>

                        <div>
                            <label htmlFor="cardholderName" className={labelClasses}>
                                Cardholder Name *
                            </label>
                            <input
                                type="text"
                                id="cardholderName"
                                value={formData.cardholderName || ''}
                                onChange={(e) => handleChange('cardholderName', e.target.value)}
                                className={inputClasses}
                                placeholder="John Doe"
                            />
                            {errors.cardholderName && (
                                <p className="mt-1 text-sm text-red-500">{errors.cardholderName}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="cardNumber" className={labelClasses}>
                                Card Number *
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="cardNumber"
                                    value={formData.cardNumber || ''}
                                    onChange={(e) => handleChange('cardNumber', formatCardNumber(e.target.value))}
                                    className={inputClasses}
                                    placeholder="1234 5678 9012 3456"
                                    maxLength={19}
                                />
                                <CreditCard className={clsx(
                                    'absolute right-3 top-3.5 w-5 h-5',
                                    theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                                )} />
                            </div>
                            {errors.cardNumber && (
                                <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>
                            )}
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label htmlFor="expiryDate" className={labelClasses}>
                                    Expiry Date *
                                </label>
                                <input
                                    type="text"
                                    id="expiryDate"
                                    value={formData.expiryDate || ''}
                                    onChange={(e) => handleChange('expiryDate', formatExpiryDate(e.target.value))}
                                    className={inputClasses}
                                    placeholder="MM/YY"
                                    maxLength={5}
                                />
                                {errors.expiryDate && (
                                    <p className="mt-1 text-sm text-red-500">{errors.expiryDate}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="cvv" className={labelClasses}>
                                    CVV *
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="cvv"
                                        value={formData.cvv || ''}
                                        onChange={(e) => handleChange('cvv', e.target.value.replace(/\D/g, ''))}
                                        className={inputClasses}
                                        placeholder="123"
                                        maxLength={4}
                                    />
                                    <Lock className={clsx(
                                        'absolute right-3 top-3.5 w-4 h-4',
                                        theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                                    )} />
                                </div>
                                {errors.cvv && (
                                    <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* PayPal Notice */}
                {formData.method === 'paypal' && (
                    <div className={clsx(
                        'p-4 rounded-lg border',
                        theme === 'dark' ? 'border-slate-600 bg-slate-700' : 'border-blue-200 bg-blue-50'
                    )}>
                        <p className={clsx(
                            'text-sm',
                            theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                        )}>
                            You will be redirected to PayPal to complete your payment securely.
                        </p>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6">
                    <button
                        type="button"
                        onClick={onBack}
                        className={clsx(
                            'flex-1 px-6 py-3 rounded-xl font-semibold transition duration-200 border',
                            theme === 'dark'
                                ? 'border-slate-600 bg-slate-700 text-slate-300 hover:bg-slate-600'
                                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                        )}
                    >
                        Back to Shipping
                    </button>
                    <button
                        type="submit"
                        className={clsx(
                            'flex-1 px-6 py-3 rounded-xl font-semibold transition duration-200',
                            theme === 'dark'
                                ? 'bg-blue-600 text-white hover:bg-blue-500'
                                : 'bg-slate-900 text-white hover:bg-slate-800'
                        )}
                    >
                        Review Order
                    </button>
                </div>
            </form>
        </div>
    );
}