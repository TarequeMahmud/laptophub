'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { useTheme } from '@/components/ThemeProvider';
import ShippingForm from '@/components/ShippingForm';
import PaymentMethod from '@/components/PaymentMethod';
import OrderSummary from '@/components/OrderSummary';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

export interface ShippingData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

export interface PaymentData {
    method: 'card' | 'paypal';
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
    cardholderName?: string;
}

export default function CheckoutPage() {
    const { theme } = useTheme();
    const router = useRouter();
    const { items, getTotalPrice, clearCart } = useCartStore();

    const [currentStep, setCurrentStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
    const [shippingData, setShippingData] = useState<ShippingData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
    });
    const [paymentData, setPaymentData] = useState<PaymentData>({
        method: 'card',
    });

    const totalPrice = getTotalPrice();

    // Redirect if cart is empty
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
                        Add some items to your cart before checking out!
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
                    </Link>
                </div>
            </div>
        );
    }

    const handleShippingSubmit = (data: ShippingData) => {
        setShippingData(data);
        setCurrentStep('payment');
    };

    const handlePaymentSubmit = (data: PaymentData) => {
        setPaymentData(data);
        setCurrentStep('review');
    };

    const handlePlaceOrder = () => {
        // In a real app, this would submit to a payment processor
        alert('Order placed successfully! (This is a demo)');
        clearCart();
        router.push('/');
    };

    const steps = [
        { id: 'shipping', name: 'Shipping', completed: currentStep !== 'shipping' },
        { id: 'payment', name: 'Payment', completed: currentStep === 'review' },
        { id: 'review', name: 'Review', completed: false },
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <Link
                    href="/cart"
                    className={clsx(
                        'inline-flex items-center gap-2 mb-4 text-sm font-medium transition duration-200',
                        theme === 'dark'
                            ? 'text-slate-400 hover:text-white'
                            : 'text-slate-600 hover:text-slate-900'
                    )}
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Cart
                </Link>
                <h1 className={clsx(
                    'text-3xl font-bold',
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                )}>
                    Checkout
                </h1>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
                <div className="flex items-center justify-center">
                    {steps.map((step, index) => (
                        <div key={step.id} className="flex items-center">
                            <div className={clsx(
                                'flex items-center justify-center w-10 h-10 rounded-full border-2 text-sm font-semibold',
                                step.completed
                                    ? 'bg-green-600 border-green-600 text-white'
                                    : currentStep === step.id
                                        ? 'bg-blue-600 border-blue-600 text-white'
                                        : theme === 'dark'
                                            ? 'border-slate-600 text-slate-400 bg-slate-800'
                                            : 'border-slate-300 text-slate-500 bg-white'
                            )}>
                                {step.completed ? '✓' : index + 1}
                            </div>
                            <span className={clsx(
                                'ml-3 text-sm font-medium',
                                step.completed
                                    ? 'text-green-600'
                                    : currentStep === step.id
                                        ? theme === 'dark' ? 'text-white' : 'text-slate-900'
                                        : theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                            )}>
                                {step.name}
                            </span>
                            {index < steps.length - 1 && (
                                <div className={clsx(
                                    'w-12 h-0.5 mx-4',
                                    step.completed ? 'bg-green-600' : theme === 'dark' ? 'bg-slate-600' : 'bg-slate-300'
                                )} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
                {/* Main Content */}
                <div className="space-y-8">
                    {currentStep === 'shipping' && (
                        <ShippingForm
                            initialData={shippingData}
                            onSubmit={handleShippingSubmit}
                            onBack={() => router.push('/cart')}
                        />
                    )}

                    {currentStep === 'payment' && (
                        <PaymentMethod
                            initialData={paymentData}
                            onSubmit={handlePaymentSubmit}
                            onBack={() => setCurrentStep('shipping')}
                        />
                    )}

                    {currentStep === 'review' && (
                        <div className={clsx(
                            'rounded-2xl border p-8',
                            theme === 'dark' ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
                        )}>
                            <h2 className={clsx(
                                'text-2xl font-bold mb-6',
                                theme === 'dark' ? 'text-white' : 'text-slate-900'
                            )}>
                                Review Your Order
                            </h2>

                            {/* Shipping Info */}
                            <div className="mb-6">
                                <h3 className={clsx(
                                    'text-lg font-semibold mb-3',
                                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                                )}>
                                    Shipping Address
                                </h3>
                                <div className={clsx(
                                    'p-4 rounded-lg',
                                    theme === 'dark' ? 'bg-slate-700' : 'bg-slate-50'
                                )}>
                                    <p className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                                        {shippingData.firstName} {shippingData.lastName}<br />
                                        {shippingData.address}<br />
                                        {shippingData.city}, {shippingData.state} {shippingData.zipCode}<br />
                                        {shippingData.country}
                                    </p>
                                </div>
                            </div>

                            {/* Payment Info */}
                            <div className="mb-6">
                                <h3 className={clsx(
                                    'text-lg font-semibold mb-3',
                                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                                )}>
                                    Payment Method
                                </h3>
                                <div className={clsx(
                                    'p-4 rounded-lg',
                                    theme === 'dark' ? 'bg-slate-700' : 'bg-slate-50'
                                )}>
                                    <p className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                                        {paymentData.method === 'card' ? 'Credit/Debit Card' : 'PayPal'}
                                        {paymentData.cardNumber && (
                                            <><br />•••• •••• •••• {paymentData.cardNumber.slice(-4)}</>
                                        )}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setCurrentStep('payment')}
                                    className={clsx(
                                        'flex-1 px-6 py-3 rounded-xl font-semibold transition duration-200 border',
                                        theme === 'dark'
                                            ? 'border-slate-600 bg-slate-700 text-slate-300 hover:bg-slate-600'
                                            : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                                    )}
                                >
                                    Edit Payment
                                </button>
                                <button
                                    onClick={handlePlaceOrder}
                                    className={clsx(
                                        'flex-1 px-6 py-3 rounded-xl font-semibold transition duration-200',
                                        theme === 'dark'
                                            ? 'bg-blue-600 text-white hover:bg-blue-500'
                                            : 'bg-slate-900 text-white hover:bg-slate-800'
                                    )}
                                >
                                    Place Order
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Order Summary Sidebar */}
                <div className="lg:sticky lg:top-8">
                    <OrderSummary
                        items={items}
                        totalPrice={totalPrice}
                        shippingData={currentStep !== 'shipping' ? shippingData : undefined}
                    />
                </div>
            </div>
        </div>
    );
}