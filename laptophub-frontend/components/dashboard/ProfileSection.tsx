'use client';

import { useState, useEffect } from 'react';
import { User } from '@/types';
import { dashboardApi } from '@/lib/api';
import { toast } from 'react-hot-toast';

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
            <div className="bg-card rounded-lg border p-6">
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
            <div className="bg-card rounded-lg border p-6">
                <p className="text-muted-foreground">Failed to load profile</p>
            </div>
        );
    }

    return (
        <div className="bg-card rounded-lg border">
            <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Profile Information</h2>
            </div>
            <div className="p-6 space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center text-2xl font-semibold">
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">{user.name}</h3>
                        <p className="text-muted-foreground">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Full Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            disabled={!isEditing}
                            className="w-full px-3 py-2 border border-input rounded-md bg-background disabled:opacity-50"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            disabled={!isEditing}
                            className="w-full px-3 py-2 border border-input rounded-md bg-background disabled:opacity-50"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Phone</label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            disabled={!isEditing}
                            className="w-full px-3 py-2 border border-input rounded-md bg-background disabled:opacity-50"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                        >
                            Edit Profile
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
                            >
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button
                                onClick={handleCancel}
                                disabled={saving}
                                className="px-4 py-2 border border-input rounded-md hover:bg-accent"
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