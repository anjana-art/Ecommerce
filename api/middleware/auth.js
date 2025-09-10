const jwt = require('jsonwebtoken');
const jwtSecret =  " asldkfjlskdjfad this is jwtSecret.";
require("dotenv").config();



module.exports = (req, res, next) => {

    // 1. Check both cookies and headers
    const token = req.cookies?.token || 
                 req.headers?.authorization?.replace('Bearer ', '');
    
      console.log('Auth middleware executing for:', req.path);
      console.log('Token found:', !!token,req.cookies?.token);

       if (!token) {
      console.log('No token found in request');
      return next(); // Continue as guest
    }

      try {
       // 2. Verify token
     const decoded = jwt.verify(token, jwtSecret || process.env.JWT_SECRET, { complete: true });
     console.log('DECODED TOKEN:', decoded);


    /*  // Ensure _id exists and is string format
    if (!decoded.id) {
      throw new Error('Token payload missing required id field');
    } */

    req.user = decoded;
    console.log('Authenticated user:', req.user);
    return next();
  } catch (err) {
    console.error('Token verification failed:', {
       message: err.message,
       tokenExists: !!token,
       token: token?.substring(0, 20) + '...', // Log first 20 chars
    });
    // Clear invalid token
        if (req.cookies?.token) {
      res.clearCookie('token', {
        httpOnly: true,
      });
    }

   // res.clearCookie('token');
    return next(); // Continue as guest
  }
};