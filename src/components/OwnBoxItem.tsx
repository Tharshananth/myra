import React from 'react';
import { Plus, Minus } from 'lucide-react';

export interface OwnBoxItemData {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface OwnBoxItemProps {
  item: OwnBoxItemData;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

const OwnBoxItem: React.FC<OwnBoxItemProps> = ({ item, quantity, onAdd, onRemove }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-green-50 to-yellow-50 flex items-center justify-center overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="h-32 w-32 object-contain group-hover:scale-110 transition-transform duration-300"
        />
        {quantity > 0 && (
          <div className="absolute top-2 right-2 bg-green-600 text-white rounded-full px-3 py-1 text-sm font-bold shadow-lg">
            {quantity} added
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg line-clamp-2 min-h-[3.5rem]">
            {item.name}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xl font-bold text-green-600">₹{item.price}</span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {item.category}
            </span>
          </div>
        </div>

        {/* Add/Remove Controls */}
        <div className="flex items-center justify-between pt-2 border-t">
          {quantity === 0 ? (
            <button
              onClick={onAdd}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add to Box</span>
            </button>
          ) : (
            <div className="w-full flex items-center justify-between bg-green-50 rounded-lg p-1">
              <button
                onClick={onRemove}
                className="bg-white hover:bg-gray-100 text-green-600 p-2 rounded-lg transition-colors shadow-sm"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="font-bold text-lg text-gray-900 min-w-[2rem] text-center">
                {quantity}
              </span>
              <button
                onClick={onAdd}
                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors shadow-sm"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnBoxItem;