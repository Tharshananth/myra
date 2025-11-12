import React, { useState } from 'react';
import { useCart } from '../contexts/CartProvider';
import { placeOrder } from '../services/productService';

const ProductModal = ({ product, onClose }) => {
    const { cartItems, clearCart } = useCart();
    const [orderDetails, setOrderDetails] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        landmark: '',
        review: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderDetails({ ...orderDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await placeOrder({ ...orderDetails, items: cartItems });
            clearCart();
            alert('Order placed successfully!');
            onClose();
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required />
                    <input type="tel" name="phone" placeholder="Your Phone" onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Your Email" onChange={handleChange} required />
                    <input type="text" name="address" placeholder="Your Address" onChange={handleChange} required />
                    <input type="text" name="landmark" placeholder="Landmark" onChange={handleChange} />
                    <textarea name="review" placeholder="Your Review" onChange={handleChange}></textarea>
                    <button type="submit">Place Order</button>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;