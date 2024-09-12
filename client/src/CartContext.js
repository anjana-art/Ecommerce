import axios from "axios";
const { createContext, useState, useEffect } = require("react");

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  /*  useEffect(()=>{
        if(cartProducts.length > 0){
            console.log('cartProducts', cartProducts)


    }  },[cartProducts] )  */
 


  function addProduct(productId) {

    setCartProducts((prev) => [...prev, productId]);
    console.log('cartProducts', cartProducts)


  }
  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct }}>
      {children}
    </CartContext.Provider>
  );
}
