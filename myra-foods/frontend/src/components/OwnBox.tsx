import React, { useContext, useState } from 'react';
import { CartContext } from './CartProvider';

const OwnBox = () => {
    const { cartItems, totalAmount } = useContext(CartContext);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [landmark, setLandmark] = useState('');
    const [review, setReview] = useState('');

    const handleOrderPlacement = async (e) => {
        e.preventDefault();
        const orderDetails = {
            name,
            phone,
            email,
            address,
            landmark,
            review,
            items: cartItems,
            total: totalAmount,
        };

        try {
            const response = await fetch('/api/place-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderDetails),
            });

            if (response.ok) {
                alert('Order placed successfully!');
                // Clear cart or redirect as needed
            } else {
                alert('Failed to place order. Please try again.');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="own-box">
            <h2>Your Cart</h2>
            <ul>
                {cartItems.map((item, index) => (
                    <li key={index}>{item.name} - ${item.price}</li>
                ))}
            </ul>
            <h3>Total: ${totalAmount}</h3>
            <form onSubmit={handleOrderPlacement}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Landmark"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                />
                <textarea
                    placeholder="Leave a review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
                <button type="submit">Place Order</button>
            </form>
        </div>
    );
};

export default OwnBox;