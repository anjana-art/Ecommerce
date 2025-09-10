import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileNav from "../components/ProfileNav.js";
import axios from "axios";
import { CartContext } from "../CartContext.js";
import { useContext } from "react";
import { ShopContext } from "../ShopContext.js";
import Product from "../components/Product.js";

const AllProducts = () => {
  /*  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products/allProducts").then(({data}) => {
      setProducts(data);
       console.log('data of products in all products page', data); 
    });
  }, []); */
 

 const {addProduct, addProductToCart} = useContext(CartContext);
 const {products} = useContext(ShopContext);

 console.log(products , 'from shopcontext in allproducts.js')

  function addToCart(){
     addProduct(products._id);
     console.log('products.id', products._id);
  }


  return (
    <>
     
      <div className="text-center  grid grid-cols-1 md:grid-cols-5 gap-4 justify-center   items-top ">
         <div className="md:col-span-1 ">
        <div className="flex flex-col items-center gap-5 mt-5">
        <div>
          <ProfileNav />
        </div>

        <div>
          <Link
            className=" inline-flex bg-gradient-to-r to-primary from-blue-800  hover:from-blue-700 hover:to-blue-600 text-white gap-1 px-4 py-2 rounded-full"
            to={"/addNewProduct"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
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
      </div>
      
      {/* <div className="mt-4 ">

        {
          products.length > 0 && products.map(product => (
            <div className="bg-gray-200 rounded-2xl ">
            <Link to={'/allProducts/'+ product._id} className=' flex bg-gray-200 rounded-2xl p-4 m-3 gap-4 cursor-pointer'>
              <div className=" flex w-32 h-32 bg-gray-300  shrink-0 ">  
                {product.photos.length > 0 && (
                  <img  className=" object-cover h-32 w-32" src={'http://localhost:5555/uploads/'+product.photos[0]} alt='iphone/smartphone/laptop/other'/>
                )}
              </div>
          <div className="grow-0 shrink">
          <h2 className="text-2xl ">
             {product.title}
              </h2> 
              <p className="text-sm mt-2 ">{product.description}</p>
              <p className="text-xl">{product.price} Eur</p>

              
          </div> 
            </Link>
            <button  className="bg-red-500 bg-opacity-90 rounded-2xl cursor-pointer text-white p-2 mb-2 ml-5"  onClick={addProductToCart}>
            Add to Cart 
           </button>
           </div>
          ))
        } 

      </div>
      */}
       <div className="md:col-span-4"> <Product/> </div>
      </div>
    </>
  );
};

export default AllProducts;
