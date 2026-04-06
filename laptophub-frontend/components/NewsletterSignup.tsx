'use client';

import { Mail } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import clsx from 'clsx';

export default function NewsletterSignup() {
    const { theme } = useTheme();
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle newsletter signup
        alert(`Thank you for subscribing with: ${email}`);
        setEmail('');
    };

    return (
        <section className={clsx(
            "py-20 px-4 sm:px-6 lg:px-8",
            theme === 'dark' ? 'bg-slate-800' : 'bg-blue-600'
        )}>
            <div className="max-w-4xl mx-auto text-center">
                <div className="flex justify-center mb-6">
                    <Mail className={clsx(
                        "w-12 h-12",
                        theme === 'dark' ? 'text-blue-400' : 'text-white'
                    )} />
                </div>
                <h2 className={clsx(
                    "text-4xl font-bold mb-4",
                    theme === 'dark' ? 'text-white' : 'text-white'
                )}>Stay Updated</h2>
                <p className={clsx(
                    "text-xl mb-8 max-w-2xl mx-auto",
                    theme === 'dark' ? 'text-slate-300' : 'text-blue-100'
                )}>
                    Subscribe to our newsletter for the latest laptop deals, new arrivals, and exclusive offers.
                </p>

                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="flex gap-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className={clsx(
                                "flex-1 px-4 py-3 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2",
                                theme === 'dark' ? 'focus:ring-blue-400' : 'focus:ring-white'
                            )}
                            required
                        />
                        <button
                            type="submit"
                            className={clsx(
                                "font-semibold px-6 py-3 rounded-lg transition duration-200 ease-in-out transform hover:scale-105",
                                theme === 'dark'
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-white text-blue-600 hover:bg-slate-100'
                            )}
                        >
                            Subscribe
                        </button>
                    </div>
                </form>

                <p className={clsx(
                    "text-sm mt-4",
                    theme === 'dark' ? 'text-slate-400' : 'text-blue-200'
                )}>
                    We respect your privacy. Unsubscribe at any time.
                </p>
            </div>
        </section>
    );
}