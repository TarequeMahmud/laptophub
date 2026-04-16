'use client';

import { useState } from 'react';
import { User, Settings, ShoppingBag } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import clsx from 'clsx';
import ProfileSection from '@/components/dashboard/ProfileSection';
import OrderHistorySection from '@/components/dashboard/OrderHistorySection';
import SettingsSection from '@/components/dashboard/SettingsSection';

const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Order History', icon: ShoppingBag },
    { id: 'settings', label: 'Settings', icon: Settings },
];

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState('profile');
    const { theme } = useTheme();

    const renderTabContent = () => {
        switch (activeTab) {
            case 'profile':
                return <ProfileSection />;
            case 'orders':
                return <OrderHistorySection />;
            case 'settings':
                return <SettingsSection />;
            default:
                return <ProfileSection />;
        }
    };

    return (
        <div className={clsx(
            "min-h-screen",
            theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
        )}>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className={clsx(
                        "text-3xl font-bold",
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    )}>Dashboard</h1>
                    <p className={clsx(
                        "mt-2",
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    )}>Manage your account and view your orders</p>
                </div>

                {/* Tabs */}
                <div className={clsx(
                    "border-b mb-8",
                    theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                )}>
                    <nav className="flex space-x-8">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={clsx(
                                        "flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                                        activeTab === tab.id
                                            ? theme === 'dark'
                                                ? 'border-blue-400 text-blue-400'
                                                : 'border-blue-500 text-blue-600'
                                            : theme === 'dark'
                                                ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    )}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="space-y-6">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
}