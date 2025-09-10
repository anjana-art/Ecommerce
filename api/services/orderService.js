const mongoose = require('mongoose');

const User= require('../models/UserModel');
const Order= require('../models/OrderModel');
const Cart = require('../models/CartModel');
const OrderModel = require('../models/OrderModel');





    
  /**
   * Create a new order and clear user's cart
   */
  const createOrder = async (userId, items, totalAmount, shippingAddress, paymentData) => {
    const session = await mongoose.startSession();

    try {
            session.startTransaction();
         // Verify user exists
            const user = await User.findById(userId).session(session);
            if (!user) {
            throw new Error('User not found');
            }
      // Create new order
      const order = new Order({
        user: userId,
        items: items,
        totalAmount: totalAmount,
        shippingAddress: shippingAddress,
        paymentStatus: 'completed',
        paymentData: paymentData,
        orderStatus: 'processing'
      });
        const savedOrder = await order.save({ session });
           console.log('✅ Order saved:', savedOrder._id);

      // Add order to user's orders 
      await User.findByIdAndUpdate(
        userId,
        { 
          $push: { orders: savedOrder._id }
        },
        { session }
      );

      // Clear cart from Cart model
     const cartDeleteResult =  await Cart.findOneAndDelete({ user: userId }, { session });
     console.log('Cart cleared:', cartDeleteResult);

      await session.commitTransaction();
      console.log('✅ Transaction committed successfully');
      
      return {
        success: true,
        order: savedOrder
      };
    } catch (error) {
        // Abort transaction on error
    if (session.inTransaction()) {
      await session.abortTransaction();
      console.log('❌ Transaction aborted due to error');
    }
      console.error('Error in createOrder service:', error);
      throw new Error(`Failed to create order: ${error.message}`);
    } finally {
    // end the session
    session.endSession();
    console.log('✅ Session ended');
  }
  }

  /**
   * Get orders by user ID
   */
 const getOrdersByUser = async ({userId}) => {
   try{
    return await OrderModel.find({user: userId})
    .populate({
      path: 'items.product',
      select: 'title photos'
    })
    .sort({ createdAt: -1 });
   } catch (error) {
    console.error(error);
  } 
}
  /**
   * Get order by ID with user validation
   */
  const getOrderById= async (orderId, userId) => {
    try {
      const order = await Order.findById(orderId)
        .populate('user', 'firstName lastName email')
        .populate('items.product');

      if (!order) {
        throw new Error('Order not found');
      }

      // Check if order belongs to the user
      if (order.user._id.toString() !== userId) {
        throw new Error('Access denied');
      }

      return order;
    } catch (error) {
      console.error('Error in getOrderById service:', error);
      throw new Error(`Failed to fetch order: ${error.message}`);
    }
  }

  /**
   * Update order status
   */
 const updateOrderStatus =async (orderId, status) => {
    try {
      const order = await Order.findByIdAndUpdate(
        orderId,
        { orderStatus: status },
        { new: true }
      );

      if (!order) {
        throw new Error('Order not found');
      }

      return order;
    } catch (error) {
      console.error('Error in updateOrderStatus service:', error);
      throw new Error(`Failed to update order: ${error.message}`);
    }
  }


module.exports = {createOrder,getOrdersByUser};