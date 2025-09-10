const { removeFromCart } = require('../services/cartService');
const Cart = require('../models/CartModel');

jest.mock('../models/CartModel');

describe('removeFromCart', () => {
  let mockCart;

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockCart = {
      _id: 'cart123',
      user: 'user123',
      items: [
        { _id: 'item1', product: { _id: 'prod1', toString: () => 'prod1' }, quantity: 1 },
        { _id: 'item2', product: { _id: 'prod2', toString: () => 'prod2' }, quantity: 2 },
      ],
      save: jest.fn().mockResolvedValue(function() {
        return Promise.resolve(this);
      })
    };

    // Default mock implementation
    Cart.findOne.mockImplementation(() => ({
  populate: jest.fn().mockReturnThis(),
  exec: jest.fn().mockResolvedValue({
    ...mockCart,
    items: mockCart.items.map(item => ({
      ...item,
      product: {
        ...item.product,
        toString: () => item.product._id
      }
    }))
  })
}));
   
     });
   

  it('should remove an item from the cart', async () => {
    const result = await removeFromCart('user123', null, 'item1');
    
    expect(result.items).toHaveLength(1);
    expect(result.items[0]._id).toBe('item2');
    expect(mockCart.save).toHaveBeenCalled();
  });

  it('should throw error if item does not exist', async () => {
   
    await expect(removeFromCart('user123', null, 'invalidItem'))
      .rejects
      
      .toThrow('Item not found in cart');
      // Verify the cart wasn't saved
    expect(mockCart.save).not.toHaveBeenCalled();
  });

  it('should throw error if cart does not exist', async () => {
    // Override the default mock for this test
    Cart.findOne.mockImplementation(() => ({
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(null)
    }))
     
     await expect(removeFromCart({ userId: 'nonexistentUser', sessionId: null, itemId: 'item1' }))
      .rejects
      .toThrow('Cart is empty');
    
  });

    it('should throw error if cart is empty', async () => {
    // Override mock for empty cart
    Cart.findOne.mockImplementation(() => ({
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue({
        ...mockCart,
        items: []
      })
    }))
     await expect(removeFromCart('user123', null, 'item1'))
      .rejects
      .toThrow('Cart is empty');
  });

       });


