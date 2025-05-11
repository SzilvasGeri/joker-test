import React, { useState } from 'react';
import ProductCard from '../ui/ProductCard';
import { products } from '../../data/products';

type FilterType = 'all' | 'bestsellers' | 'new' | 'sale';

const FeaturedProducts: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('bestsellers');
  
  const filteredProducts = products.filter(product => {
    switch (activeFilter) {
      case 'all':
        return true;
      case 'bestsellers':
        return product.isBestseller;
      case 'new':
        return product.isNew;
      case 'sale':
        return product.discount > 0;
      default:
        return true;
    }
  }).slice(0, 8);
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">Featured Products</h2>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter('bestsellers')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'bestsellers'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Bestsellers
            </button>
            <button
              onClick={() => setActiveFilter('new')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'new'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => setActiveFilter('sale')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'sale'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              On Sale
            </button>
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              View All
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;