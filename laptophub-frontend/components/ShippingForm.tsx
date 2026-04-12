'use client';

import { useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { ShippingData } from '@/app/checkout/page';
import clsx from 'clsx';

interface ShippingFormProps {
    initialData: ShippingData;
    onSubmit: (data: ShippingData) => void;
    onBack: () => void;
}

export default function ShippingForm({ initialData, onSubmit, onBack }: ShippingFormProps) {
    const { theme } = useTheme();
    const [formData, setFormData] = useState<ShippingData>(initialData);
    const [errors, setErrors] = useState<Partial<ShippingData>>({});

    const validateForm = (): boolean => {
        const newErrors: Partial<ShippingData> = {};

        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    const handleChange = (field: keyof ShippingData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
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

    return (
        <div className={clsx(
            'rounded-2xl border p-8',
            theme === 'dark' ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
        )}>
            <h2 className={clsx(
                'text-2xl font-bold mb-6',
                theme === 'dark' ? 'text-white' : 'text-slate-900'
            )}>
                Shipping Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label htmlFor="firstName" className={labelClasses}>
                            First Name *
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleChange('firstName', e.target.value)}
                            className={inputClasses}
                            placeholder="John"
                        />
                        {errors.firstName && (
                            <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="lastName" className={labelClasses}>
                            Last Name *
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleChange('lastName', e.target.value)}
                            className={inputClasses}
                            placeholder="Doe"
                        />
                        {errors.lastName && (
                            <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                        )}
                    </div>
                </div>

                {/* Contact Fields */}
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label htmlFor="email" className={labelClasses}>
                            Email Address *
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className={inputClasses}
                            placeholder="john@example.com"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="phone" className={labelClasses}>
                            Phone Number *
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className={inputClasses}
                            placeholder="(555) 123-4567"
                        />
                        {errors.phone && (
                            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                        )}
                    </div>
                </div>

                {/* Address Field */}
                <div>
                    <label htmlFor="address" className={labelClasses}>
                        Street Address *
                    </label>
                    <input
                        type="text"
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        className={inputClasses}
                        placeholder="123 Main Street"
                    />
                    {errors.address && (
                        <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                    )}
                </div>

                {/* Location Fields */}
                <div className="grid gap-4 md:grid-cols-3">
                    <div>
                        <label htmlFor="city" className={labelClasses}>
                            City *
                        </label>
                        <input
                            type="text"
                            id="city"
                            value={formData.city}
                            onChange={(e) => handleChange('city', e.target.value)}
                            className={inputClasses}
                            placeholder="New York"
                        />
                        {errors.city && (
                            <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="state" className={labelClasses}>
                            State *
                        </label>
                        <input
                            type="text"
                            id="state"
                            value={formData.state}
                            onChange={(e) => handleChange('state', e.target.value)}
                            className={inputClasses}
                            placeholder="NY"
                        />
                        {errors.state && (
                            <p className="mt-1 text-sm text-red-500">{errors.state}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="zipCode" className={labelClasses}>
                            ZIP Code *
                        </label>
                        <input
                            type="text"
                            id="zipCode"
                            value={formData.zipCode}
                            onChange={(e) => handleChange('zipCode', e.target.value)}
                            className={inputClasses}
                            placeholder="10001"
                        />
                        {errors.zipCode && (
                            <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>
                        )}
                    </div>
                </div>

                {/* Country Field */}
                <div>
                    <label htmlFor="country" className={labelClasses}>
                        Country *
                    </label>
                    <select
                        id="country"
                        value={formData.country}
                        onChange={(e) => handleChange('country', e.target.value)}
                        className={inputClasses}
                    >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="Japan">Japan</option>
                    </select>
                </div>

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
                        Back to Cart
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
                        Continue to Payment
                    </button>
                </div>
            </form>
        </div>
    );
}