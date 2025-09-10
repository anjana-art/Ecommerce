import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext.js";
import { Navigate, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import ProfileNav from "../components/ProfileNav.js";

const ProfilePage = () => {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  async function logout() {
    await axios.post("/api/users/logout");
    setUser({});
    navigate('/');
  }

  if (ready === "") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (ready === "ready" && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect}></Navigate>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar/Navigation Section */}
          <div className="w-full lg:w-1/4 bg-white rounded-xl shadow-md p-6 h-fit">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold mb-4">
                {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
              </div>
              <h2 className="text-xl font-semibold text-gray-800">{user.firstName} {user.lastName}</h2>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
            
            <ProfileNav />
            
            <div className="mt-6">
              <Link
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-4 py-3 rounded-lg transition-all duration-200 w-full text-center"
                to={"/addNewProduct"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Add new product
              </Link>
            </div>
          </div>

          {/* Main Profile Content */}
          <div className="w-full lg:w-3/4 bg-white rounded-xl shadow-md p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">User Profile</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-blue-600 font-medium mb-1">First Name</div>
                <div className="text-lg font-semibold text-gray-800">{user.firstName}</div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-blue-600 font-medium mb-1">Last Name</div>
                <div className="text-lg font-semibold text-gray-800">{user.lastName}</div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-blue-600 font-medium mb-1">User ID</div>
                <div className="text-lg font-semibold text-gray-800 break-all">{user._id}</div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-blue-600 font-medium mb-1">Email Address</div>
                <div className="text-lg font-semibold text-gray-800 break-all">{user.email}</div>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={logout} 
                className="flex-1 bg-gradient-to-r from-red-800 to-primary hover:from-red-700 hover:to-cyan-700 text-white py-3 px-6 rounded-lg transition-all duration-200 font-medium"
              >
                Logout
              </button>
             {/*  
              <Link 
                to="/edit-profile" 
                className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white py-3 px-6 rounded-lg transition-all duration-200 font-medium text-center"
              >
                Edit Profile
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;