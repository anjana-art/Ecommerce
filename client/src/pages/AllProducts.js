import React from 'react';
import {Link} from 'react-router-dom';


const AllProducts = () => {
  return (

    <div className='text-center '>
      <h1 className='p-5 size-2xl'> All Products</h1>

      <div>
        <Link  className=' inline-flex bg-primary text-white gap-1 px-4 py-2 rounded-full' to={'/api/users/addNewProduct'}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

         Add new product</Link>
      </div>
    </div>
  )
}

export default AllProducts
