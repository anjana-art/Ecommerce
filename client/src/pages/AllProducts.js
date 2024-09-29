import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileNav from "../components/ProfileNav";
import axios from "axios";
import { CartContext } from "../CartContext";
import { useContext } from "react";
import { ShopContext } from "../ShopContext";

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

  function addToCart(){
     addProduct(products._id);
     console.log('products.id', products._id);
  }


  return (
    <>
      <div>
        <h1 className="p-5 text-2xl text-center"> All Products</h1>
      </div>
      <div className="text-center  inline-flex justify-center  items-center gap-4">
        <div>
          <ProfileNav />
        </div>

        <div>
          <Link
            className=" inline-flex bg-primary text-white gap-1 px-4 py-2 rounded-full"
            to={"/api/products/addNewProduct"}
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
      <div className="mt-4 ">

        {
          products.length > 0 && products.map(product => (
            <div className="bg-gray-200 rounded-2xl ">
            <Link to={'/api/products/allProducts/'+ product._id} className=' flex bg-gray-200 rounded-2xl p-4 m-3 gap-4 cursor-pointer'>
              <div className=" flex w-32 h-32 bg-gray-300  shrink-0 ">  {/*i have removed grow from this classname to resize image*/}
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
    </>
  );
};

export default AllProducts;
