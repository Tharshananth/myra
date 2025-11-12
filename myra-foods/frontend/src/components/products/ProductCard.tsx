export default function ProductCard({ product, onAddToCart }) {
    const handleAddToCart = () => {
        onAddToCart(product);
    };

    return (
        <div className="product-card">
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <span>${product.price.toFixed(2)}</span>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
}