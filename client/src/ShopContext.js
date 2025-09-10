import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ShopContext = createContext('');




export const ShopContextProvider = ({children})=>{
    const [products, setProducts] = useState([]);
    const [ready, setReady] = useState('');
    const [productCatagory, setProductCatagory] = useState([]);


    useEffect(() => {
        
          axios.get("/api/products/allProducts").then(({data}) => {
            setProducts(data);
            setReady('ready');
            console.log(' All Products from shopContext', data)
          });
        
      }, []);
     
       useEffect(() => {
        
          axios.get("/api/products/catagory").then(({data}) => {
            setProductCatagory(data);
            setReady('ready');
            console.log('Products By Catagory', data)
          });
        
      }, []);



      return (
        <ShopContext.Provider value ={{products, setProducts, productCatagory,ready}}>
            {children}
        </ShopContext.Provider>
      )


}