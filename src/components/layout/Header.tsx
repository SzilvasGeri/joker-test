import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, ChevronDown, User, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { categories } from '../../data/categories';
import MobileMenu from './MobileMenu';
import SearchBar from '../ui/SearchBar';

const Header: React.FC = () => {
  const { itemCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-white lg:bg-transparent'
    }`}>
      {/* Top bar with contact info, wishlist, account */}
      <div className="hidden lg:block bg-blue-700 text-white px-6 py-1">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div>
            <span>Customer Service: +36 123 456 789</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/wishlist" className="flex items-center hover:text-blue-200 transition-colors">
              <Heart size={16} className="mr-1" />
              <span>Wishlist</span>
            </Link>
            <Link to="/account" className="flex items-center hover:text-blue-200 transition-colors">
              <User size={16} className="mr-1" />
              <span>My Account</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Main header with logo, search, cart */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Mobile menu button */}
          <button 
            className="lg:hidden p-2" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-700 flex items-center">
            <svg 
              width="40" 
              height="40" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="mr-2"
            >
              <rect width="24" height="24" rx="4" fill="#1976d2" />
              <path d="M7 14h10l-5-8-5 8z" fill="white" />
              <circle cx="12" cy="16" r="2" fill="white" />
            </svg>
            <span>RegioToys</span>
          </Link>
          
          {/* Search on desktop */}
          <div className="hidden lg:block w-1/3">
            <SearchBar />
          </div>
          
          {/* Icons for mobile and cart */}
          <div className="flex items-center space-x-4">
            <button 
              className="lg:hidden p-2" 
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search size={24} />
            </button>
            
            <Link to="/cart" className="relative p-2">
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
        
        {/* Mobile search input */}
        {searchOpen && (
          <div className="lg:hidden mt-4">
            <SearchBar />
          </div>
        )}
      </div>
      
      {/* Category navigation */}
      <nav className="hidden lg:block bg-blue-600 text-white">
        <div className="container mx-auto">
          <ul className="flex">
            {categories.map(category => (
              <li key={category.id} className="group relative">
                <Link 
                  to={`/category/${category.slug}`}
                  className="flex items-center px-4 py-3 hover:bg-blue-700 transition-colors"
                >
                  <span>{category.name}</span>
                  {category.subcategories && category.subcategories.length > 0 && (
                    <ChevronDown size={16} className="ml-1" />
                  )}
                </Link>
                
                {category.subcategories && category.subcategories.length > 0 && (
                  <div className="absolute left-0 top-full bg-white text-gray-800 shadow-lg w-52 z-20 hidden group-hover:block">
                    <ul>
                      {category.subcategories.map(sub => (
                        <li key={sub.id}>
                          <Link 
                            to={`/category/${category.slug}/${sub.slug}`}
                            className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && <MobileMenu onClose={() => setMobileMenuOpen(false)} />}
    </header>
  );
};

export default Header;