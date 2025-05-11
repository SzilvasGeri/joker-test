import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, CreditCard, Truck, Package, ShieldCheck } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Services section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 border-b border-gray-700 pb-10">
          <div className="flex flex-col items-center text-center">
            <Truck size={32} className="mb-3 text-blue-400" />
            <h3 className="font-semibold mb-1">Free Delivery</h3>
            <p className="text-gray-400 text-sm">Orders over $50</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <Package size={32} className="mb-3 text-blue-400" />
            <h3 className="font-semibold mb-1">30 Days Return</h3>
            <p className="text-gray-400 text-sm">Money back guarantee</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <ShieldCheck size={32} className="mb-3 text-blue-400" />
            <h3 className="font-semibold mb-1">100% Secure</h3>
            <p className="text-gray-400 text-sm">Safe shopping</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <CreditCard size={32} className="mb-3 text-blue-400" />
            <h3 className="font-semibold mb-1">Multiple Payment</h3>
            <p className="text-gray-400 text-sm">Credit cards accepted</p>
          </div>
        </div>
        
        {/* Main footer content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-bold mb-4">RegioToys</h2>
            <p className="text-gray-400 mb-4">
              Your trusted destination for quality toys and games for all ages.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">Shipping & Delivery</Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-white transition-colors">Returns & Exchanges</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">My Account</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/account" className="text-gray-400 hover:text-white transition-colors">My Profile</Link>
              </li>
              <li>
                <Link to="/orders" className="text-gray-400 hover:text-white transition-colors">Order History</Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-400 hover:text-white transition-colors">Wishlist</Link>
              </li>
              <li>
                <Link to="/newsletter" className="text-gray-400 hover:text-white transition-colors">Newsletter</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0 text-blue-400" />
                <span className="text-gray-400">123 Toy Street, Budapest, Hungary 1234</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 flex-shrink-0 text-blue-400" />
                <span className="text-gray-400">+36 123 456 789</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0 text-blue-400" />
                <span className="text-gray-400">info@regiotoys.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom footer */}
        <div className="pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} RegioToys. All rights reserved.</p>
          <div className="mt-3 flex justify-center space-x-4">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;