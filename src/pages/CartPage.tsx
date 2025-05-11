import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus, Minus, RefreshCw, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">Your Cart</h1>
        
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <div className="flex justify-center mb-4">
            <ShoppingBag size={64} className="text-gray-300" />
          </div>
          <h2 className="text-xl font-semibold mb-3">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link
            to="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  const shippingCost = total >= 50 ? 0 : 7.99;
  const orderTotal = total + shippingCost;
  
  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <Link to="/" className="text-blue-600 hover:text-blue-800 inline-flex items-center">
            <ArrowLeft size={18} className="mr-1" />
            <span>Continue Shopping</span>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold ml-auto">Your Cart</h1>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50 text-gray-600 text-sm font-medium">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              
              {items.map(item => (
                <div key={item.id} className="border-b border-gray-200 last:border-0">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center">
                    {/* Product info */}
                    <div className="col-span-1 md:col-span-6 flex items-center">
                      <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <Link to={`/product/${item.id}`} className="font-medium text-gray-800 hover:text-blue-600">
                          {item.name}
                        </Link>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="md:col-span-2 flex md:block items-center justify-between">
                      <span className="md:hidden text-gray-600">Price:</span>
                      <span className="font-medium">${item.price.toFixed(2)}</span>
                    </div>
                    
                    {/* Quantity */}
                    <div className="md:col-span-2 flex md:justify-center items-center">
                      <span className="md:hidden text-gray-600 mr-2">Quantity:</span>
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-600 hover:text-gray-800"
                        >
                          <Minus size={14} />
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                          className="w-10 text-center border-x border-gray-300 py-1 focus:outline-none"
                          min="1"
                          max="10"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:text-gray-800"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Total and remove button */}
                    <div className="md:col-span-2 flex justify-between md:justify-end items-center">
                      <span className="md:hidden text-gray-600">Total:</span>
                      <div className="text-right">
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="block mt-1 text-red-500 hover:text-red-700 text-sm"
                        >
                          <Trash2 size={16} className="inline-block mr-1" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Cart actions */}
              <div className="p-4 flex flex-wrap items-center justify-between bg-gray-50">
                <button
                  onClick={clearCart}
                  className="flex items-center text-gray-600 hover:text-red-600"
                >
                  <Trash2 size={18} className="mr-1" />
                  <span>Clear Cart</span>
                </button>
                
                <button
                  onClick={() => {/* Refresh cart */}}
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <RefreshCw size={18} className="mr-1" />
                  <span>Update Cart</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Order summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                {shippingCost > 0 && (
                  <div className="text-sm text-gray-500 italic pt-1">
                    Add ${(50 - total).toFixed(2)} more to get free shipping
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition-colors mb-4">
                Proceed to Checkout
              </button>
              
              {/* Payment methods */}
              <div className="text-center text-sm text-gray-500 mb-4">
                <p>We accept:</p>
                <div className="flex justify-center space-x-2 mt-2">
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
            
            {/* Coupon code */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-4">
              <h3 className="font-medium mb-3">Apply Coupon</h3>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="flex-grow border border-gray-300 rounded-l-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md transition-colors">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;