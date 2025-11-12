import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartProvider';
import ProductCard from './products/ProductCard';

const ProductSection = () => {
    const { products } = useContext(CartContext);

    return (
        <section className="product-section">
            <h2>Our Products</h2>
            <div className="product-grid">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default ProductSection;