'use client';

import { useState, useEffect } from 'react';
import { Order } from '@/types';
import { dashboardApi } from '@/lib/api';
import { Package, Eye } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import clsx from 'clsx';

export default function OrderHistorySection() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const { theme } = useTheme();

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const userOrders = await dashboardApi.getOrders();
            setOrders(userOrders);
        } catch (error) {
            console.error('Failed to load orders:', error);
            // Mock data for development
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
            setOrders(mockOrders);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'pending':
                return 'text-yellow-600 bg-yellow-100';
            case 'processing':
                return 'text-blue-600 bg-blue-100';
            case 'shipped':
                return 'text-purple-600 bg-purple-100';
            case 'delivered':
                return 'text-green-600 bg-green-100';
            case 'cancelled':
                return 'text-red-600 bg-red-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    if (loading) {
        return (
            <div className={clsx(
                "rounded-lg border p-6",
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            )}>
                <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className={clsx(
                "rounded-lg border",
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            )}>
                <div className={clsx(
                    "p-6 border-b",
                    theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                )}>
                    <h2 className={clsx(
                        "text-xl font-semibold",
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    )}>Order History</h2>
                </div>
                <div className="p-6">
                    {orders.length === 0 ? (
                        <div className="text-center py-8">
                            <Package className={clsx(
                                "w-12 h-12 mx-auto mb-4",
                                theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                            )} />
                            <p className={clsx(
                                "",
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            )}>No orders found</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div key={order.id} className={clsx(
                                    "border rounded-lg p-4 hover:shadow-md transition-shadow",
                                    theme === 'dark'
                                        ? 'border-gray-700 hover:shadow-lg bg-gray-800'
                                        : 'border-gray-200 bg-white'
                                )}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h3 className={clsx(
                                                "font-semibold",
                                                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                                            )}>Order #{order.id}</h3>
                                            <p className={clsx(
                                                "text-sm",
                                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                            )}>
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className={clsx(
                                                    "",
                                                    theme === 'dark'
                                                        ? 'text-blue-400 hover:text-blue-300'
                                                        : 'text-blue-600 hover:text-blue-800'
                                                )}
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className={clsx(
                                                "text-sm",
                                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                            )}>
                                                {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                                            </p>
                                            <p className={clsx(
                                                "text-sm",
                                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                            )}>
                                                {order.shippingAddress.city}, {order.shippingAddress.state}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className={clsx(
                                                "font-semibold",
                                                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                                            )}>${order.total.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className={clsx(
                        "rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto",
                        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    )}>
                        <div className={clsx(
                            "p-6 border-b",
                            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                        )}>
                            <div className="flex items-center justify-between">
                                <h3 className={clsx(
                                    "text-xl font-semibold",
                                    theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                                )}>Order Details</h3>
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className={clsx(
                                        "hover:text-gray-600",
                                        theme === 'dark'
                                            ? 'text-gray-600 hover:text-gray-400'
                                            : 'text-gray-400'
                                    )}
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className={clsx(
                                        "font-medium mb-2",
                                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                                    )}>Order Information</h4>
                                    <p className={clsx(
                                        "text-sm",
                                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                    )}>Order ID: {selectedOrder.id}</p>
                                    <p className={clsx(
                                        "text-sm",
                                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                    )}>
                                        Date: {new Date(selectedOrder.createdAt).toLocaleDateString()}
                                    </p>
                                    <p className={clsx(
                                        "text-sm",
                                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                    )}>
                                        Status: <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                                            {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <h4 className={clsx(
                                        "font-medium mb-2",
                                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                                    )}>Shipping Address</h4>
                                    <p className={clsx(
                                        "text-sm",
                                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                    )}>
                                        {selectedOrder.shippingAddress.street}<br />
                                        {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}<br />
                                        {selectedOrder.shippingAddress.country}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h4 className={clsx(
                                    "font-medium mb-4",
                                    theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                                )}>Items</h4>
                                <div className="space-y-4">
                                    {selectedOrder.items.map((item, index) => (
                                        <div key={index} className="flex items-center space-x-4">
                                            <div className={clsx(
                                                "w-16 h-16 rounded flex items-center justify-center",
                                                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                                            )}>
                                                <Package className={clsx(
                                                    "w-6 h-6",
                                                    theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                                                )} />
                                            </div>
                                            <div className="flex-1">
                                                <h5 className={clsx(
                                                    "font-medium",
                                                    theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                                                )}>{item.product.name}</h5>
                                                <p className={clsx(
                                                    "text-sm",
                                                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                                )}>Quantity: {item.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className={clsx(
                                                    "font-semibold",
                                                    theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                                                )}>${item.price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={clsx(
                                "border-t pt-4",
                                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                            )}>
                                <div className="flex justify-between items-center">
                                    <span className={clsx(
                                        "font-medium",
                                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                                    )}>Total</span>
                                    <span className={clsx(
                                        "font-semibold text-lg",
                                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                                    )}>${selectedOrder.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}