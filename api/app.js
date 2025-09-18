const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const multer = require('multer');
const mongoose = require('mongoose');
const authMiddleware = require('./middleware/auth.js');
const jwt = require('jsonwebtoken'); 


app.use(express.urlencoded({ extended: true })); // for parsing form data
app.use(express.json());

const cors = require("cors");

const { PORT } = process.env || 5555;

app.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.split(' ')[1];
      // Skip verification if token is literally 'null' or 'undefined'
      if (!['null', 'undefined'].includes(token.toLowerCase())) {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { payload };
      }
    } catch (error) {
      console.warn('Token verification failed:', {
        message: error.message,
        tokenExists: !!authHeader
      });
    }
  }
  next();
});

const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');
const orderRouter = require('./routes/orderRouter');


const mongoURI =  'mongodb+srv://bhattaanjana0:anjana123@anjana.zcmelmw.mongodb.net/myCollection?retryWrites=true&w=majority&appName=anjana';



app.use('/uploads', express.static(__dirname+ '/uploads'));
console.log('dir name in app.js', __dirname);

app.use(cookieParser());

app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:3000",
      "https://ecommerce-nine-chi-w749exhov6.vercel.app"],
      exposedHeaders: ['set-cookie']
     
    })
  );



  // Pre-flight requests
  app.options('*', cors());

  app.use('/api/users', userRouter);
  app.use('/api/products', productRouter);
  app.use('/api/cart',authMiddleware, cartRouter);
  app.use('/api/orders',authMiddleware,orderRouter);
  //optional
  // Apply to all API routes that need auth
  //app.use('/api', authMiddleware); // This will affect all /api/* routes


//Test route
 app.get("/test", (req, res) => {
  res.json("test okey");
}); 

// Error handling middleware
 app.use((err, req, res, next) => {
  console.error('Backend Error:', err.stack);
  res.status(500).send('Server Error!');
 });


module.exports = app;