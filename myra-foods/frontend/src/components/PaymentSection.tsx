import React, { useState } from 'react';

const PaymentSection = ({ onPlaceOrder }) => {
    const [paymentMethod, setPaymentMethod] = useState('COD');
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
        setOrderDetails({
            ...orderDetails,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onPlaceOrder({ ...orderDetails, paymentMethod });
    };

    return (
        <div className="payment-section">
            <h2>Payment Section</h2>
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
                <div>
                    <label>Payment Method:</label>
                    <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                        <option value="COD">Cash on Delivery</option>
                        <option value="Card">Credit/Debit Card</option>
                    </select>
                </div>
                <button type="submit">Place Order</button>
            </form>
        </div>
    );
};

export default PaymentSection;