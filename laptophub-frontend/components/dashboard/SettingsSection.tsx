'use client';

import { useState, useEffect } from 'react';
import { UserSettings } from '@/types';
import { dashboardApi } from '@/lib/api';
import { toast } from 'react-hot-toast';

export default function SettingsSection() {
    const [settings, setSettings] = useState<UserSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [changePasswordData, setChangePasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [showPasswordChange, setShowPasswordChange] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const userSettings = await dashboardApi.getSettings();
            setSettings(userSettings);
        } catch (error) {
            console.error('Failed to load settings:', error);
            // Mock data for development
            const mockSettings: UserSettings = {
                notifications: {
                    email: true,
                    sms: false,
                    push: true,
                },
                privacy: {
                    profileVisibility: 'public',
                    dataSharing: false,
                },
                preferences: {
                    theme: 'system',
                    language: 'en',
                    currency: 'USD',
                },
            };
            setSettings(mockSettings);
        } finally {
            setLoading(false);
        }
    };

    const handleSettingsChange = (category: keyof UserSettings, key: string, value: any) => {
        if (!settings) return;

        setSettings(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                [category]: {
                    ...prev[category],
                    [key]: value,
                },
            };
        });
    };

    const handleSaveSettings = async () => {
        if (!settings) return;

        setSaving(true);
        try {
            const updatedSettings = await dashboardApi.updateSettings(settings);
            setSettings(updatedSettings);
            toast.success('Settings updated successfully');
        } catch (error) {
            console.error('Failed to update settings:', error);
            toast.error('Failed to update settings');
        } finally {
            setSaving(false);
        }
    };

    const handleChangePassword = async () => {
        if (changePasswordData.newPassword !== changePasswordData.confirmPassword) {
            toast.error('New passwords do not match');
            return;
        }

        setSaving(true);
        try {
            await dashboardApi.changePassword({
                currentPassword: changePasswordData.currentPassword,
                newPassword: changePasswordData.newPassword,
            });
            setChangePasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
            setShowPasswordChange(false);
            toast.success('Password changed successfully');
        } catch (error) {
            console.error('Failed to change password:', error);
            toast.error('Failed to change password');
        } finally {
            setSaving(false);
        }
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

    if (!settings) {
        return (
            <div className="bg-card rounded-lg border p-6">
                <p className="text-muted-foreground">Failed to load settings</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Notifications Settings */}
            <div className="bg-card rounded-lg border">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold">Notifications</h2>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <label className="font-medium">Email Notifications</label>
                            <p className="text-sm text-muted-foreground">Receive order updates and promotions via email</p>
                        </div>
                        <input
                            type="checkbox"
                            checked={settings.notifications.email}
                            onChange={(e) => handleSettingsChange('notifications', 'email', e.target.checked)}
                            className="w-4 h-4"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <label className="font-medium">SMS Notifications</label>
                            <p className="text-sm text-muted-foreground">Receive order updates via SMS</p>
                        </div>
                        <input
                            type="checkbox"
                            checked={settings.notifications.sms}
                            onChange={(e) => handleSettingsChange('notifications', 'sms', e.target.checked)}
                            className="w-4 h-4"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <label className="font-medium">Push Notifications</label>
                            <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                        </div>
                        <input
                            type="checkbox"
                            checked={settings.notifications.push}
                            onChange={(e) => handleSettingsChange('notifications', 'push', e.target.checked)}
                            className="w-4 h-4"
                        />
                    </div>
                </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-card rounded-lg border">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold">Privacy</h2>
                </div>
                <div className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="font-medium">Profile Visibility</label>
                        <select
                            value={settings.privacy.profileVisibility}
                            onChange={(e) => handleSettingsChange('privacy', 'profileVisibility', e.target.value)}
                            className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        >
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <label className="font-medium">Data Sharing</label>
                            <p className="text-sm text-muted-foreground">Allow sharing of anonymized data for analytics</p>
                        </div>
                        <input
                            type="checkbox"
                            checked={settings.privacy.dataSharing}
                            onChange={(e) => handleSettingsChange('privacy', 'dataSharing', e.target.checked)}
                            className="w-4 h-4"
                        />
                    </div>
                </div>
            </div>

            {/* Preferences */}
            <div className="bg-card rounded-lg border">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold">Preferences</h2>
                </div>
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label className="font-medium">Theme</label>
                            <select
                                value={settings.preferences.theme}
                                onChange={(e) => handleSettingsChange('preferences', 'theme', e.target.value)}
                                className="w-full px-3 py-2 border border-input rounded-md bg-background"
                            >
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                                <option value="system">System</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="font-medium">Language</label>
                            <select
                                value={settings.preferences.language}
                                onChange={(e) => handleSettingsChange('preferences', 'language', e.target.value)}
                                className="w-full px-3 py-2 border border-input rounded-md bg-background"
                            >
                                <option value="en">English</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="font-medium">Currency</label>
                            <select
                                value={settings.preferences.currency}
                                onChange={(e) => handleSettingsChange('preferences', 'currency', e.target.value)}
                                className="w-full px-3 py-2 border border-input rounded-md bg-background"
                            >
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Password Change */}
            <div className="bg-card rounded-lg border">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold">Security</h2>
                </div>
                <div className="p-6 space-y-4">
                    {!showPasswordChange ? (
                        <button
                            onClick={() => setShowPasswordChange(true)}
                            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                        >
                            Change Password
                        </button>
                    ) : (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Current Password</label>
                                <input
                                    type="password"
                                    value={changePasswordData.currentPassword}
                                    onChange={(e) => setChangePasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">New Password</label>
                                <input
                                    type="password"
                                    value={changePasswordData.newPassword}
                                    onChange={(e) => setChangePasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={changePasswordData.confirmPassword}
                                    onChange={(e) => setChangePasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                />
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    onClick={handleChangePassword}
                                    disabled={saving}
                                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
                                >
                                    {saving ? 'Changing...' : 'Change Password'}
                                </button>
                                <button
                                    onClick={() => {
                                        setShowPasswordChange(false);
                                        setChangePasswordData({
                                            currentPassword: '',
                                            newPassword: '',
                                            confirmPassword: '',
                                        });
                                    }}
                                    className="px-4 py-2 border border-input rounded-md hover:bg-accent"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button
                    onClick={handleSaveSettings}
                    disabled={saving}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
                >
                    {saving ? 'Saving...' : 'Save Settings'}
                </button>
            </div>
        </div>
    );
}