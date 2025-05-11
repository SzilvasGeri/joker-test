import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';

const CategoryGrid: React.FC = () => {
  // Select just the main categories for display
  const mainCategories = categories.slice(0, 6);
  
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Shop by Category</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {mainCategories.map(category => (
            <Link 
              key={category.id}
              to={`/category/${category.slug}`}
              className="group flex flex-col items-center transition-transform hover:transform hover:-translate-y-1"
            >
              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-3 ${category.bgColor || 'bg-blue-100'} group-hover:bg-blue-200 transition-colors`}>
                <img 
                  src={category.icon || 'https://via.placeholder.com/80'} 
                  alt={category.name}
                  className="w-12 h-12 md:w-14 md:h-14 object-contain"
                />
              </div>
              <span className="text-center font-medium">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;