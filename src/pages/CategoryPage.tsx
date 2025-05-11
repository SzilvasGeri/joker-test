import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { products } from '../data/products';
import { categories } from '../data/categories';
import ProductCard from '../components/ui/ProductCard';

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popular';

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Find current category
  const category = categories.find(c => c.slug === slug);
  
  // Filter products by category
  const categoryProducts = products.filter(product => 
    product.category.toLowerCase() === slug?.toLowerCase()
  );
  
  // Apply price filter
  const filteredProducts = categoryProducts.filter(product => 
    product.price >= priceRange[0] && product.price <= priceRange[1]
  );
  
  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1;
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'popular':
      default:
        return b.rating - a.rating;
    }
  });
  
  const handlePriceChange = (index: 0 | 1, value: number) => {
    const newRange = [...priceRange] as [number, number];
    newRange[index] = value;
    setPriceRange(newRange);
  };
  
  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">{category?.name || 'Category'}</span>
          </div>
        </div>
      </div>
      
      {/* Category header */}
      <div className="bg-blue-700 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">{category?.name || 'Products'}</h1>
          <p className="text-blue-100">
            Showing {sortedProducts.length} products
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <div className="lg:w-1/4 xl:w-1/5">
            <div className="sticky top-24">
              <div className="flex lg:hidden items-center justify-between bg-gray-100 p-4 rounded-lg mb-4">
                <span className="font-medium">Filters</span>
                <button 
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                  className="flex items-center text-gray-700"
                >
                  <Filter size={18} className="mr-1" />
                  {mobileFiltersOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>
              
              <div className={`lg:block ${mobileFiltersOpen ? 'block' : 'hidden'}`}>
                {/* Price filter */}
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">${priceRange[0]}</span>
                      <span className="text-sm text-gray-600">${priceRange[1]}</span>
                    </div>
                    
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                      className="w-full"
                    />
                    
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="flex-grow">
                      <label htmlFor="min-price" className="text-xs text-gray-600 block mb-1">Min $</label>
                      <input
                        type="number"
                        id="min-price"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                        min="0"
                        max={priceRange[1]}
                      />
                    </div>
                    <div className="flex-grow">
                      <label htmlFor="max-price" className="text-xs text-gray-600 block mb-1">Max $</label>
                      <input
                        type="number"
                        id="max-price"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                        min={priceRange[0]}
                        max="200"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Age filter */}
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <h3 className="font-semibold mb-3">Age Range</h3>
                  
                  <div className="space-y-2">
                    {['0-2 years', '3-5 years', '6-8 years', '9-12 years', '12+ years'].map((age) => (
                      <label key={age} className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="rounded text-blue-600 focus:ring-blue-500 mr-2"
                        />
                        <span>{age}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Brand filter */}
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Brands</h3>
                  
                  <div className="space-y-2">
                    {['LEGO', 'Mattel', 'Hasbro', 'Fisher-Price', 'Playmobil', 'Nerf'].map((brand) => (
                      <label key={brand} className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="rounded text-blue-600 focus:ring-blue-500 mr-2"
                        />
                        <span>{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product grid */}
          <div className="lg:w-3/4 xl:w-4/5">
            {/* Sort options */}
            <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <div className="w-full sm:w-auto flex items-center mb-4 sm:mb-0">
                <span className="text-gray-700 mr-3">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest First</option>
                  <option value="price-asc">Price (Low to High)</option>
                  <option value="price-desc">Price (High to Low)</option>
                </select>
              </div>
            </div>
            
            {/* Products */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-gray-100 p-8 rounded-lg text-center">
                <h2 className="text-xl font-bold mb-2">No Products Found</h2>
                <p className="text-gray-600 mb-4">Try adjusting your filters to find what you're looking for.</p>
                <button
                  onClick={() => setPriceRange([0, 200])}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;