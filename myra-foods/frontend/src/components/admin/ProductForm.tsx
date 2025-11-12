import React, { useState } from 'react';

const ProductForm = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productImage, setProductImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', productName);
        formData.append('price', productPrice);
        formData.append('description', productDescription);
        if (productImage) {
            formData.append('image', productImage);
        }

        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                alert('Product added successfully!');
                // Reset form fields
                setProductName('');
                setProductPrice('');
                setProductDescription('');
                setProductImage(null);
            } else {
                alert('Failed to add product.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the product.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Product Name:</label>
                <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Product Price:</label>
                <input
                    type="number"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Product Description:</label>
                <textarea
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Product Image:</label>
                <input
                    type="file"
                    onChange={(e) => setProductImage(e.target.files[0])}
                />
            </div>
            <button type="submit">Add Product</button>
        </form>
    );
};

export default ProductForm;