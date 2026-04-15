import { NextRequest, NextResponse } from 'next/server';
import { UserSettings } from '@/types';

// Mock settings data
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

export async function GET() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(mockSettings);
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Update mock settings with provided data
        const updatedSettings = {
            ...mockSettings,
            ...body,
        };

        return NextResponse.json(updatedSettings);
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        );
    }
}