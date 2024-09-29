import React, { useContext, useState } from "react";
import ProfileNav from "../components/ProfileNav";
import { CartContext } from "../CartContext";
import { UserContext } from "../UserContext";

const CartPage = () => {
  const { cartProducts, addProduct , cart} = useContext(CartContext);
  const { ready, user, setUser } = useContext(UserContext);

  return (
    <div>
      <h1 className="text-2xl text-center mt-1">My Cart</h1>

      <div className="mt-5">
        <ProfileNav />
      </div>
      <div>
      <ul>
        {cart.length > 0 && cart.map(item => (
          <li key={item.productId}>{item} - {item.quantity}</li>
        ))}
      </ul>


      </div>
    </div>
  );
};

export default CartPage;
