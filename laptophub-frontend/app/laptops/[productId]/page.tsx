'use client';

import Link from 'next/link';
import { useTheme } from '@/components/ThemeProvider';
import { useCartStore } from '@/store/cartStore';
import { getLaptopById, LAPTOP_PRODUCTS } from '@/lib/laptops';
import { ArrowLeft, Monitor, Star, Tag, ShoppingCart, Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { useState, use } from 'react';
import clsx from 'clsx';

interface LaptopDetailPageProps {
    params: {
        productId: string;
    };
}

interface Review {
    id: string;
    user: string;
    rating: number;
    date: string;
    title: string;
    content: string;
    verified: boolean;
    helpful: number;
}

const SAMPLE_REVIEWS: Review[] = [
    {
        id: 'r1',
        user: 'Sarah Johnson',
        rating: 5,
        date: '2026-03-15',
        title: 'Exceptional performance and build quality',
        content: 'This laptop exceeded my expectations. The performance is outstanding for both work and entertainment. The build quality feels premium and the battery life is impressive.',
        verified: true,
        helpful: 24
    },
    {
        id: 'r2',
        user: 'Mike Chen',
        rating: 4,
        date: '2026-03-08',
        title: 'Great for professional work',
        content: 'Perfect for my graphic design work. The display is vibrant and accurate. Only minor complaint is the fan can get loud under heavy load, but that\'s expected for this performance level.',
        verified: true,
        helpful: 18
    },
    {
        id: 'r3',
        user: 'Emily Davis',
        rating: 5,
        date: '2026-02-28',
        title: 'Best laptop I\'ve ever owned',
        content: 'After using this for a month, I can confidently say this is the best laptop purchase I\'ve made. Everything from the keyboard feel to the screen quality is top-notch.',
        verified: false,
        helpful: 31
    }
];

export default function LaptopDetailPage({ params }: LaptopDetailPageProps) {
    const { theme } = useTheme();
    const resolvedParams = use(params as unknown as Promise<LaptopDetailPageProps['params']>);
    const addItem = useCartStore((state) => state.addItem);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const product = getLaptopById(resolvedParams.productId);

    if (!product) {
        return (
            <div className={clsx(
                'min-h-screen py-16',
                theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
            )}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href="/laptops" className={clsx(
                        'inline-flex items-center gap-2 text-sm font-semibold',
                        theme === 'dark' ? 'text-slate-200' : 'text-slate-900'
                    )}>
                        <ArrowLeft className="w-4 h-4" />
                        Back to laptops
                    </Link>

                    <div className={clsx(
                        'mt-16 rounded-4xl border p-12 text-center',
                        theme === 'dark' ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'
                    )}>
                        <h1 className="text-3xl font-semibold">Laptop not found</h1>
                        <p className="mt-4 text-sm text-slate-500">The requested product could not be located in our catalog.</p>
                    </div>
                </div>
            </div>
        );
    }

    // Sample product images - in a real app, these would come from the product data
    const productImages = [
        product.image,
        '📸', // Additional sample images
        '🔧',
        '⚡'
    ];

    const relatedProducts = LAPTOP_PRODUCTS.filter((item) => item.id !== product.id).slice(0, 3);
    const averageRating = product.rating ?? 0;
    const totalReviews = product.reviews ?? 0;

    const handleAddToCart = () => {
        addItem(product, quantity);
        toast.success(`${product.name} (${quantity}) added to cart!`, { icon: '🛒' });
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: product.name,
                text: product.description,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success('Link copied to clipboard!');
        }
    };

    return (
        <div className={clsx(
            'min-h-screen py-16',
            theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
        )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                    <Link href="/" className="transition hover:text-slate-900">Home</Link>
                    <span>›</span>
                    <Link href="/laptops" className="transition hover:text-slate-900">Laptops</Link>
                    <span>›</span>
                    <span className={clsx('font-semibold', theme === 'dark' ? 'text-slate-200' : 'text-slate-900')}>
                        {product.name}
                    </span>
                </nav>

                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <Link href="/laptops" className={clsx(
                            'inline-flex items-center gap-2 text-sm font-semibold transition duration-200',
                            theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-slate-900'
                        )}>
                            <ArrowLeft className="w-4 h-4" />
                            Back to laptops
                        </Link>
                        <p className={clsx(
                            'mt-4 text-sm uppercase tracking-[0.25em]',
                            theme === 'dark' ? 'text-slate-500' : 'text-slate-600'
                        )}>
                            Laptop details
                        </p>
                        <h1 className={clsx(
                            'mt-4 text-4xl font-semibold tracking-tight',
                            theme === 'dark' ? 'text-white' : 'text-slate-950'
                        )}>
                            {product.name}
                        </h1>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <span className={clsx(
                            'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em]',
                            theme === 'dark' ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-700'
                        )}>
                            <Tag className="w-4 h-4" />
                            {product.category ?? 'Laptop'}
                        </span>
                        <span className={clsx(
                            'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em]',
                            product.availability === 'Out of Stock'
                                ? 'bg-rose-500 text-white'
                                : product.availability === 'Limited Stock'
                                    ? 'bg-amber-500 text-slate-950'
                                    : theme === 'dark'
                                        ? 'bg-slate-800 text-slate-200'
                                        : 'bg-slate-100 text-slate-700'
                        )}>
                            {product.availability ?? 'In Stock'}
                        </span>
                    </div>
                </div>

                <div className="grid gap-10 xl:grid-cols-[1.4fr_0.8fr]">
                    {/* Main Content */}
                    <section className="space-y-8">
                        {/* Product Images */}
                        <div className={clsx(
                            'rounded-4xl border p-8 shadow-xl',
                            theme === 'dark' ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'
                        )}>
                            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] items-start">
                                {/* Main Image */}
                                <div className="space-y-4">
                                    <div className={clsx(
                                        'relative rounded-3xl overflow-hidden aspect-square flex items-center justify-center text-9xl',
                                        theme === 'dark' ? 'bg-slate-800 text-slate-100' : 'bg-slate-100 text-slate-900'
                                    )}>
                                        {productImages[selectedImageIndex]}
                                        <div className="absolute inset-0 flex items-center justify-between px-4">
                                            <button
                                                onClick={() => setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : productImages.length - 1))}
                                                className={clsx(
                                                    'rounded-full p-2 transition',
                                                    theme === 'dark' ? 'bg-slate-700/80 text-white hover:bg-slate-600' : 'bg-white/80 text-slate-900 hover:bg-slate-50'
                                                )}
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => setSelectedImageIndex((prev) => (prev < productImages.length - 1 ? prev + 1 : 0))}
                                                className={clsx(
                                                    'rounded-full p-2 transition',
                                                    theme === 'dark' ? 'bg-slate-700/80 text-white hover:bg-slate-600' : 'bg-white/80 text-slate-900 hover:bg-slate-50'
                                                )}
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                    {/* Thumbnail Images */}
                                    <div className="flex gap-3 justify-center">
                                        {productImages.map((image, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedImageIndex(index)}
                                                className={clsx(
                                                    'rounded-2xl p-3 text-3xl transition',
                                                    selectedImageIndex === index
                                                        ? theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-900'
                                                        : theme === 'dark' ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                )}
                                            >
                                                {image}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="space-y-6">
                                    <div className="flex flex-wrap items-center gap-3">
                                        {product.badge ? (
                                            <span className={clsx(
                                                'rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em]',
                                                product.badge === 'Best Seller'
                                                    ? 'bg-yellow-500 text-slate-950'
                                                    : product.badge === 'Sale'
                                                        ? 'bg-rose-500 text-white'
                                                        : 'bg-sky-600 text-white'
                                            )}>
                                                {product.badge}
                                            </span>
                                        ) : null}
                                        <div className={clsx(
                                            'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em]',
                                            theme === 'dark' ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-700'
                                        )}>
                                            <Star className="w-4 h-4 text-amber-400" />
                                            {averageRating.toFixed(1)} / 5
                                            <span className="text-slate-400">({totalReviews} reviews)</span>
                                        </div>
                                    </div>

                                    <p className={clsx(
                                        'text-lg leading-8',
                                        theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                                    )}>
                                        {product.description}
                                    </p>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className={clsx(
                                            'rounded-3xl border p-5',
                                            theme === 'dark' ? 'border-slate-700 bg-slate-950' : 'border-slate-200 bg-slate-50'
                                        )}>
                                            <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Price</p>
                                            <div className="mt-3 flex items-baseline gap-4">
                                                <span className={clsx(
                                                    'text-4xl font-semibold',
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

                                        <div className={clsx(
                                            'rounded-3xl border p-5',
                                            theme === 'dark' ? 'border-slate-700 bg-slate-950' : 'border-slate-200 bg-slate-50'
                                        )}>
                                            <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Release date</p>
                                            <p className="mt-3 text-lg font-semibold">{product.releaseDate}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {product.tags?.map((tag) => (
                                            <span
                                                key={tag}
                                                className={clsx(
                                                    'rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-[0.18em]',
                                                    theme === 'dark' ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-700'
                                                )}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Description */}
                        <div className={clsx(
                            'rounded-4xl border p-8 shadow-xl',
                            theme === 'dark' ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'
                        )}>
                            <h2 className={clsx(
                                'text-2xl font-semibold mb-6',
                                theme === 'dark' ? 'text-white' : 'text-slate-950'
                            )}>
                                Product Description
                            </h2>
                            <div className="prose prose-lg max-w-none">
                                <p className={clsx(
                                    'text-lg leading-8 mb-6',
                                    theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                                )}>
                                    {product.description}
                                </p>
                                <p className={clsx(
                                    'text-base leading-7 mb-6',
                                    theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                                )}>
                                    This premium laptop combines cutting-edge technology with elegant design, making it perfect for professionals, students, and enthusiasts alike. Experience unparalleled performance with the latest hardware and innovative features that set new standards in computing.
                                </p>
                                <ul className={clsx(
                                    'space-y-2 text-base leading-7',
                                    theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                                )}>
                                    <li>• Advanced cooling system for optimal performance</li>
                                    <li>• Premium build quality with attention to detail</li>
                                    <li>• Long-lasting battery for all-day productivity</li>
                                    <li>• Comprehensive warranty and support</li>
                                </ul>
                            </div>
                        </div>

                        {/* Technical Specifications */}
                        <div className={clsx(
                            'rounded-4xl border p-8 shadow-xl',
                            theme === 'dark' ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'
                        )}>
                            <h2 className={clsx(
                                'text-2xl font-semibold mb-6',
                                theme === 'dark' ? 'text-white' : 'text-slate-950'
                            )}>
                                Technical Specifications
                            </h2>
                            <dl className="grid gap-y-4 gap-x-8 sm:grid-cols-2">
                                {product.specs ? Object.entries(product.specs).map(([label, value]) => (
                                    <div key={label} className="flex flex-col gap-1">
                                        <dt className={clsx('text-sm uppercase tracking-[0.18em]', theme === 'dark' ? 'text-slate-400' : 'text-slate-500')}>
                                            {label}
                                        </dt>
                                        <dd className={clsx('text-base font-semibold', theme === 'dark' ? 'text-white' : 'text-slate-900')}>
                                            {value}
                                        </dd>
                                    </div>
                                )) : null}
                            </dl>
                        </div>

                        {/* Features */}
                        <div className={clsx(
                            'rounded-4xl border p-8 shadow-xl',
                            theme === 'dark' ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'
                        )}>
                            <h2 className={clsx(
                                'text-2xl font-semibold mb-6',
                                theme === 'dark' ? 'text-white' : 'text-slate-950'
                            )}>
                                Key Features
                            </h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {product.features?.map((feature) => (
                                    <div
                                        key={feature}
                                        className={clsx(
                                            'rounded-3xl border p-5',
                                            theme === 'dark' ? 'border-slate-700 bg-slate-950' : 'border-slate-200 bg-slate-50'
                                        )}
                                    >
                                        <p className={clsx('text-sm font-semibold uppercase tracking-[0.18em]', theme === 'dark' ? 'text-slate-400' : 'text-slate-500')}>
                                            {feature}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews Section */}
                        <div className={clsx(
                            'rounded-4xl border p-8 shadow-xl',
                            theme === 'dark' ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'
                        )}>
                            <div className="flex items-center justify-between mb-8">
                                <h2 className={clsx(
                                    'text-2xl font-semibold',
                                    theme === 'dark' ? 'text-white' : 'text-slate-950'
                                )}>
                                    Customer Reviews
                                </h2>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Star className="w-5 h-5 text-amber-400" />
                                        <span className="font-semibold">{averageRating.toFixed(1)}</span>
                                        <span className="text-slate-500">({totalReviews} reviews)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {SAMPLE_REVIEWS.map((review) => (
                                    <div key={review.id} className={clsx(
                                        'rounded-3xl border p-6',
                                        theme === 'dark' ? 'border-slate-700 bg-slate-950' : 'border-slate-200 bg-slate-50'
                                    )}>
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h4 className="font-semibold">{review.user}</h4>
                                                    {review.verified && (
                                                        <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                                                            Verified Purchase
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="flex">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={clsx(
                                                                    'w-4 h-4',
                                                                    i < review.rating ? 'text-amber-400' : 'text-slate-300'
                                                                )}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-sm text-slate-500">{review.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <h5 className="font-semibold mb-2">{review.title}</h5>
                                        <p className={clsx(
                                            'text-sm leading-6 mb-4',
                                            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                                        )}>
                                            {review.content}
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <button className="text-sm text-slate-500 hover:text-slate-700">
                                                👍 Helpful ({review.helpful})
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Sidebar */}
                    <aside className="space-y-8">
                        {/* Add to Cart Card */}
                        <div className={clsx(
                            'rounded-4xl border p-6 shadow-xl sticky top-8',
                            theme === 'dark' ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'
                        )}>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className={clsx('text-sm uppercase tracking-[0.18em] text-slate-500')}>Price</p>
                                        <div className="flex items-baseline gap-3 mt-2">
                                            <span className={clsx(
                                                'text-3xl font-semibold',
                                                theme === 'dark' ? 'text-white' : 'text-slate-900'
                                            )}>
                                                ${product.price.toLocaleString()}
                                            </span>
                                            {product.originalPrice && product.originalPrice > product.price ? (
                                                <span className={clsx(
                                                    'text-sm line-through text-slate-500'
                                                )}>
                                                    ${product.originalPrice.toLocaleString()}
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>
                                    <span className={clsx(
                                        'rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]',
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
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Quantity</label>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className={clsx(
                                                    'rounded-full p-2 transition',
                                                    theme === 'dark' ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                                                )}
                                            >
                                                -
                                            </button>
                                            <span className="w-12 text-center font-semibold">{quantity}</span>
                                            <button
                                                onClick={() => setQuantity(quantity + 1)}
                                                className={clsx(
                                                    'rounded-full p-2 transition',
                                                    theme === 'dark' ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                                                )}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleAddToCart}
                                        className={clsx(
                                            'w-full rounded-full px-5 py-3 text-sm font-semibold transition duration-200 flex items-center justify-center gap-2',
                                            theme === 'dark' ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-slate-900 text-white hover:bg-slate-800'
                                        )}
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                        Add to cart
                                    </button>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => toast.success('Added to wishlist!')}
                                            className={clsx(
                                                'flex-1 rounded-full px-4 py-3 text-sm font-semibold transition duration-200 flex items-center justify-center gap-2',
                                                theme === 'dark' ? 'border border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700' : 'border border-slate-200 bg-white text-slate-900 hover:bg-slate-50'
                                            )}
                                        >
                                            <Heart className="w-4 h-4" />
                                            Wishlist
                                        </button>
                                        <button
                                            onClick={handleShare}
                                            className={clsx(
                                                'flex-1 rounded-full px-4 py-3 text-sm font-semibold transition duration-200 flex items-center justify-center gap-2',
                                                theme === 'dark' ? 'border border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700' : 'border border-slate-200 bg-white text-slate-900 hover:bg-slate-50'
                                            )}
                                        >
                                            <Share2 className="w-4 h-4" />
                                            Share
                                        </button>
                                    </div>
                                </div>

                                <div className={clsx(
                                    'rounded-3xl border p-4',
                                    theme === 'dark' ? 'border-slate-700 bg-slate-950' : 'border-slate-200 bg-slate-50'
                                )}>
                                    <p className={clsx('text-sm uppercase tracking-[0.18em] text-slate-500 mb-3')}>What's included</p>
                                    <ul className="space-y-2 text-sm leading-6 text-slate-500">
                                        <li>• Laptop unit</li>
                                        <li>• Power adapter</li>
                                        <li>• USB-C cable</li>
                                        <li>• Quick start guide</li>
                                        <li>• Warranty information</li>
                                    </ul>
                                </div>

                                <div className={clsx(
                                    'rounded-3xl border p-4',
                                    theme === 'dark' ? 'border-slate-700 bg-slate-950' : 'border-slate-200 bg-slate-50'
                                )}>
                                    <p className={clsx('text-sm uppercase tracking-[0.18em] text-slate-500 mb-3')}>Shipping & Returns</p>
                                    <ul className="space-y-2 text-sm leading-6 text-slate-500">
                                        <li>• Free shipping</li>
                                        <li>• 30-day returns</li>
                                        <li>• 2-year warranty</li>
                                        <li>• 24/7 support</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Related Products */}
                        <div className={clsx(
                            'rounded-4xl border p-6 shadow-sm',
                            theme === 'dark' ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'
                        )}>
                            <div className="mb-5 flex items-center gap-3">
                                <Monitor className="h-5 w-5 text-sky-500" />
                                <h3 className={clsx('text-lg font-semibold', theme === 'dark' ? 'text-white' : 'text-slate-950')}>Related laptops</h3>
                            </div>
                            <div className="space-y-4">
                                {relatedProducts.map((item) => (
                                    <Link key={item.id} href={item.href ?? '#'} className={clsx(
                                        'block rounded-3xl border p-4 transition duration-200 hover:border-sky-500',
                                        theme === 'dark' ? 'border-slate-700 bg-slate-950 text-slate-100' : 'border-slate-200 bg-slate-50 text-slate-900'
                                    )}>
                                        <div className="flex items-center justify-between gap-4">
                                            <div>
                                                <p className="font-semibold">{item.name}</p>
                                                <p className="text-sm text-slate-500">{item.category}</p>
                                            </div>
                                            <span className="text-sm font-semibold">${item.price.toLocaleString()}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
