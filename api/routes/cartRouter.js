const express = require("express");
const jwt = require("jsonwebtoken");
const { addToCart, getCart ,removeFromCart,updateCartItem,convertSessionCartToUserCart} = require("../services/cartService");

const router = express.Router();

// Get current cart
router.get('/', async (req, res) => {
  try {
    /*
    console.log('=== CART REQUEST ===');
    console.log('Auth user:', req.user); // Should show user data
     console.log('auth user id:', req.user.payload?._id);
    console.log('Query params:', req.query); // Should show sessionId if guest
     */
    const userId = req.user?.payload ?._id || null;
    const sessionId = req.query.sessionId || req.cookies?.sessionId;

    console.log('User ID:', userId);
    console.log('Session ID:', sessionId);

     if (!userId && !sessionId) {
      return res.json({ items: [] }); // Empty cart for new guests
    }
    
    const cart = await getCart(userId, sessionId);
      return res.json(cart || {items:[]});
  } catch (error) {
    res.status(500).json({
       error: 'cart load failed',
      details: error.message });
  }
});

// Add item to cart
router.post('/add', async (req, res) => {
  try {

    console.log('Raw request body:', req.body); // First thing in the handler
    
    
     
     // Get values from both body and cookies as fallback
    const {   productId, quantity = 1 } = req.body;
    const userId = req.user?.payload?._id || req.body.userId || null;
    const sessionId = req.body.sessionId || req.cookies?.sessionId;
 
     // Debug extracted values
     console.log('Extracted: values get from body and cookies', { userId, sessionId, productId, quantity });
 
    // Validate required fields
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }
    if (!userId && !sessionId) {
      return res.status(400).json({ 
        error: 'Either user authentication or session ID is required',
        received: {
          authUser: !!req.user,
          bodyUserId: !!req.body.userId,
          bodySessionId: !!req.body.sessionId,
          cookieSessionId: !!req.cookies?.sessionId
        }
      });
    }
    

    // Use the service properly
    const updatedCart = await addToCart(userId, sessionId, productId, quantity);
   
    res.json(updatedCart);
  } catch (error) {
     console.error('Add to cart error:', {
      error: error.message,
      stack: error.stack,
      body: req.body,
      user: req.user
    });
    res.status(500).json({
      error:'Failed to add item to cart',
      details: error.message });
  }
});

// Update cart item quantity
router.put('/items/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.query;
    const userId = req.user?.payload?._id || undefined;
    const sessionId =req.body.sessionId || req.query.sessionId || req.cookies?.sessionId || undefined;

    console.log('Update item request:', { userId, sessionId, itemId, quantity });

    if (!itemId) {
      return res.status(400).json({ error: 'Item ID is required' });
    }

    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: 'Valid quantity (≥1) is required' });
    }

    if (!userId && !sessionId) {
      return res.status(400).json({ 
        error: 'Either user authentication or session ID is required'
      });
    }

    const updatedCart = await updateCartItem(userId, sessionId, itemId, quantity);
    res.json(updatedCart);
  } catch (error) {
    if (error.message === 'Item not found in cart') {
      return res.status(404).json({ error: error.message });
    }
    
    res.status(400).json({
      error: error.message
    });
  }
});

// Delete item from cart
router.delete('/items/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    const userId = req.user?.payload?._id || undefined;
    const sessionId = req.query.sessionId || req.cookies?.sessionId || undefined;

    console.log('Delete item request:', { userId, sessionId, itemId });

    if (!itemId) {
      return res.status(404).json({ error: 'Item ID is required' });
    }

    if (!userId && !sessionId) {
      return res.status(400).json({ 
        error: 'Either user authentication or session ID is required'
      });
    }

    const updatedCart = await removeFromCart(userId, sessionId, itemId);
    res.json(updatedCart);
  } catch (error) {
    if (error.message === 'Item not found in cart') {
      return res.status(404).json({ error: error.message });
    }
    if (error.message === 'Cart is empty') {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(500).json({
      error:error.message
    });
  }
});

// Other cart routes...

module.exports = router;