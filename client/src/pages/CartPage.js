import React, { useContext, useState, useEffect } from "react";
import ProfileNav from "../components/ProfileNav.js";
import { CartContext } from "../CartContext.js";
import { UserContext } from "../UserContext.js";
import axios from "axios";
import { Link } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaArrowLeft } from "react-icons/fa";

const CartPage = () => {
  const { cart, cartReady, deleteFromCart, updateCartItem } = useContext(CartContext);
  const { ready, user } = useContext(UserContext);
  const [subtotal, setSubtotal] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  // Calculate subtotal whenever cart changes
  useEffect(() => {
    if (cart?.items) {
      const newSubtotal = cart.items.reduce((sum, item) => {
        return sum + ((item?.price || 0) * (item?.quantity || 0));
      }, 0);
      setSubtotal(newSubtotal);
    }
  }, [cart]);

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setIsUpdating(true);
    await updateCartItem(productId, newQuantity);
    setIsUpdating(false);
  };

  const incrementQuantity = (item) => {
    if (item?.product?._id && item?.quantity) {
      handleQuantityChange(item.product._id, item.quantity + 1);
    }
  };

  const decrementQuantity = (item) => {
    if (item?.quantity > 1 && item?.product?._id) {
      handleQuantityChange(item.product._id, item.quantity - 1);
    }
  };

  if (!cartReady || !ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // Check if cart or cart.items is undefined or not an array
  if (!cart || !Array.isArray(cart.items)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">Error loading cart</div>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center mb-6">
          <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800">
            <FaArrowLeft className="mr-2" /> Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-center flex-grow">Your Shopping Cart</h1>
          <div className="w-24"></div> {/* Spacer for balance */}
        </div>
        
        {cart?.items?.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <FaShoppingBag className="text-gray-300 text-5xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Link 
              to="/" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-gray-100 border-b">
                  <h2 className="text-xl font-semibold">Cart Items ({cart.items.length})</h2>
                </div>
                
                {cart.items.map(item => (
                  <div key={item.product} className="border-b last:border-b-0">
                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row gap-6">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          {item?.product?.photos?.length > 0 ? (
                            <img
                              className="w-28 h-28 object-contain rounded-lg bg-white border"
                              src={"http://localhost:5555/uploads/" + item.product.photos[0]}
                              alt={item.product.title}
                            />
                          ) : (
                            <div className="w-28 h-28 bg-gray-200 rounded-lg flex items-center justify-center">
                              <FaShoppingBag className="text-gray-400 text-xl" />
                            </div>
                          )}
                        </div>
                        
                        {/* Product Details */}
                        <div className="flex-grow">
                          <h3 className="text-lg font-medium text-gray-900 mb-1">
                            {item?.product?.title || "Unknown Product"}
                          </h3>
                          <p className="text-gray-500 text-sm mb-2">
                            {item?.product?.catagory || "No category"}
                          </p>
                          <p className="text-blue-600 font-semibold text-lg">
                            ${(item?.product?.price || 0).toFixed(2)}
                          </p>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex flex-col items-end justify-between">
                          <button 
                            onClick={() => deleteFromCart(item._id)}
                            className="text-red-500 hover:text-red-700 p-2"
                            aria-label="Remove item"
                          >
                            <FaTrash />
                          </button>
                          
                          <div className="flex items-center mt-4">
                            <button 
                              onClick={() => decrementQuantity(item)}
                              disabled={item?.quantity <= 1}
                              className={`p-2 rounded-l border-y border-l ${item?.quantity <= 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                            >
                              <FaMinus size={12} />
                            </button>
                            
                            <input 
                              className="w-12 h-10 border-y text-center focus:outline-none"
                              type="number" 
                              value={item?.quantity || 1} 
                              onChange={(e) => handleQuantityChange(item?.product?._id, parseInt(e.target.value) || 1)}
                              min="1"
                            />
                            
                            <button 
                              onClick={() => incrementQuantity(item)}
                              className="p-2 rounded-r border-y border-r text-gray-700 hover:bg-gray-100"
                            >
                              <FaPlus size={12} />
                            </button>
                          </div>
                          
                          <div className="mt-2 text-right">
                            <p className="text-gray-900 font-medium">
                              ${((item?.price || 0) * (item?.quantity || 0)).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h3 className="text-xl font-semibold mb-6 pb-3 border-b">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  
                  <div className="flex justify-between text-lg font-semibold pt-4 border-t">
                    <span>Total:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                </div>
                
                <Link 
                  to={user === 'Not found cookie' ? '/login' : '/checkout'} 
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-4 rounded-lg font-medium transition-colors mb-4"
                >
                  Proceed to Checkout
                </Link>
                
                <div className="text-xs text-gray-500 text-center">
                  <p>Free shipping on all orders</p>
                  <p>30-day money-back guarantee</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;