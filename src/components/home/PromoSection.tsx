import React from 'react';
import { Link } from 'react-router-dom';

const PromoSection: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6">
          {/* First promo card */}
          <div className="relative rounded-lg overflow-hidden shadow-md group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-blue-400/80 z-10"></div>
            <img
              src="https://images.pexels.com/photos/8294554/pexels-photo-8294554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Summer Toys Collection"
              className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Summer Toys Collection</h3>
              <p className="mb-4 opacity-90">Get ready for outdoor adventures</p>
              <Link
                to="/category/outdoor"
                className="inline-block bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors w-max"
              >
                Shop Now
              </Link>
            </div>
          </div>
          
          {/* Second promo card */}
          <div className="relative rounded-lg overflow-hidden shadow-md group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/80 to-red-400/80 z-10"></div>
            <img
              src="https://images.pexels.com/photos/3933022/pexels-photo-3933022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Educational Toys"
              className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Educational Toys</h3>
              <p className="mb-4 opacity-90">Up to 30% off this week only</p>
              <Link
                to="/category/educational"
                className="inline-block bg-white text-red-600 px-4 py-2 rounded-md font-medium hover:bg-red-50 transition-colors w-max"
              >
                View Offers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;