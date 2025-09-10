const app = require('./app.js')
require("dotenv").config();
const connectDB = require('./db');


const  PORT  = process.env.PORT || 5555;


// Start server only after DB connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});


