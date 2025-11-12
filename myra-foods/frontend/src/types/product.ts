export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    stock: number;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface Cart {
    items: CartItem[];
    totalAmount: number;
}

export interface Order {
    name: string;
    phone: string;
    email: string;
    address: string;
    landmark: string;
    review?: string;
    cart: Cart;
}