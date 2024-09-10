const mongoose = require("mongoose");
const Cart = require('../models/CartModel');
const Product = require('../models/ProductModel');



const { MONGODB_CONNECTION_URI } = process.env;

async function findUser(){
   const customerCart= await Cart.findOne({id});
}

module.exports = { findUser };

