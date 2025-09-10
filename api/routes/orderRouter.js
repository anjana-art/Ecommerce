const express = require('express');
const router = express.Router();
const orderService = require('../services/orderService');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
 
const {createOrder, getOrdersByUser} = require('../services/orderService');
/**
 * @route   POST /api/orders
 * @desc    Create a new order
 * @access  Private
 */
router.post('/', auth, async (req, res) => {
  try {
    const {items, totalAmount, shippingAddress, paymentData } = req.body;
     const userId = req.user?.payload ?._id;
 

    const result = await createOrder(
      userId, 
      items, 
      totalAmount, 
      shippingAddress, 
      paymentData
    );
    
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      orderId: result.order._id
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @route   GET /api/orders/my-orders
 * @desc    Get orders for authenticated user
 * @access  Private
 */
router.get('/my-orders', auth, async (req, res) => {

  try {
    console.log('Authenticated user ID for orders:', req.user.id);

    console.log('User ID type:', typeof req.user.id);
    const userId = req.user?.payload ?._id;
    const orders = await getOrdersByUser({userId});
    console.log('getting Orders by userId', orders);
    
    res.json({
      success: true,
      orders: orders
    });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @route   GET /api/orders/:orderId
 * @desc    Get specific order by ID
 * @access  Private
 */
router.get('/:orderId', auth, async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.orderId, req.user.id);
    
    res.json({
      success: true,
      order: order
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    
    if (error.message === 'Access denied') {
      return res.status(403).json({
        success: false,
        message: error.message
      });
    }
    
    if (error.message === 'Order not found') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order'
    });
  }
});

/**
 * @route   GET /api/orders
 * @desc    Get all orders (Admin only)
 * @access  Private/Admin
 */
router.get('/', auth, adminAuth, async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    
    res.json({
      success: true,
      orders: orders
    });
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});


/**
 * @route   PATCH /api/orders/:orderId/status
 * @desc    Update order status (Admin only)
 * @access  Private/Admin
 */
router.patch('/:orderId/status', auth, async (req, res) => {
  try {
    // Check if user is admin (you'll need to implement this check)
    // if (!req.user.isAdmin) {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'Admin access required'
    //   });
    // }
    
    const { status } = req.body;
    const order = await orderService.updateOrderStatus(req.params.orderId, status);
    
    res.json({
      success: true,
      message: 'Order status updated successfully',
      order: order
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;