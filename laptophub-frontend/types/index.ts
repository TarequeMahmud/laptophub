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
