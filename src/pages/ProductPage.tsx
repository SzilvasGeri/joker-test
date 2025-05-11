import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Heart, Share2, Truck, ShieldCheck, ArrowLeft, Plus, Minus, ShoppingCart } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import ProductCard from '../components/ui/ProductCard';
import RecentlyViewed from '../components/product/RecentlyViewed';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const { addItem: addToRecentlyViewed } = useRecentlyViewed();
  
  const product = products.find(p => p.id === id);

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
      setLoading(false);
    }
  }, [product, addToRecentlyViewed]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft size={16} className="mr-1" /> Back to Homepage
        </Link>
      </div>
    );
  }

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 10) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image
    });
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  const discountedPrice = product.discount > 0
    ? product.price * (1 - product.discount / 100)
    : product.price;
  
  return (
    <>
      <Helmet>
        <title>{`${product.name} | RegioToys`}</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
        <meta property="og:type" content="product" />
        <meta property="product:price:amount" content={discountedPrice.toString()} />
        <meta property="product:price:currency" content="USD" />
      </Helmet>

      <div className="bg-white">
        {/* Breadcrumbs */}
        <div className="bg-gray-100 py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm text-gray-600">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <span className="mx-2">/</span>
              <Link to={`/category/${product.category.toLowerCase()}`} className="hover:text-blue-600">
                {product.category}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-800">{product.name}</span>
            </div>
          </div>
        </div>
        
        {/* Product details */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product image */}
            <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-[400px] object-contain"
              />
            </div>
            
            {/* Product info */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
              
              {/* Ratings */}
              {product.rating > 0 && (
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < product.rating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                  </span>
                </div>
              )}
              
              {/* Price */}
              <div className="mb-6">
                {product.discount > 0 ? (
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-red-600">
                      ${discountedPrice.toFixed(2)}
                    </span>
                    <span className="ml-3 text-lg text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="ml-3 bg-red-100 text-red-800 text-sm font-semibold px-2 py-1 rounded">
                      {product.discount}% OFF
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              
              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
              
              {/* Age recommendation and availability */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="text-sm text-gray-500 mb-1">Age</h4>
                  <p className="font-medium">{product.ageRecommendation}</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-500 mb-1">Availability</h4>
                  <p className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>
              </div>
              
              {/* Quantity selector and Add to cart */}
              {product.inStock && (
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <span className="mr-4 font-medium">Quantity</span>
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                        disabled={quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => handleQuantityChange(Number(e.target.value))}
                        className="w-12 text-center border-x border-gray-300 py-2 focus:outline-none"
                        min="1"
                        max="10"
                      />
                      <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                        disabled={quantity >= 10}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleAddToCart}
                      className="flex-grow sm:flex-grow-0 sm:min-w-[200px] bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold flex items-center justify-center transition-colors"
                    >
                      <ShoppingCart size={20} className="mr-2" />
                      Add to Cart
                    </button>
                    
                    <button
                      onClick={handleWishlistToggle}
                      className={`flex-grow-0 border ${
                        isInWishlist(product.id)
                          ? 'border-red-300 text-red-600'
                          : 'border-gray-300'
                      } hover:border-gray-400 px-4 py-3 rounded-md transition-colors`}
                    >
                      <Heart size={20} />
                    </button>
                    
                    <button className="flex-grow-0 border border-gray-300 hover:border-gray-400 px-4 py-3 rounded-md transition-colors">
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>
              )}
              
              {/* Shipping and returns info */}
              <div className="border-t border-gray-200 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <Truck size={20} className="mr-3 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium mb-1">Free Shipping</h4>
                      <p className="text-sm text-gray-600">For orders over $50</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <ShieldCheck size={20} className="mr-3 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium mb-1">30 Days Return</h4>
                      <p className="text-sm text-gray-600">Money back guarantee</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="bg-gray-50 py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <RecentlyViewed />
    </>
  );
};

export default ProductPage;