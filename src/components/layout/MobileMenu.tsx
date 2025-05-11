import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { categories } from '../../data/categories';

interface MobileMenuProps {
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onClose }) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(current => 
      current.includes(categoryId)
        ? current.filter(id => id !== categoryId)
        : [...current, categoryId]
    );
  };
  
  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={onClose} className="p-2">
            <ChevronRight size={24} />
          </button>
        </div>
        
        <ul className="space-y-2">
          <li>
            <Link 
              to="/" 
              className="block py-2 border-b border-gray-200"
              onClick={onClose}
            >
              Home
            </Link>
          </li>
          
          {categories.map(category => (
            <li key={category.id}>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <Link 
                  to={`/category/${category.slug}`}
                  className="flex-grow"
                  onClick={onClose}
                >
                  {category.name}
                </Link>
                
                {category.subcategories && category.subcategories.length > 0 && (
                  <button 
                    onClick={() => toggleCategory(category.id)}
                    className="p-1"
                  >
                    {expandedCategories.includes(category.id) ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>
                )}
              </div>
              
              {expandedCategories.includes(category.id) && category.subcategories && (
                <ul className="pl-4 mt-1 mb-2 space-y-1">
                  {category.subcategories.map(sub => (
                    <li key={sub.id}>
                      <Link 
                        to={`/category/${category.slug}/${sub.slug}`}
                        className="block py-2 text-sm text-gray-700"
                        onClick={onClose}
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          
          <li className="pt-4 border-t border-gray-200 mt-4">
            <Link 
              to="/account" 
              className="block py-2 text-blue-700"
              onClick={onClose}
            >
              My Account
            </Link>
          </li>
          <li>
            <Link 
              to="/wishlist" 
              className="block py-2 text-blue-700"
              onClick={onClose}
            >
              Wishlist
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;