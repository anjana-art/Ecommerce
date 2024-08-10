import React from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register </h1>
        <form className="max-w-md mx-auto ">
          <input type="text" placeholder="firstname"></input>
          <input type="text" placeholder="lastname"></input>
          <input type="email" placeholder="your_email@email.com"></input>
          <input type="password" placeholder="*****"></input>
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Already have an Account?
            <Link className="underline text-black" to="/login">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
