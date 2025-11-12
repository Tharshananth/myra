import React, { useContext, useState } from 'react';
import { CartContext } from './contexts/CartProvider';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const App = () => {
    const { cartItems, clearCart } = useContext(CartContext);
    const [orderDetails, setOrderDetails] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        landmark: '',
        review: ''
    });
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderDetails({
            ...orderDetails,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/place-order', {
                ...orderDetails,
                items: cartItems
            });
            clearCart();
            history.push('/thank-you');
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <div>
            <Header />
            <Hero />
            <ProductSection />
            <Cart onSubmit={handleSubmit} onChange={handleChange} orderDetails={orderDetails} />
            <Footer />
        </div>
    );
};

export default App;