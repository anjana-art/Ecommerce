
const express = require("express");
const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken");
const { User,Product } = require("../models/UserModel");
const toId = mongoose.Types.ObjectId;

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  getProductsBySellerId,
  getProductsByCatagory,
} = require("../services/productService");
const UserModel = require("../models/UserModel");

const productRouter = express.Router();

productRouter.get("/allProducts", async (req, res) => {

    const product = await getProducts();

    console.log(" getting  all products", product);

    res.json(product);

});



productRouter.post(
  "",
  (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).send({
        status: "failure",
        data: "Missing auth token",
      });
    }

    next();
  },
  async (req, res, next) => {
    try {
      const { authorization } = req.headers;

      const [tokenType, token] = authorization.split(" ");
      const result = jsonwebtoken.verify(token, "MY_SUPER_STRONG_PASSWORD");

      if (!result) {
        return res.status(401).send({
          status: "failure",
          data: "Invalid auth token",
        });
      }
      req.userId = result.userId;
      req.email = result.email;
      req.permissions = result.permissions;

      next();
    } catch (error) {
      return res.status(401).send({
        status: "failure",
        data: error,
      });
    }
  },
  async (req, res, next) => {
    try {
      const { permissions } = req;
      const PERMISSION_CREATE_PRODUCT = "CREATE_PRODUCT";

      if (!permissions.includes(PERMISSION_CREATE_PRODUCT)) {
        return res.status(403).send({
          status: "failure",
          data: "No permission to create product",
        });
      }

      return next();
    } catch (error) {
      return res.status(401).send({
        status: "failure",
        data: error,
      });
    }
  },
  async (req, res) => {
    try {
      const { title, description, price } = req.body;

      const newProduct = await createProduct({
        title,
        description,
        price,
      });

      res.send({
        status: "success",
        data: newProduct,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: "failure",
        data: error,
      });
    }
  }
);

productRouter.post("/addNewProduct", (req, res) => {
  try {
    const { token } = req.cookies;
    const { title, catagory, addedPhotos, price, description } = req.body;
    const jwtSecret = " asldkfjlskdjfad this is jwtSecret.";

     console.log('Token received:', token);
    
    // First, just decode without verification to see the payload
    const decoded = jsonwebtoken.decode(token);
    console.log('Decoded seller  token payload:', decoded);

    jsonwebtoken.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        throw err;
      }
      
      console.log('seller Id', userData._id);
      const seller = userData._id;
      const photos = addedPhotos;
      
      const productDoc = await createProduct({
        seller,
        title,
        catagory,
        photos,
        price,
        description,
      });

      // Update the user document to include this product reference
     await UserModel.findByIdAndUpdate(
      seller,
      { $push: { products: productDoc._id } },
      { new: true }
    );
      
      console.log("created product", productDoc);
      res.json('Added New Product to the database');
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "failure",
      data: error,
    });
  }
});

productRouter.get("/myListings", (req, res) => {
  const { token } = req.cookies;
  const jwtSecret = " asldkfjlskdjfad this is jwtSecret.";

  jsonwebtoken.verify(token, jwtSecret, {}, async (err, userData) => {
    console.log('UserData for seller Id ', userData);
    if (err) throw err;
    const  id  = userData._id;
    console.log("user seller by id", id);

    const product = await getProductsBySellerId({id});

    console.log(" getting products by ID", product);

    res.json(product);

    /*  console.log(userData.id === productDoc.seller);
console.log('userdata.id', userData.id);
console.log('productDoc.seller', productDoc.seller)
  if (id === productDoc.seller.toString()) {

    const product = await getProductById(productDoc._id);
    console.log('product by id', product)

    res.json(product); 
    }else(console.log("error"))*/
  });
});

productRouter.get("/allProducts/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await getProductById(id));
 

});

productRouter.get("/getProductById", async (req, res) => {
  const { id } = req.params;
  res.json(await getProductById(id));
 

});

productRouter.get('/catagory', async (req, res)=>{
  const {catagory} = req.body;
  console.log('product catagory from req body',catagory);

  
  res.json(await getProductsByCatagory(catagory));
})

productRouter.put("/myListings/:id", async (req, res) => {
    const productId = req.params.id;
    console.log('productId', req.params.id);
    const { token } = req.cookies;
    const {title, catagory, addedPhotos, description, price} = req.body;

    console.log('title:', title);
    console.log('description:', description);
    const jwtSecret = " asldkfjlskdjfad this is jwtSecret.";

  jsonwebtoken.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const userId = userData._id;                                

     console.log('userid', userId);
    const productDoc = await getProductById(productId);
    console.log('productDoc', productDoc);

/*     console.log(productDoc.seller.toString())
    console.log(userData.id ) */

    if (userData._id === productDoc.seller.toString()) {


      const photos = addedPhotos;
   

   /*    productDoc.set({
        title,
        catagory,
        photos,
        price,
        description,
      });

     await  productDoc.save(); */
    
      
        const userId = userData._id;
        const id = productId;

     const updated =  await updateProduct(id,{title, catagory, photos, description, price});  

      res.json("ok");
      console.log('updated product', updated)
    } else{
      console.log("Not authorized to make a change");
    }
  });
});

module.exports = productRouter;
