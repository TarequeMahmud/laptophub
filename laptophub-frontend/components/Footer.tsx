'use client';

import { Globe, MessageCircle, Camera, Play, Mail, Phone, MapPin } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import clsx from 'clsx';

export default function Footer() {
    const { theme } = useTheme();

    return (
        <footer className={clsx(
            "",
            theme === 'dark' ? 'bg-slate-900' : 'bg-slate-900'
        )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold mb-4 text-white">LaptopHub</h3>
                        <p className={clsx(
                            "mb-6 max-w-md",
                            theme === 'dark' ? 'text-slate-300' : 'text-slate-300'
                        )}>
                            Your trusted destination for premium laptops. We offer the best selection of laptops
                            for gaming, work, and everyday use with exceptional customer service.
                        </p>
                        <div className="flex space-x-4">
                            <Globe className="w-6 h-6 text-slate-400 hover:text-white cursor-pointer transition-colors" />
                            <MessageCircle className="w-6 h-6 text-slate-400 hover:text-white cursor-pointer transition-colors" />
                            <Camera className="w-6 h-6 text-slate-400 hover:text-white cursor-pointer transition-colors" />
                            <Play className="w-6 h-6 text-slate-400 hover:text-white cursor-pointer transition-colors" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className={clsx(
                                "hover:text-white transition-colors",
                                theme === 'dark' ? 'text-slate-300' : 'text-slate-300'
                            )}>About Us</a></li>
                            <li><a href="#" className={clsx(
                                "hover:text-white transition-colors",
                                theme === 'dark' ? 'text-slate-300' : 'text-slate-300'
                            )}>Products</a></li>
                            <li><a href="#" className={clsx(
                                "hover:text-white transition-colors",
                                theme === 'dark' ? 'text-slate-300' : 'text-slate-300'
                            )}>Deals</a></li>
                            <li><a href="#" className={clsx(
                                "hover:text-white transition-colors",
                                theme === 'dark' ? 'text-slate-300' : 'text-slate-300'
                            )}>Support</a></li>
                            <li><a href="#" className={clsx(
                                "hover:text-white transition-colors",
                                theme === 'dark' ? 'text-slate-300' : 'text-slate-300'
                            )}>Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-slate-400" />
                                <span className={clsx(
                                    "",
                                    theme === 'dark' ? 'text-slate-300' : 'text-slate-300'
                                )}>1-800-LAPTOP</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-slate-400" />
                                <span className={clsx(
                                    "",
                                    theme === 'dark' ? 'text-slate-300' : 'text-slate-300'
                                )}>support@laptophub.com</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-slate-400" />
                                <span className={clsx(
                                    "",
                                    theme === 'dark' ? 'text-slate-300' : 'text-slate-300'
                                )}>123 Tech Street, Silicon Valley, CA 94000</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={clsx(
                    "border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center",
                    theme === 'dark' ? 'border-slate-700' : 'border-slate-700'
                )}>
                    <p className={clsx(
                        "text-sm",
                        theme === 'dark' ? 'text-slate-400' : 'text-slate-400'
                    )}>
                        © 2024 LaptopHub. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className={clsx(
                            "hover:text-white text-sm transition-colors",
                            theme === 'dark' ? 'text-slate-400' : 'text-slate-400'
                        )}>Privacy Policy</a>
                        <a href="#" className={clsx(
                            "hover:text-white text-sm transition-colors",
                            theme === 'dark' ? 'text-slate-400' : 'text-slate-400'
                        )}>Terms of Service</a>
                        <a href="#" className={clsx(
                            "hover:text-white text-sm transition-colors",
                            theme === 'dark' ? 'text-slate-400' : 'text-slate-400'
                        )}>Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}