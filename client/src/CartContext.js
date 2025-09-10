import React, { createContext,useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from "./UserContext.js";
import { redirect } from 'react-router-dom';

// At the top with other imports
axios.defaults.withCredentials = true; // For session cookies
// OR for JWT:
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;



 export const CartContext = createContext();

export function CartContextProvider({ children }) {
  const [cart, setCart] = useState({items:[]});
  const [cartReady, setCartReady]=useState(false)
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(true);
  

   const [sessionId, setSessionId] = useState(
    localStorage.getItem('sessionId') || generateSessionId()
  ); 
   const { ready, user } = useContext(UserContext);


  // Generate a unique session ID for anonymous users
  function generateSessionId() {
    const id = 'anon_' + Math.random().toString(36).substring(2, 11);
    localStorage.setItem('sessionId', id);
    return id;
  }
  // Then ensure it's saved to sessionStorage
useEffect(() => {
  if (sessionId && !sessionStorage.getItem('sessionId')) {
    sessionStorage.setItem('sessionId',sessionId);
  }
}, [sessionId]);

  // In your React component/context
useEffect(() => {
  console.log('Current auth state:', user); // Should show user object
  console.log('Session ID:', sessionStorage.getItem('sessionId'));
}, [user]);



  const loadCart = useCallback(async () => {
        if (!ready) return; // Wait until UserContext is ready
   /*  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    params: {
      sessionId: sessionStorage.getItem('sessionId')
    }
  }; */
      try {
        const params = {};

          if (user?._id) {

        params.userId = user._id;// From UserContext
           }else{
         params.sessionId = sessionId; // From local state

            }

         const { data } = await axios.get('/api/cart', {params});
        setCart(data?.items ? {items: data.items}: { items: [] });
        console.log('Cart', cart);
       
      } catch (error) {
        console.error('Failed to load cart', error);
        setCart({ items: [] }); // Fallback empty cart

      }finally {
        setCartReady(true);
              setLoading(false);

      }
  },[user?._id,sessionId,ready]);
  
    useEffect(() => {
  loadCart();
   }, [loadCart]);

   





   function getAuthToken() {
      return localStorage.getItem('token');
          }

  


  //debug purpose only 
  useEffect(() => {
    console.log('CartContext state:', {
      user: user?._id,
      ready,
      sessionId,
      cartReady,
      cartItems: cart?.items?.length || 0
    });
  }, [user, sessionId,ready,cartReady, cart]);

  const addToCart = async ( productId, quantity = 1) => {
        const data = {
            productId,
            quantity,
            ...(user?._id ? { userId: user._id } : { sessionId: sessionId })
          };
    try {
      const response = await axios.post('/api/cart/add',data, {
        headers: {
          'Content-Type': 'application/json',
            ...(user?._id ? { 
          'Authorization': `Bearer ${getAuthToken()}` 
        } : {})
        }
      });
      setCart(response.data);
    } catch (error) {
      console.error('Failed to add to cart', error);
      throw error; // Re-throw so UI can show error

    }
  };

  //buyNow if there is no item add 1 , if item already exists dont add 

  //Delete items from Cart
  const deleteFromCart = async (itemId) => {
  try {
     const params = {};

          if (user?._id) {
         params.userId = user._id;// From UserContext
           }else{
         params.sessionId = sessionId; // From local state
             }

    const response = await axios.delete(`/api/cart/items/${itemId}`, {params});
        
    // Update local cart state
    setCart(prevCart => ({
      items: prevCart.items.filter(item => item._id !== itemId)
    }));
    refreshCart();

    return response.data; // Return updated cart if needed
  } catch (error) {
    console.error('Failed to delete item from cart', error);
    
    // Refresh cart to ensure sync with server
    refreshCart();
    
    throw error; // Re-throw so UI can show error
  }
};


  // Refresh cart function (reusable)
  const refreshCart = useCallback(async() => {
    try{
      let response;

      console.log('RefreshCart called with user:', user); // Debug log

    if (user?._id) {
          console.log('Using authenticated cart endpoint');

      response = await axios.get('/api/cart');
    
    } else {
       if(!sessionId){
        console.warn('No sessionId for anonymous user');
        setCart({ items: [] });
        return;
       }
      console.log('Using anonymous cart endpoint with sessionId:', sessionId);

      response = await axios.get('/api/cart', { params:{sessionId}});
        
    }
     setCart(response.data?.items ? {items: response.data.items}:{items:[]});

    } catch (error) {
    console.error('Cart refresh failed:', 
      {
        error: error.response?.data || error.message,
      status: error.response?.status,
      sessionId,
      user
      }
    );
    setCart({ items: [] }); // Fallback empty cart
  }
    
  }, [user, sessionId]);

   // Auto-refresh when user or sessionId changes
   useEffect(() => {
    if (ready) refreshCart();
  }, [user?._id, sessionId, ready, refreshCart]);

  // In your frontend component
useEffect(() => {
    if (!ready) return;
   const timer = setTimeout(() => {
   refreshCart();
  }, 3000); // Adjust delay as needed
  return () => clearTimeout(timer);
}, [user?._id,ready,refreshCart]);

// Update quantity of cart item
 const updateCartItem = async (itemId, newQuantity) => {
  try {
    const params = {
      quantity: Number(newQuantity),
      ...(user?._id ? { userId: user._id } : { sessionId: sessionId })

    };

     // Find the cart item that matches this product
    const cartItem = cart.items.find(item => 
      item.product && item.product._id === itemId
    );
    if (!cartItem) {
      throw new Error('Item not found in local cart');
    }
    
    // Make the request
    const response = await axios.put(
      `/api/cart/items/${cartItem._id}`,{},{params}
    );
    console.log('update cart item', response.data)

    // Update local state
    setCart(response.data || {items: []});
    return response.data;
  } catch (err) {
    console.error('Failed to update item quantity', {
      error: err.response?.data || err.message,
      status: err.response?.status,
      itemId,
      newQuantity
    });
    throw err;
  }
};
// Update subtotal whenever cart changes
  useEffect(() => {
    if (cart && cart.items) {
      const newSubtotal = cart.items.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
      }, 0);
      setSubtotal(newSubtotal);
    }
  }, [cart]);

   const clearCart = () => {
    setCart({ items: [] });
    // Optional: Also remove from localStorage
    localStorage.removeItem('cart');
  };

   // Add this function to clear cart and create order
  const createOrder = async (shippingAddress, paymentData) => {
    try {
      const token = getAuthToken();
      if (!user) {
        throw new Error('User must be logged in to create an order');
      }

      const orderData = {
        userId: user._id,
        items: cart.items,
        totalAmount: subtotal,
        shippingAddress: shippingAddress,
        paymentData: paymentData
      };

      const response = await axios.post('/api/orders', orderData, {
       headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      });

      if (response.data.success) {
        // Clear the local cart state
        setCart({ items: [] });
        localStorage.removeItem('cart');
        
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

   // Display loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Other cart operations...

  return (
    <CartContext.Provider value={{ cart, addToCart,deleteFromCart,updateCartItem,subtotal,clearCart, cartReady , refreshCart, createOrder/* other methods */ }}>
      {children}
    </CartContext.Provider>
  );
}

 export function useCart() {
  return useContext(CartContext);
} 