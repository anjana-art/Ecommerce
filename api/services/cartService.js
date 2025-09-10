const Cart = require("../models/CartModel");
const Product = require("../models/ProductModel");
const mongoose = require("mongoose");



/* const CONNECTION_URI = process.env.MONGODB_CONNECTION_URI ||'mongodb+srv://bhattaanjana0:anjana123@anjana.zcmelmw.mongodb.net/myCollection?retryWrites=true&w=majority&appName=anjana' ;
 */
async function convertSessionCartToUserCart(sessionCart, userId) {
  try {
/*     await mongoose.connect(CONNECTION_URI);
 */    
    sessionCart.user = userId;
    sessionCart.sessionId = undefined;

    // Save the merged cart to database
    await sessionCart.save();

    //Return the merged cart
    return sessionCart;
    
  } catch (error) {
    console.error('Error convert session cart into  carts:', error);
    throw new Error('Failed to merge carts');
  }/* finally {
    await mongoose.connection.close();
  } */
}

// Helper to merge two carts
async function mergeCarts(userCart, sessionCart, userId) {
  const existingItems = new Map(
    userCart.items.map(item => [item.product.toString(), item])
  );

  // Add items from session cart that don't exist in user cart
  sessionCart.items.forEach(sessionItem => {
    const key = sessionItem.product.toString();
    if (!existingItems.has(key)) {
      userCart.items.push(sessionItem);
    }
  });

  await userCart.save();
  await Cart.deleteOne({ _id: sessionCart._id }); // Remove old session cart

  return userCart;
}



/* const getCart = async (userId, sessionId) => {
  try {
    console.log('Searching cart for:', { userId, sessionId });
    let cart;

    // 1. Try user cart first
    if (userId) {
      cart = await Cart.findOne({ user: userId }).populate('items.product');
    }

    // 2. Check session cart
    if (!cart && sessionId) {
      cart = await Cart.findOne({ sessionId }).populate('items.product');
      if (cart && userId) {
        cart = await convertSessionCartToUserCart(cart, userId);
      }
    }

    // 3. Create new cart if none exists
    if (!cart) {
      const newCartData = userId ? { user: userId } : { sessionId };
      cart = new Cart({ ...newCartData, items: [] });
      await cart.save();
    }

    return cart;
  } catch (error) {
    console.error('Error in getCart:', error);
    throw error;
  }
};


 */

const getCart = async (userId, sessionId) => {
  try {
    console.log('Searching cart for:', { userId, sessionId });
    let userCart = null;
    let sessionCart = null;

    // 1. Try to get user cart if userId exists
    if (userId) {
      userCart = await Cart.findOne({ user: userId }).populate('items.product');
    }

    // 2. Try to get session cart if sessionId exists
    if (sessionId) {
      sessionCart = await Cart.findOne({ sessionId }).populate('items.product');
    }

    // 3. If we have both carts, merge them
    if (userCart && sessionCart) {
      return await mergeCarts(userCart, sessionCart, userId);
    }

    // 4. If only session cart exists and we have userId, convert it
    if (sessionCart && userId) {
      return await convertSessionCartToUserCart(sessionCart, userId);
    }

    // 5. If only user cart exists, return it
    if (userCart) {
      return userCart;
    }

    // 6. If only session cart exists (no userId), return it
    if (sessionCart) {
      return sessionCart;
    }

    // 7. Create new cart if none exists
    const newCartData = userId ? { user: userId } : { sessionId };
    const newCart = new Cart({ ...newCartData, items: [] });
    await newCart.save();
    return newCart;
  } catch (error) {
    console.error('Error in getCart:', error);
    throw error;
  }
};

const mergeUserCartAfterLogin = async (userId, sessionId) => {
  try {
    // Get both carts separately
    const userCart = await Cart.findOne({ user: userId }).populate('items.product');
    const sessionCart = await Cart.findOne({ sessionId }).populate('items.product');

    if (!sessionCart) {
      return userCart || await getCart(userId, null); // No session cart to merge
    }

    if (!userCart) {
      // No existing user cart, just convert the session cart
      return await convertSessionCartToUserCart(sessionCart, userId);
    }

    // Both carts exist - merge them
    return await mergeCarts(userCart, sessionCart, userId);
  } catch (error) {
    console.error('Error merging carts after login:', error);
    throw error;
  }
};

