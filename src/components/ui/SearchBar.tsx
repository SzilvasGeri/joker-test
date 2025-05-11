import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products } from '../../data/products';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<typeof products>([]);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (query.trim().length >= 2) {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [query]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
    }
  };
  
  const handleSuggestionClick = (productId: string) => {
    navigate(`/product/${productId}`);
    setQuery('');
    setShowSuggestions(false);
  };
  
  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for toys..."
          className="w-full pl-4 pr-10 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
        
        {query && (
          <button
            type="button"
            className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => setQuery('')}
          >
            <X size={18} />
          </button>
        )}
        
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600"
        >
          <Search size={18} />
        </button>
      </form>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white mt-1 rounded-md shadow-lg z-10 overflow-hidden">
          <ul>
            {suggestions.map(product => (
              <li 
                key={product.id}
                className="border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleSuggestionClick(product.id)}
              >
                <div className="flex items-center p-3">
                  <div className="w-10 h-10 bg-gray-100 flex-shrink-0 rounded overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium">{product.name}</div>
                    <div className="text-xs text-gray-500">{product.category}</div>
                  </div>
                  <div className="ml-auto text-sm font-semibold text-blue-600">
                    ${product.price.toFixed(2)}
                  </div>
                </div>
              </li>
            ))}
            <li className="p-2 bg-gray-50 hover:bg-gray-100 transition-colors">
              <button 
                className="w-full text-center text-blue-600 text-sm"
                onClick={handleSubmit}
              >
                See all results for "{query}"
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;