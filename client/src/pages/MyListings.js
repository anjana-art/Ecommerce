import React, {useState, useEffect}from 'react';
import ProfileNav from '../components/ProfileNav';
import axios from 'axios';

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
        {
            myProducts.length > 0 && myProducts.map(myProduct =>(
                <div>
                    {myProduct.title}
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default MyListings
