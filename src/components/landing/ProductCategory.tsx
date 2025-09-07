import React from 'react';
import { Product } from '../../types';
import ProductCard from './ProductCard';

interface ProductCategoryProps {
  title: string;
  description: string;
  benefits: string;
  products: Product[];
  getScheduleButton: (category: string) => string;
  loading?: boolean;
}

const ProductCategory: React.FC<ProductCategoryProps> = ({
  title,
  description,
  benefits,
  products,
  getScheduleButton,
  loading = false
}) => {
  if (loading) {
    return (
      <div className="mb-16">
        <div className="text-center mb-8">
          <h4 className="text-2xl font-bold text-gray-800 mb-4">{title}</h4>
          <p className="text-lg text-gray-600 mb-4">{description}</p>
          <p className="text-green-600 font-medium">{benefits}</p>
        </div>
        
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h4 className="text-2xl font-bold text-gray-800 mb-4">{title}</h4>
        <p className="text-lg text-gray-600 mb-4">{description}</p>
        <p className="text-green-600 font-medium">{benefits}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            getScheduleButton={getScheduleButton}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCategory;
