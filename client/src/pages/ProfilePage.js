import React, {useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
    const[redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);

async function logout(){
    await axios.post('/api/users/logout');
    setUser(null);
    setRedirect('/');

} 

  if(ready === ''){
    return 'Loading...';
  } 

  if (ready === 'ready' && !user && !redirect) {
    return <Navigate to={"/api/users/login"} />;
  }

 
if(redirect){
    return <Navigate to={redirect}></Navigate>
}
  return (
    <div>
        <div>
            <nav className="w-full flex justify-center mt-8  gap-4 ">
                <Link className="py-2 px-6 bg-primary text-white rounded-full" to={'/api/users/allProducts'}>All Products</Link>
                <Link className="py-2 px-6 bg-primary text-white rounded-full" to={'/api/users/myOrders'}>My Orders</Link>
            </nav>
        </div>
     <div className="flex flex-col justify-center items-center mt-7 p-1">
      <h1 className="text-2xl p-4">Profile Page</h1>
      <div className="text-xl p-2">
        User firstName: {user.firstName} 
      </div>
      <div className="text-xl p-2"> User lastName:{user.lastName}</div>
      <div className="text-xl p-2">User _id: {user._id}</div>
      <div className="text-xl p-2 mb-4">User Email: {user.email}</div>
      <button  onClick={logout} className="primary mt-4 max-w-sm">Logout</button>
    </div>
    </div>
   
  );
};

export default ProfilePage;
