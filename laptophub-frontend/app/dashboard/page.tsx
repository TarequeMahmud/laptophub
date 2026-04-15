'use client';

import { useState } from 'react';
import { User, Settings, ShoppingBag } from 'lucide-react';
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
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                    <p className="text-muted-foreground mt-2">Manage your account and view your orders</p>
                </div>

                {/* Tabs */}
                <div className="border-b border-border mb-8">
                    <nav className="flex space-x-8">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                            ? 'border-primary text-primary'
                                            : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                                        }`}
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