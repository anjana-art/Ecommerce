import React, {useState, useEffect}from 'react';
import ProfileNav from '../components/ProfileNav';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyListings = () => {
    const [myProducts, setMyProducts] = useState([]);
    useEffect(()=>{
     axios.get('/api/products/myListings').then(({data})=>{
           setMyProducts(data);
           console.log('my listing data:', data)
     })
    },[])
  return (
    <div>
        <ProfileNav/>
      <h1>My Listings</h1>
      <div>
      <div className="mt-4 ">

{
  myProducts.length > 0 && myProducts.map(product => (
    <div className=' flex bg-gray-200 p-4 m-3 rounded-2xl gap-4'>
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
      <p className="text-md">Price: {product.price}</p>
  </div>
 <div className=''>
 <Link  className="bg-primary bg-opacity-90 rounded-2xl cursor-pointer text-white p-2" to={'/api/products/myListings/'+ product._id}>Update</Link>
 <Link  className="bg-primary bg-opacity-90  rounded-2xl cursor-pointer text-white p-2" >Delete</Link>
 </div>
    </div>
  ))
}
</div>
      </div>
    </div>
  )
}

export default MyListings
