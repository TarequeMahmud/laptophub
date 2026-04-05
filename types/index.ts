// Product type definition
export interface Product {
    id: string;
    name: string;
    price: number;
    image?: string;
    description?: string;
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
