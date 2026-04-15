import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/types';

// Mock user data
const mockUser: User = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: '',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
};

export async function GET() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(mockUser);
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Update mock user with provided data
        const updatedUser = {
            ...mockUser,
            ...body,
            updatedAt: new Date().toISOString(),
        };

        return NextResponse.json(updatedUser);
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        );
    }
}