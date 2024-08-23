import axios from "axios";
import React, { useContext, useState } from "react";
import { Link ,Navigate} from "react-router-dom";
import { UserContext } from "../UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect ] = useState(false);
  
  const { setUser} = useContext(UserContext);

  async function handelLogin(e){
    e.preventDefault();
    try{
     const {data} = await axios.post('/api/users/login', {email, password});
      alert("Successful login");
      setUser(data);
      setRedirect(true);

    }catch(e){
      alert('login failed');
    }
  }

  if(redirect){
    return <Navigate to={'/'}/>
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
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have Account Yet?
            <Link className="underline text-black" to="/api/users/register">
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
