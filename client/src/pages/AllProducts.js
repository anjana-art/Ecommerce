import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileNav from "../components/ProfileNav";
import axios from "axios";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/products/allProducts").then(({data}) => {
      setProducts(data);
      console.log('data of products in all products page', data);
    });
  }, []);

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
            <Link to={'/api/products/allProducts/'+ product._id} className=' flex bg-gray-200 p-4 m-3 rounded-2xl gap-4 cursor-pointer'>
              <div className="w-32 h-32 bg-gray-300 grow shrink-0 ">
                {product.photos.length > 0 && (
                  <img src={product.photos[0]} alt='iphone/smartphone/laptop/other'/>
                )}
              </div>
          <div className="grow-0 shrink">
          <h2 className="text-xl ">
             {product.title}
              </h2> 
              <p className="text-sm mt-2 ">{product.description}</p>
          </div>
            </Link>
          ))
        }
      </div>
    </>
  );
};

export default AllProducts;
