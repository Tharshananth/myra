Here are the contents for the file `frontend/src/components/Cart.tsx`:

import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartProvider';
import { placeOrder } from '../services/orderService';

const Cart: React.FC = () => {
    const { cartItems, clearCart } = useContext(CartContext);
    const [orderDetails, setOrderDetails] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        landmark: '',
        review: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setOrderDetails({ ...orderDetails, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await placeOrder({ ...orderDetails, items: cartItems });
            alert('Order placed successfully!');
            clearCart();
        } catch (error) {
            alert('Failed to place order. Please try again.');
        }
    };

    return (
        <div>
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input type="text" name="name" value={orderDetails.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Phone:</label>
                        <input type="tel" name="phone" value={orderDetails.phone} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" value={orderDetails.email} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Address:</label>
                        <input type="text" name="address" value={orderDetails.address} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Landmark:</label>
                        <input type="text" name="landmark" value={orderDetails.landmark} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Review:</label>
                        <textarea name="review" value={orderDetails.review} onChange={handleChange}></textarea>
                    </div>
                    <button type="submit">Place Order</button>
                </form>
            )}
        </div>
    );
};

export default Cart;