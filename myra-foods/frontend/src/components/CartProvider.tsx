import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [orderDetails, setOrderDetails] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        landmark: '',
        review: '',
    });

    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };

    const removeFromCart = (itemId) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
    };

    const updateOrderDetails = (details) => {
        setOrderDetails((prevDetails) => ({ ...prevDetails, ...details }));
    };

    const clearCart = () => {
        setCartItems([]);
        setOrderDetails({
            name: '',
            phone: '',
            email: '',
            address: '',
            landmark: '',
            review: '',
        });
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, orderDetails, updateOrderDetails, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};