import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { currentPassword, newPassword } = body;

        // Basic validation
        if (!currentPassword || !newPassword) {
            return NextResponse.json(
                { error: 'Current password and new password are required' },
                { status: 400 }
            );
        }

        if (newPassword.length < 6) {
            return NextResponse.json(
                { error: 'New password must be at least 6 characters long' },
                { status: 400 }
            );
        }

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // In a real app, you'd verify the current password and update it
        // For now, just return success
        return NextResponse.json({ message: 'Password changed successfully' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        );
    }
}