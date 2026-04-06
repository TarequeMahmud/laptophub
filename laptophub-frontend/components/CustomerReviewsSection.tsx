'use client';

import { Star, Quote } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import clsx from 'clsx';

const reviews = [
    {
        name: 'Sarah Johnson',
        rating: 5,
        text: 'Amazing selection of laptops! Found the perfect gaming laptop for my needs. Fast shipping and great customer service.',
        avatar: '👩‍💼',
    },
    {
        name: 'Mike Chen',
        rating: 5,
        text: 'Best prices I\'ve found online. The MacBook Pro I purchased exceeded my expectations. Highly recommend!',
        avatar: '👨‍💻',
    },
    {
        name: 'Emily Davis',
        rating: 4,
        text: 'Great website experience. Easy to navigate and find what I was looking for. Will definitely shop here again.',
        avatar: '👩‍🎓',
    },
];

export default function CustomerReviewsSection() {
    const { theme } = useTheme();

    return (
        <section className={clsx(
            "py-20 px-4 sm:px-6 lg:px-8",
            theme === 'dark' ? 'bg-slate-800' : 'bg-white'
        )}>
            <div className="max-w-7xl mx-auto">
                <h2 className={clsx(
                    "text-4xl font-bold mb-12 text-center",
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                )}>What Our Customers Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, idx) => (
                        <div
                            key={idx}
                            className={clsx(
                                "rounded-lg p-6 relative",
                                theme === 'dark' ? 'bg-slate-700' : 'bg-slate-50'
                            )}
                        >
                            <Quote className="w-8 h-8 text-blue-600 mb-4" />
                            <p className={clsx(
                                "mb-6 italic",
                                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                            )}>"{review.text}"</p>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="text-2xl">{review.avatar}</div>
                                    <div>
                                        <h4 className={clsx(
                                            "font-semibold",
                                            theme === 'dark' ? 'text-white' : 'text-slate-900'
                                        )}>{review.name}</h4>
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-slate-300'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}