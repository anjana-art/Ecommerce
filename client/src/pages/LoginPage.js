import axios from "axios";
import React, { useContext, useState } from "react";
import { Link ,Navigate} from "react-router-dom";
import { UserContext } from "../UserContext.js";
import { CartContext } from "../CartContext.js";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect ] = useState(false);
  
  const { setUser, user} = useContext(UserContext);
  const {setCart,refreshCart, sessionId} = useContext(CartContext);


 
  async function handelLogin(e){
    e.preventDefault();
        
     
    try{
     const {data} = await axios.post('/api/users/login', {email, password,sessionId:sessionId}, {
  withCredentials: true

});
      alert("Successful login");
      setUser(data);
      console.log('Data', data)
      await refreshCart(data._id); // Refresh cart with  userId only coz sessionId should be merged

      setRedirect(true);

    }catch(e){
          console.error('Login failed:', e);

      alert('login failed');
    }
  }

  if(redirect){
    return <Navigate to={'/allProducts'}/>
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login </h1>
        <form className="max-w-md mx-auto " onSubmit={handelLogin}>
          <input
            type="email"
            placeholder="your_email@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="*****"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button className="primary  hover:bg-cyan-800 mt-5">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have Account Yet?
            <Link className="underline text-black" to="/register">
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
