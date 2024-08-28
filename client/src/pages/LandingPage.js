import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const LandingPage = () => {

  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/products/allProducts").then(({data}) => {
      setProducts(data);
      console.log('data of products in all products page', data);
    });
  }, []);

  return (
<div>    welcome 

<div className="mt-4 ">

{
  products.length > 0 && products.map(product => (
    <Link to={'/api/products/allProducts/'+ product._id} className=' flex bg-gray-200 p-4 m-3 rounded-2xl gap-4 cursor-pointer'>
      <div className=" flex w-32 h-32 bg-gray-300  shrink-0 ">  {/*i have removed grow from this classname to resize image*/}
        {product.photos.length > 0 && (
          <img  className=" object-cover h-32 w-32" src={'http://localhost:5555/uploads/'+product.photos[0]} alt='iphone/smartphone/laptop/other'/>
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
</div>  )
}

export default LandingPage
