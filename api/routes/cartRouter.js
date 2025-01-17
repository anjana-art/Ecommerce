const express = require("express");
const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken");

const { findUser,addToCart } = require("../services/cartService");
const { getProductById } = require("../services/productService");

const cartRouter = express.Router();

/* cartRouter.post('/addToCart', async (req, res)=>{
    //find if customer cart already exist
     const customerCart = await findUser({_customerId: req.customerId})
     const product = await getProductById(req.body._product);

    // if customer cart already exist,

      //find and update quantity if item exist already in cart
      // push item to cart if item doesnot exist in cart

   // if customer cart does not exist, add new customer cart   

}) */

 cartRouter.post("/addToCart", (req, res) => {
  try {
    const { token } = req.cookies;
    const { productId, items, userId } = req.body;
    const jwtSecret = " asldkfjlskdjfad this is jwtSecret.";

    const productInfo = jsonwebtoken.verify(
      token,
      jwtSecret,
      {},
      async (err, userData) => {
        if (err) throw err;
        const userId = userData.id;
       // const photos = addedPhotos;
        const CartDoc = await addToCart({
          userId,productId
         
        });
        console.log("added userId and productid to token", token);
      }
    );
    res.status(200).json(productInfo);
    console.log('product Info:', productInfo)

  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "failure",
      data: error,
    });
  }
}); 



module.exports = cartRouter;
