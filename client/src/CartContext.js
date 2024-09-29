import axios from "axios";
import { UserContext } from "./UserContext";

const { createContext, useState, useContext,useEffect } = require("react");

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState("");
  const [cart, setCart] = useState([]);
  const { ready, user, setUser } = useContext(UserContext);



  /*  useEffect(()=>{
     


    }  },[] )  */

  function addProduct(productId) {
    setCartProducts((prev) => [...prev, productId]);
    console.log("cartProducts", cartProducts);
  }

  const addProductToCart = async (productId) => {
    const userId = user._id;
    console.log('userId', userId);
    
    // get the user's id dynamically
    try {
      const response = await axios.post('/api/cart/addToCart', { userId, productId });
      console.log('response',response)
      const data = response.config.data;
     // const data = response.config.data;
      console.log('response', data );
      setCart((prev)=>[...prev, data]);
       console.log('response cart', cart)
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct, addProductToCart, cart }}>
      {children}
    </CartContext.Provider>
  );
}
