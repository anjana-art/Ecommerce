import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext.js";
import { CartContext } from "../CartContext.js";
import Product from "../components/Product.js";

const LandingPage = () => {
  
  return (
   <Product/>
  );
};

export default LandingPage;
