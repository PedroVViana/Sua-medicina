import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';

interface ProductCardProps {
  product: Product;
  getScheduleButton: (category: string) => string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, getScheduleButton }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
      <div className="p-6">
        <h5 className="text-xl font-semibold mb-3 text-gray-800">{product.name}</h5>
        <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-primary-600">
            R$ {product.price.toFixed(2)}
          </span>
        </div>
        <div className="space-y-2">
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-primary-600 text-white px-4 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            Adicionar ao Carrinho
          </button>
          <Link
            to={`/checkout?product=${product.id}`}
            className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium text-center block"
          >
            {getScheduleButton(product.category)}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
