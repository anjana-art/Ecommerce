import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { CartContext } from "../CartContext.js";

const DetailViewPage = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  
  const { addToCart , buyNow} = useContext(CartContext);

  useEffect(() => {
    if (!id) return;
    
    setIsLoading(true);
    axios.get("/api/products/allProducts/" + id).then((response) => {
      const { data } = response;
      setProduct(data);
      if (data.photos && data.photos.length > 0) {
        setMainImage(data.photos[0]);
      }
      setIsLoading(false);
    }).catch(error => {
      console.error("Error fetching product:", error);
      setIsLoading(false);
    });
  }, [id]);

  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product || Object.keys(product).length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl text-gray-300 mb-4">
            <i className="fas fa-exclamation-circle"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Product Not Found</h2>
          <p className="text-gray-500">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
             <li>
              <a href="/" className="text-gray-400 hover:text-gray-500">Home</a>
            </li >
            <li>
              <span className="mx-2 text-gray-300">/</span>
            </li>
            <li>
              <a href="/" className="text-gray-400 hover:text-gray-500">Products</a>
            </li>
            <li>
              <span className="mx-2 text-gray-300">/</span>
            </li>
            <li className="text-gray-500 truncate">{product.title}</li>
          </ol>
        </nav>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div>
              <div className="mb-4 h-80 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                {mainImage ? (
                  <img
                    className="object-contain h-full w-full"
                    src={"/uploads/" + mainImage}
                    alt={product.title}
                  />
                ) : (
                  <div className="text-gray-400 text-5xl">
                    <i className="fas fa-image"></i>
                  </div>
                )}
              </div>
              
              {product.photos && product.photos.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.photos.map((photo, index) => (
                    <div 
                      key={index} 
                      className={`h-20 cursor-pointer border-2 rounded-lg overflow-hidden ${mainImage === photo ? 'border-primary' : 'border-gray-200'}`}
                      onClick={() => setMainImage(photo)}
                    >
                      <img
                        className="object-cover h-full w-full"
                        src={"http://localhost:5555/uploads/" + photo}
                        alt={`${product.title} view ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="py-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
                <span className="text-sm text-gray-500">(42 reviews)</span>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold text-primary">€{product.price}</span>
                {product.originalPrice && (
                  <span className="ml-2 text-lg text-gray-500 line-through">€{product.originalPrice}</span>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <span className="text-gray-700 font-medium mr-2">Category:</span>
                  <span className="text-gray-600">{product.category || "Not specified"}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-700 font-medium mr-2">Listed on:</span>
                  <span className="text-gray-600">
                    {product.created ? new Date(product.created).toLocaleDateString() : "Unknown date"}
                  </span>
                </div>
              </div>

              <div className="flex space-x-4 mb-6">
                <div className="flex items-center">
                  <div className="rounded-full bg-green-100 p-2 mr-2">
                    <i className="fas fa-truck text-green-600"></i>
                  </div>
                  <span className="text-sm text-gray-600">Free shipping</span>
                </div>
                <div className="flex items-center">
                  <div className="rounded-full bg-blue-100 p-2 mr-2">
                    <i className="fas fa-undo text-blue-600"></i>
                  </div>
                  <span className="text-sm text-gray-600">30-day returns</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <button 
                  onClick={() => addToCart(product._id)}
                  className="flex-1 bg-primary hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
                >
                  <i className="fas fa-shopping-cart mr-2"></i>
                  Add to Cart
                </button>
                <Link  onClick={()=> buyNow(product._id)} to={'/products/cart'}  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300">
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Specifications</h3>
              <ul className="space-y-2">
                <li className="flex">
                  <span className="text-gray-600 w-32">Condition</span>
                  <span className="text-gray-800 font-medium">New</span>
                </li>
                <li className="flex">
                  <span className="text-gray-600 w-32">SKU</span>
                  <span className="text-gray-800 font-medium">PRD-{product._id?.slice(-6).toUpperCase()}</span>
                </li>
                <li className="flex">
                  <span className="text-gray-600 w-32">Weight</span>
                  <span className="text-gray-800 font-medium">1.2 kg</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Shipping & Returns</h3>
              <ul className="space-y-2">
                <li className="flex">
                  <i className="fas fa-shipping-fast text-gray-500 mt-1 mr-2"></i>
                  <span className="text-gray-600">Free standard shipping</span>
                </li>
                <li className="flex">
                  <i className="fas fa-clock text-gray-500 mt-1 mr-2"></i>
                  <span className="text-gray-600">Estimated delivery: 2-5 business days</span>
                </li>
                <li className="flex">
                  <i className="fas fa-exchange-alt text-gray-500 mt-1 mr-2"></i>
                  <span className="text-gray-600">30-day easy returns</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailViewPage;