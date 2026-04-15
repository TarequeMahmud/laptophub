'use client';

import { ShoppingCart, Search, Tag, Wrench, User, Cpu, Monitor, HardDrive, MemoryStick, CircuitBoard, Sun, Moon, Laptop } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useTheme } from '@/components/ThemeProvider';
import clsx from 'clsx';
import { useState, useEffect } from 'react';

export function Navbar() {
    const itemCount = useCartStore((state) => state.getItemCount());
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isCartActive = mounted && itemCount > 0;
    const cartLabel = isCartActive ? `${itemCount}` : 'Cart';

    return (
        <div>
            {/* Main Header */}
            <nav className={clsx(
                "shadow-lg transition-colors duration-200",
                theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
            )}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="text-2xl font-bold text-blue-600">
                                LaptopHub
                            </Link>
                        </div>

                        {/* Search Bar */}
                        <div className="flex-1 max-w-md mx-8">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className={clsx(
                                        "w-full px-4 py-2 pl-10 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200",
                                        theme === 'dark'
                                            ? 'bg-slate-800 text-white border-slate-600 placeholder-slate-400'
                                            : 'bg-white text-slate-900 border-slate-300 placeholder-slate-500'
                                    )}
                                />
                                <Search className={clsx(
                                    "absolute left-3 top-2.5 h-5 w-5",
                                    theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                                )} />
                            </div>
                        </div>

                        {/* Header Navigation Links */}
                        <div className="hidden md:flex items-center space-x-6">
                            <Link href="#" className={clsx(
                                "flex items-center space-x-1 hover:text-blue-600 transition",
                                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                            )}>
                                <Tag size={18} />
                                <span>Offers</span>
                            </Link>
                            <Link href="#" className={clsx(
                                "flex items-center space-x-1 hover:text-blue-600 transition",
                                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                            )}>
                                <Wrench size={18} />
                                <span>PC Builder</span>
                            </Link>
                            <Link href="/dashboard" className={clsx(
                                "flex items-center space-x-1 hover:text-blue-600 transition",
                                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                            )}>
                                <User size={18} />
                                <span>Account</span>
                            </Link>
                        </div>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className={clsx(
                                "p-2 rounded-lg ml-4 hover:bg-opacity-20 transition-colors duration-200",
                                theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-100'
                            )}
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5 text-yellow-400" />
                            ) : (
                                <Moon className="w-5 h-5 text-slate-700" />
                            )}
                        </button>

                        {/* Cart Icon */}
                        <div className="flex items-center ml-6">
                            <Link href="/cart">
                                <button
                                    suppressHydrationWarning
                                    className={clsx(
                                        'flex items-center space-x-2 px-4 py-2 rounded-lg transition duration-200',
                                        isCartActive
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                            : theme === 'dark'
                                                ? 'bg-slate-700 hover:bg-slate-600 text-white'
                                                : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
                                    )}
                                >
                                    <ShoppingCart size={20} />
                                    <span className="font-semibold" suppressHydrationWarning>
                                        {cartLabel}
                                    </span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Secondary Navigation - Computer Components */}
            <nav className={clsx(
                "border-b transition-colors duration-200",
                theme === 'dark' ? 'bg-slate-800 text-white border-slate-700' : 'bg-slate-100 text-slate-900 border-slate-200'
            )}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center h-12">
                        <div className="flex space-x-8">
                            <Link href="/laptops" className={clsx(
                                "flex items-center space-x-2 hover:text-blue-600 transition",
                                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                            )}>
                                <Laptop size={16} />
                                <span>Laptops</span>
                            </Link>
                            <Link href="#" className={clsx(
                                "flex items-center space-x-2 hover:text-blue-600 transition",
                                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                            )}>
                                <Cpu size={16} />
                                <span>Processors</span>
                            </Link>
                            <Link href="#" className={clsx(
                                "flex items-center space-x-2 hover:text-blue-600 transition",
                                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                            )}>
                                <Monitor size={16} />
                                <span>Graphics Cards</span>
                            </Link>
                            <Link href="#" className={clsx(
                                "flex items-center space-x-2 hover:text-blue-600 transition",
                                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                            )}>
                                <MemoryStick size={16} />
                                <span>RAM</span>
                            </Link>
                            <Link href="#" className={clsx(
                                "flex items-center space-x-2 hover:text-blue-600 transition",
                                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                            )}>
                                <HardDrive size={16} />
                                <span>Storage</span>
                            </Link>
                            <Link href="#" className={clsx(
                                "flex items-center space-x-2 hover:text-blue-600 transition",
                                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                            )}>
                                <CircuitBoard size={16} />
                                <span>Motherboards</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
