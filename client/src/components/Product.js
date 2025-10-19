import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext.js";
import { CartContext } from "../CartContext.js";

const Product = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios.get("/api/products/allProducts").then(({ data }) => {
      setProducts(data);
      console.log("data of products in landing page", data);
    });
  }, []);

  const { addToCart } = useContext(CartContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">All Products</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.length > 0 &&
            products.map((product) => (
              <div 
                key={product._id} 
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 product-card"
              >
                <Link
                  to={"/allProducts/" + product._id}
                  className="block p-4 cursor-pointer"
                >
                  <div className="flex justify-center mb-4 h-52 bg-gray-100 rounded-lg overflow-hidden">
                    {product.photos.length > 0 ? (
                      <img
                        className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                        src={"https://ecommerce-api-hpil.onrender.com/uploads/" + product.photos[0]}
                        alt={product.title}
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-gray-400">
                        <i className="fas fa-image text-4xl"></i>
                      </div>
                    )}
                  </div>

                  <div className="p-2">
                    <h2 className="text-lg font-semibold text-slate-800 mb-2 line-clamp-1">{product.title}</h2>
                    <p className="text-sm text-slate-600 mb-3 line-clamp-2 h-10">{product.description}</p>
                    <p className="text-xl font-bold text-primary">£{product.price}</p>
                  </div>
                </Link>

                <div className="px-4 pb-4">
                  <button
                    className="w-full bg-gradient-to-r from-red-500 to-blue-400 hover:from-blue-600 hover:to-primary text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 shadow hover:shadow-md"
                    onClick={() => addToCart(product._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
        </div>
        
        {products.length === 0 && (
          <div className="text-center py-12">
            <div className="text-5xl text-gray-300 mb-4">
              <i className="fas fa-box-open"></i>
            </div>
            <p className="text-gray-500 text-lg">No products available at the moment</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;