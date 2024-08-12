import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

async function registerUser(e){
 e.preventDefault();
 try{
  await axios.post('/api/users/register', {
    firstName,
    lastName,
    email,
    password,
   });

   alert('Successful registration');
 }catch(e){
  alert('Failed Registration, Try again. used email.')
 }

}

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register </h1>
        <form className="max-w-md mx-auto " onSubmit={registerUser}>
          <input
            type="text"
            placeholder="firstname"
            value={firstName}
            onChange={(ev) => setFirstName(ev.target.value)}
          ></input>
          <input
            type="text"
            placeholder="lastname"
            value={lastName}
            onChange={(ev) => setLastName(ev.target.value)}
          ></input>
          <input
            type="email"
            placeholder="your_email@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          ></input>
          <input
            type="password"
            placeholder="*****"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          ></input>
          <button className="primary">Register</button>
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
