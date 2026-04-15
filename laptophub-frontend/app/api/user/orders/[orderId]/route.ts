import { NextResponse } from 'next/server';
import { Order } from '@/types';

// Mock orders data (same as in the orders route)
const mockOrders: Order[] = [
    {
        id: 'ORD-001',
        userId: '1',
        items: [
            {
                product: {
                    id: '1',
                    name: 'Gaming Laptop Pro',
                    price: 1299.99,
                    image: '/laptop1.jpg',
                },
                quantity: 1,
                price: 1299.99,
            }
        ],
        total: 1299.99,
        status: 'delivered',
        shippingAddress: {
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'USA',
        },
        paymentMethod: {
            type: 'credit_card',
            last4: '4242',
        },
        createdAt: '2024-03-15T10:00:00Z',
        updatedAt: '2024-03-20T14:00:00Z',
    },
    {
        id: 'ORD-002',
        userId: '1',
        items: [
            {
                product: {
                    id: '2',
                    name: 'Business Laptop',
                    price: 899.99,
                    image: '/laptop2.jpg',
                },
                quantity: 2,
                price: 899.99,
            }
        ],
        total: 1799.98,
        status: 'shipped',
        shippingAddress: {
            street: '456 Oak Ave',
            city: 'Los Angeles',
            state: 'CA',
            zipCode: '90210',
            country: 'USA',
        },
        paymentMethod: {
            type: 'paypal',
        },
        createdAt: '2024-02-10T09:30:00Z',
        updatedAt: '2024-02-12T11:00:00Z',
    },
];

export async function GET(
    request: Request,
    { params }: { params: Promise<{ orderId: string }> }
) {
    const { orderId } = await params;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const order = mockOrders.find(o => o.id === orderId);

    if (!order) {
        return NextResponse.json(
            { error: 'Order not found' },
            { status: 404 }
        );
    }

    return NextResponse.json(order);
}