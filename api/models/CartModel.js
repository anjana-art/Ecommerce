const mongoose = require("mongoose");
const {Schema, model} = require('mongoose');
const ProductSchema = require('./ProductModel'); 


const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  sessionId: { type: String},
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 },
    price: Number
  }],
  createdAt: { type: Date, default: Date.now, expires: '30d' } // auto-delete after 30 days
}, { timestamps: true });

// Add validation to require either user or sessionId
cartSchema.pre('validate', function(next) {
  if (!this.user && !this.sessionId) {
    this.invalidate('user', 'Cart must have either a user or sessionId');
  }
  next();
});



module.exports = mongoose.model('Cart', cartSchema, 'cart');