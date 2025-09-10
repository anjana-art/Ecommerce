 import "./App.css";
 import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import LoginPage from "./pages/LoginPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import Layout from "./components/Layout.js";
import axios from "axios";
import { UserContextProvider } from "./UserContext.js";
import AllProducts from "./pages/AllProducts.js";
import MyOrder from "./pages/MyOrder.js";
import AddNewProduct from "./pages/AddNewProduct.js";
import MyListings from "./pages/MyListings.js";
import UpdatePage from "./pages/UpdatePage.js";
import DetailViewPage from "./pages/DetailViewPage.js";
import {CartContextProvider} from "./CartContext.js";
import {ShopContextProvider} from "./ShopContext.js";
import CartPage from "./pages/CartPage.js";
import ShopCategory from "./pages/ShopCategory.js";
import Checkout from "./pages/Checkout.js";
import Payment from "./pages/Payment.js";
import PaymentSuccess from "./pages/PaymentSuccess.js";
import OrderHistory from "./pages/OrderHistory.js";

axios.defaults.baseURL = "http://localhost:5555";
axios.defaults.withCredentials = true;




function App() {

  return (
    <UserContextProvider>
      <CartContextProvider>
        <ShopContextProvider>
      <Router>
        <Routes>
          <Route  path="/" element={<Layout />}>
            <Route   index   element={<LandingPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/profile" element={<ProfilePage />}></Route>
            <Route path="/allProducts" element={<AllProducts />}></Route>
            <Route path="/myListings" element={<MyListings />}></Route>
            <Route path=  "/myOrders" element={<MyOrder />}></Route>
            <Route path="/addNewProduct" element={<AddNewProduct />}></Route>
            <Route path="/myListings/:id" element={<UpdatePage />}></Route>
            <Route path="/allProducts/:id" element={<DetailViewPage/>}></Route> 
            <Route path="/products/:catagory" element={<ShopCategory />}></Route>
            <Route path="/products/cart" element={<CartPage />}></Route>            
            <Route path="/checkout" element={<Checkout />}></Route> 
            <Route path="/payment" element={<Payment />}></Route> 
            <Route path="/paymentSuccess" element={<PaymentSuccess />}></Route> 
            <Route path="/orderHistory" element={<OrderHistory />}></Route> 

            

          </Route>
        </Routes>
      </Router>
      </ShopContextProvider>
      </CartContextProvider>
    </UserContextProvider>
  );
}

export default App;
