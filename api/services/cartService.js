const mongoose = require("mongoose");
const Cart = require("../models/CartModel");
const CartModel = require("../models/CartModel");
const Product = require("../models/ProductModel");

const { MONGODB_CONNECTION_URI } = process.env;

async function findUser() {
  const customerCart = await Cart.findOne({ id });
}

const addToCart = async ({ userId, productId, quantity, price, title }) => {
  try {
    await mongoose.connect(MONGODB_CONNECTION_URI);

    const cart = new CartModel({
     userId,
     productId,
     quantity,
     price,
     title
    });
    await cart.save();

    return cart;
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.connection.close();
  }
};

module.exports = { findUser , addToCart};
