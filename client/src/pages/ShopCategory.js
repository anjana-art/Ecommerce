import React, { useContext } from "react";
import { ShopContext } from "../ShopContext";
import { CartContext } from "../CartContext";
import { useParams ,Link} from "react-router-dom";

const ShopCategory = () => {
  const { catagory } = useParams();
  console.log(catagory);

  const { products } = useContext(ShopContext);
  const {addProduct} = useContext(CartContext);


  function addToCart(){
    addProduct(products._id);
    console.log('products.id', products._id);
 }

  return (
    <>
  
  

        <div className="mt-4" >
               <div className="text-2xl">      
          {catagory} 
               </div>
          {
            products.map(product => (
            
              <>
               {product.catagory === catagory && (   

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
                  <button  className="bg-red-500 bg-opacity-90 rounded-2xl cursor-pointer text-white p-2 mb-2 ml-5"  onClick={addToCart}>
                  Add to Cart 
                 </button>
                 </div>

                 )
                }
                </>
                 )) } 

        </div>
    
    

    </>

  );
};

export default ShopCategory;
