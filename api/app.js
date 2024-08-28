const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const multer = require('multer');

const cors = require("cors");


const { PORT } = process.env;

const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');





app.use(express.json());
app.use('/uploads', express.static(__dirname+ '/uploads'));
console.log('dir name in app.js', __dirname);

app.use(cookieParser());

app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );

  app.use('/api/users', userRouter);
  app.use('/api/products', productRouter);
  app.use('/api/cart', cartRouter);



 app.get("/test", (req, res) => {
  res.json("test okey");
}); 



app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
