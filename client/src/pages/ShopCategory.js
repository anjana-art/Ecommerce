import React, { useContext } from "react";
import { ShopContext } from "../ShopContext.js";
import { CartContext } from "../CartContext.js";
import { useParams ,Link} from "react-router-dom";

const ShopCategory = () => {
  const { catagory } = useParams();
  console.log(catagory);

  const { products, productCatagory } = useContext(ShopContext);
  const {addProduct} = useContext(CartContext);


  function addToCart(){
    addProduct(products._id);
    console.log('products.id', products._id);
 }

 // Filter products by category
  const categoryProducts = productCatagory.filter(
    (product) => product.catagory === catagory
  );

   return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 capitalize">
        {catagory}
      </h1>

      {categoryProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No products found in this category.</p>
          <Link 
            to="/" 
            className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categoryProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <Link
                to={"/allProducts/" + product._id}
                className="block p-4 cursor-pointer"
              >
                <div className="flex justify-center mb-4 h-58 bg-gray-100 rounded-lg overflow-hidden">
                  {product.photos.length > 0 ? (
                    <img
                      className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                      src={"http://localhost:5555/uploads/" + product.photos[0]}
                      alt={product.title}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-400">
                      <i className="fas fa-image text-4xl"></i>
                    </div>
                  )}
                </div>

                <div className="p-2">
                  <h2 className="text-lg font-semibold text-slate-800 mb-2 line-clamp-1">
                    {product.title}
                  </h2>
                  <p className="text-sm text-slate-600 mb-3 line-clamp-2 h-10">
                    {product.description}
                  </p>
                  <p className="text-xl font-bold text-blue-600">£{product.price}</p>
                </div>
              </Link>

              <div className="px-4 pb-4">
               <button
                className="w-full bg-gradient-to-r from-red-500 to-blue-400 hover:from-red-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-150 shadow-md active:transform active:scale-95 active:shadow-inner active:from-red-700 active:to-blue-800"
                onClick={() => addToCart(product._id)}
              >
                Add to Cart
              </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );


};

export default ShopCategory;
