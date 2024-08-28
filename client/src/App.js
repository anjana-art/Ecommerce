import "./App.css";
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
import { CartContextProvider } from "./CartContext.js";

axios.defaults.baseURL = "http://localhost:5555";
axios.defaults.withCredentials = true;




function App() {

  return (
    <UserContextProvider>
      <CartContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />}></Route>
            <Route path="/api/users/login" element={<LoginPage />}></Route>
            <Route path="/api/users/register" element={<RegisterPage />}></Route>
            <Route path="/api/users/profile" element={<ProfilePage />}></Route>
            <Route path="/api/products/allProducts" element={<AllProducts />}></Route>
            <Route path="/api/products/myListings" element={<MyListings />}></Route>
            <Route path="/api/products/myOrders" element={<MyOrder />}></Route>
            <Route path="/api/products/addNewProduct" element={<AddNewProduct />}></Route>
            <Route path="/api/products/myListings/:id" element={<UpdatePage />}></Route>
             <Route path="/api/products/allProducts/:id" element={<DetailViewPage/>}></Route> 






          </Route>
        </Routes>
      </Router>
      </CartContextProvider>
    </UserContextProvider>
  );
}

export default App;
