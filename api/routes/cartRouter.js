const express = require("express");
const mongoose = require("mongoose");




const {findUser } = require('../services/cartService');
const { getProductById} = require("../services/productService");


const cartRouter = express.Router();

cartRouter.post('/addToCart', async (req, res)=>{
    //find if customer cart already exist
     const customerCart = await findUser({_customerId: req.customerId})
     const product = await getProductById(req.body._product);

    // if customer cart already exist,

      //find and update quantity if item exist already in cart
      // push item to cart if item doesnot exist in cart

   // if customer cart does not exist, add new customer cart   

})




module.exports = cartRouter;
