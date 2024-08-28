const mongoose = require("mongoose");
const Cart = require('../models/CartModel');
const Product = require('../models/ProductModel');



const { MONGODB_CONNECTION_URI } = process.env;

function CartFun(){
    return 'Cart';
}

module.exports = {CartFun };

