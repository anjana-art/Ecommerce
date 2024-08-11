const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");


const { PORT } = process.env;

const userRouter = require('./routes/userRouter');



app.use(express.json());
app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );

  app.use('/api/users', userRouter);


 app.get("/test", (req, res) => {
  res.json("test okey");
}); 



app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
