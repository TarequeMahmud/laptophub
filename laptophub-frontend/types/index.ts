// Product type definition
export interface Product {
    id: string;
    name: string;
    price: number;
    image?: string;
    imageAlt?: string;
    description?: string;
    category?: string;
    releaseDate?: string;
    badge?: string;
    rating?: number;
    reviews?: number;
    originalPrice?: number;
    availability?: 'In Stock' | 'Limited Stock' | 'Out of Stock';
    tags?: string[];
    specs?: Record<string, string>;
    features?: string[];
    href?: string;
}

// Cart item with quantity
export interface CartItem extends Product {
    quantity: number;
}

// Cart state interface for type safety
export interface CartState {
    items: CartItem[];
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
    getItemCount: () => number;
}

// User profile type
export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
}

// Order item type
export interface OrderItem {
    product: Product;
    quantity: number;
    price: number; // price at time of order
}

// Order type
export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    shippingAddress: Address;
    paymentMethod: PaymentMethod;
    createdAt: string;
    updatedAt: string;
}

// Address type
export interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

// Payment method type
export interface PaymentMethod {
    type: 'credit_card' | 'debit_card' | 'paypal' | 'bank_transfer';
    last4?: string;
    expiryMonth?: number;
    expiryYear?: number;
}

// User settings type
export interface UserSettings {
    notifications: {
        email: boolean;
        sms: boolean;
        push: boolean;
    };
    privacy: {
        profileVisibility: 'public' | 'private';
        dataSharing: boolean;
    };
    preferences: {
        theme: 'light' | 'dark' | 'system';
        language: string;
        currency: string;
    };
}