const addToCart = async (userId,sessionId, productId, quantity = 1) => {
  try {
/*         await mongoose.connect(CONNECTION_URI);
 */      

             console.log('Starting addToCart with:', { 
                  userId, 
                  sessionId, 
                  productId, 
                  quantity 
                });

                // Validate inputs
                if (!productId) throw new Error('Product ID is required');
                if (!userId && !sessionId) {
                  throw new Error('Either userId or sessionId must be provided');
                }
             // First get or create the cart
        let cart = await getCart(userId, sessionId);
        console.log('Found cart:', cart ? cart._id : 'null');

            if (!cart)  {
          // Create new cart if none exists
          cart = new Cart({
            [userId ? 'user' : 'sessionId']: userId || sessionId,
            items: []
          });
          console.log('Created new cart');
        }


       //Verify Product Exists
        const product = await Product.findById(productId);
        if (!product) throw new Error(`Product ${productId} not found`);
        console.log('Found product:', product.name);

       //Find existing item or add new one
        const existingItem = cart.items.find(item => item.product.equals(productId));
        
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          cart.items.push({
            product: productId,
            quantity,
            price: product.price
          });
        }
    await cart.save();
    console.log('Successfully saved  new item in cart');
    return cart;
  } catch (error) {
    console.error("Add to cart error:",
      {
      error: error.message,
      stack: error.stack,
      params: { userId, sessionId, productId, quantity }
      }
    );
    throw error; // Rethrow for router to handle
  }/* finally {
      await mongoose.connection.close();
    } */
};

const removeFromCart = async (userId, sessionId, itemId) => {
  try {
    console.log('Starting removeFromCart with:', { 
      userId, 
      sessionId, 
      itemId 
    });
    

    // Validate inputs
    if (!itemId) throw new Error('Item ID is required');
    if (!userId && !sessionId) {
      throw new Error('Either userId or sessionId must be provided');
    }

    // Get the cart
    const cart = await getCart(userId || undefined, sessionId || undefined);
    console.log('Found cart:', cart ? cart._id : 'null');

    if (!cart) {
      throw new Error('Cart is empty');
    }

    if (!cart.items || cart.items.length === 0) {
      throw new Error('Cart is empty');
    }
     // Check if item exists in cart
    const itemIndex = cart.items.findIndex(item => 
      item._id.toString() === itemId ||   (item.product && item.product.toString() === itemId)

      
    );

    if (itemIndex === -1) {
      throw new Error('Item not found in cart');
    }
   // Remove the item
    cart.items.splice(itemIndex, 1);
   
      
    await cart.save();
    console.log('Successfully removed item from cart');
    return cart;
  } catch (error) {
    console.error("Remove from cart error:", {
      error: error.message,
      stack: error.stack,
      params: { userId, sessionId, itemId }
    });
    throw error;
  }
};

const updateCartItem = async (userId, sessionId, itemId, newQuantity) => {
  try {
    console.log('Starting updateCartItem with:', { 
      userId, 
      sessionId, 
      itemId, 
      newQuantity 
    });

    // Validate inputs
    if (!itemId) throw new Error('Item ID is required');
    if (!newQuantity || newQuantity < 1) {
      throw new Error('Quantity must be at least 1');
    }
    if (!userId && !sessionId) {
      throw new Error('Either userId or sessionId must be provided');
    }

    // Get the cart
    const cart = await getCart(userId || undefined, sessionId || undefined);
    console.log('Found cart:', cart ? cart._id : 'null');

    if (!cart) {
      throw new Error('Cart not found');
    }

    if (!cart.items || cart.items.length === 0) {
      throw new Error('Cart is empty');
    }

    // Find the item
    const itemToUpdate = cart.items.find(item => 
      item._id.toString() === itemId || 
      (item.product && item.product.toString() === itemId)
    );

    if (!itemToUpdate) {
      throw new Error('Item not found in cart');
    }

    // Update the quantity
    itemToUpdate.quantity = newQuantity;
    
    // Update price if needed (in case product price changed)
    if (itemToUpdate.product && typeof itemToUpdate.product.price === 'number') {
      itemToUpdate.price = itemToUpdate.product.price;
    }

    await cart.save();
    console.log('Successfully updated item quantity');
    return cart;
  } catch (error) {
    console.error("Update cart item error:", {
      error: error.message,
      stack: error.stack,
      params: { userId, sessionId, itemId, newQuantity }
    });
    throw error;
  }
};



module.exports = { addToCart, getCart,mergeCarts,updateCartItem,convertSessionCartToUserCart , mergeUserCartAfterLogin, removeFromCart};