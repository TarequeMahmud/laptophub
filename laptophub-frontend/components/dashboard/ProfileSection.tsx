'use client';

import { useState, useEffect } from 'react';
import { User } from '@/types';
import { dashboardApi } from '@/lib/api';
import { toast } from 'react-hot-toast';
import { useTheme } from '@/components/ThemeProvider';
import clsx from 'clsx';

export default function ProfileSection() {
    const [user, setUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const { theme } = useTheme();

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const profile = await dashboardApi.getProfile();
            setUser(profile);
            setFormData({
                name: profile.name,
                email: profile.email,
                phone: profile.phone || '',
            });
        } catch (error) {
            console.error('Failed to load profile:', error);
            // Mock data for development
            const mockUser: User = {
                id: '1',
                name: 'John Doe',
                email: 'john.doe@example.com',
                phone: '+1 (555) 123-4567',
                avatar: '',
                createdAt: '2024-01-01T00:00:00Z',
                updatedAt: '2024-01-01T00:00:00Z',
            };
            setUser(mockUser);
            setFormData({
                name: mockUser.name,
                email: mockUser.email,
                phone: mockUser.phone || '',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const updatedUser = await dashboardApi.updateProfile(formData);
            setUser(updatedUser);
            setIsEditing(false);
            toast.success('Profile updated successfully');
        } catch (error) {
            console.error('Failed to update profile:', error);
            toast.error('Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                phone: user.phone || '',
            });
        }
        setIsEditing(false);
    };

    if (loading) {
        return (
            <div className={clsx(
                "bg-card rounded-lg border p-6",
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            )}>
                <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="h-4 bg-muted rounded w-1/3"></div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className={clsx(
                "bg-card rounded-lg border p-6",
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            )}>
                <p className={clsx(
                    "text-muted-foreground",
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                )}>Failed to load profile</p>
            </div>
        );
    }

    return (
        <div className={clsx(
            "bg-card rounded-lg border",
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        )}>
            <div className={clsx(
                "p-6 border-b",
                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
            )}>
                <h2 className={clsx(
                    "text-xl font-semibold",
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                )}>Profile Information</h2>
            </div>
            <div className="p-6 space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-4">
                    <div className={clsx(
                        "w-20 h-20 rounded-full flex items-center justify-center text-2xl font-semibold",
                        theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
                    )}>
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div>
                        <h3 className={clsx(
                            "text-lg font-semibold",
                            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                        )}>{user.name}</h3>
                        <p className={clsx(
                            "",
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        )}>Member since {new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className={clsx(
                            "block text-sm font-medium",
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        )}>Full Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            disabled={!isEditing}
                            className={clsx(
                                "w-full px-3 py-2 border rounded-md disabled:opacity-50",
                                theme === 'dark'
                                    ? 'bg-gray-700 border-gray-600 text-gray-100'
                                    : 'bg-white border-gray-300 text-gray-900'
                            )}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className={clsx(
                            "block text-sm font-medium",
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        )}>Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            disabled={!isEditing}
                            className={clsx(
                                "w-full px-3 py-2 border rounded-md disabled:opacity-50",
                                theme === 'dark'
                                    ? 'bg-gray-700 border-gray-600 text-gray-100'
                                    : 'bg-white border-gray-300 text-gray-900'
                            )}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className={clsx(
                            "block text-sm font-medium",
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        )}>Phone</label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            disabled={!isEditing}
                            className={clsx(
                                "w-full px-3 py-2 border rounded-md disabled:opacity-50",
                                theme === 'dark'
                                    ? 'bg-gray-700 border-gray-600 text-gray-100'
                                    : 'bg-white border-gray-300 text-gray-900'
                            )}
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                        >
                            Edit Profile
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50"
                            >
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button
                                onClick={handleCancel}
                                disabled={saving}
                                className={clsx(
                                    "px-4 py-2 border rounded-md",
                                    theme === 'dark'
                                        ? 'border-gray-600 hover:bg-gray-700 text-gray-300'
                                        : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                                )}
                            >
                                Cancel
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}