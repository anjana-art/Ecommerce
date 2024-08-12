import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import LoginPage from "./pages/LoginPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import Layout from "./components/Layout.js";
import axios from "axios";
import { UserContextProvider } from "./UserContext.js";

axios.defaults.baseURL = "http://localhost:5555";
axios.defaults.withCredentials = true;




function App() {

  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />}></Route>
            <Route path="/api/users/login" element={<LoginPage />}></Route>
            <Route path="/api/users/register" element={<RegisterPage />}></Route>
            <Route path="/api/users/profile" element={<ProfilePage />}></Route>

          </Route>
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
