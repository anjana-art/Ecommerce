const express = require("express");
const app = express();
require("dotenv").config();

const { PORT } = process.env;



/* app.get("/test", (req, res) => {
  res.json("test okey");
}); */

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
