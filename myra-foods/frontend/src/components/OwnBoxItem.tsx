import React from 'react';

interface OwnBoxItemProps {
    item: {
        id: string;
        title: string;
        description: string;
        price: number;
        imageUrl: string;
    };
    onAddToCart: (itemId: string) => void;
}

const OwnBoxItem: React.FC<OwnBoxItemProps> = ({ item, onAddToCart }) => {
    return (
        <div className="own-box-item">
            <img src={item.imageUrl} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>${item.price.toFixed(2)}</p>
            <button onClick={() => onAddToCart(item.id)}>Add to Cart</button>
        </div>
    );
};

export default OwnBoxItem;