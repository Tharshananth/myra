export interface Order {
    name: string;
    email: string;
    phone: string;
    address: string;
    landmark?: string;
    review?: string;
    products: Array<{
        productId: string;
        quantity: number;
    }>;
}

export interface EmailConfig {
    service: string;
    user: string;
    pass: string;
}

export interface OrderResponse {
    success: boolean;
    message: string;
    orderId?: string;
}