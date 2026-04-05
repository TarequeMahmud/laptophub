'use client';

import { ShoppingCart, Search, Tag, Wrench, User, Cpu, Monitor, HardDrive, MemoryStick, CircuitBoard } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import clsx from 'clsx';

export function Navbar() {
    const itemCount = useCartStore((state) => state.getItemCount());

    return (
        <div>
            {/* Main Header */}
            <nav className="bg-slate-900 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="text-2xl font-bold text-blue-400">
                                LaptopHub
                            </Link>
                        </div>

                        {/* Search Bar */}
                        <div className="flex-1 max-w-md mx-8">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full px-4 py-2 pl-10 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                        </div>

                        {/* Header Navigation Links */}
                        <div className="hidden md:flex items-center space-x-6">
                            <Link href="#" className="flex items-center space-x-1 hover:text-blue-400 transition">
                                <Tag size={18} />
                                <span>Offers</span>
                            </Link>
                            <Link href="#" className="flex items-center space-x-1 hover:text-blue-400 transition">
                                <Wrench size={18} />
                                <span>PC Builder</span>
                            </Link>
                            <Link href="#" className="flex items-center space-x-1 hover:text-blue-400 transition">
                                <User size={18} />
                                <span>Account</span>
                            </Link>
                        </div>

                        {/* Cart Icon */}
                        <div className="flex items-center ml-6">
                            <button
                                className={clsx(
                                    'flex items-center space-x-2 px-4 py-2 rounded-lg',
                                    itemCount > 0
                                        ? 'bg-blue-600 hover:bg-blue-700'
                                        : 'bg-slate-700 hover:bg-slate-600',
                                    'transition duration-200'
                                )}
                            >
                                <ShoppingCart size={20} />
                                <span className="font-semibold">
                                    {itemCount > 0 ? `${itemCount}` : 'Cart'}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Secondary Navigation - Computer Components */}
            <nav className="bg-slate-800 text-white border-b border-slate-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center h-12">
                        <div className="flex space-x-8">
                            <Link href="#" className="flex items-center space-x-2 hover:text-blue-400 transition">
                                <Cpu size={16} />
                                <span>Processors</span>
                            </Link>
                            <Link href="#" className="flex items-center space-x-2 hover:text-blue-400 transition">
                                <Monitor size={16} />
                                <span>Graphics Cards</span>
                            </Link>
                            <Link href="#" className="flex items-center space-x-2 hover:text-blue-400 transition">
                                <MemoryStick size={16} />
                                <span>RAM</span>
                            </Link>
                            <Link href="#" className="flex items-center space-x-2 hover:text-blue-400 transition">
                                <HardDrive size={16} />
                                <span>Storage</span>
                            </Link>
                            <Link href="#" className="flex items-center space-x-2 hover:text-blue-400 transition">
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
