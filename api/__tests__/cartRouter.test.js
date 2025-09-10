const request = require('supertest');
const express = require('express');
const cartRouter = require('../routes/cartRouter');
const cartService = require('../services/cartService');

// Mock the cart service
jest.mock('../services/cartService', () => ({
  removeFromCart: jest.fn()
}));

const app = express();
app.use(express.json());
app.use('/api/cart', cartRouter);

describe('DELETE /api/cart/items/:itemId', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete an item (200 OK)', async () => {
    cartService.removeFromCart.mockResolvedValue({
      items: [{ _id: 'item2', product: 'prod2', quantity: 2 }]
    });

    const res = await request(app)
      .delete('/api/cart/items/item1')
      .set('Authorization', 'Bearer fakeToken')
      .query({ sessionId: 'session123' });

    expect(res.status).toBe(200);
    expect(res.body.items).toHaveLength(1);
    expect(cartService.removeFromCart).toHaveBeenCalledWith(
      undefined, // userId
      'session123',
      'item1'
    );
  });

  it('should fail if item does not exist (404)', async () => {
    cartService.removeFromCart.mockRejectedValue(
      new Error('Item not found in cart')
    );

    const res = await request(app)
      .delete('/api/cart/items/invalidItem')
      .set('Authorization', 'Bearer fakeToken');

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Item not found in cart');
  });
});