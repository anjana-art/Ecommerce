import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import { UserContext } from '../UserContext.js';
import { CartContext } from '../CartContext.js';

/*!! meaning Boolean */

const Header = () => {
  const {user} = useContext(UserContext);
  const {cartProducts, getcartProduct,cart, cartReady} = useContext(CartContext);
  
    const cartItemsCount = cartReady ? (cart?.items?.length || 0) : '..';

  
  return (
    
    <header className="flex  justify-between bg-cyan-700 h-15 ">
      <Link to='/' className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-12 text-primary"

        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
          />
        </svg>
        <span className="font-bold text-3xl text-green-300 ">E-Mart</span>
      </Link>

      <div className="flex gap-2 text-white text-xl border border-gray-300 rounded-full py-4 px-4 my-2  shadow-md shadow-gray-300 ">
        <Link to={"/products/iphone"}>Iphones</Link>
        <div className=" border-l border-gray-300"></div>
        <Link to={"/products/android"}>Androids</Link>
        <div className=" border-l border-gray-300"></div>
        <Link to={"/products/laptop"}>Laptops</Link>
        <div className=" border-l border-gray-300"></div>
        <Link to={"/products/other"}>Others</Link>
        <div className=" border-l border-gray-300"> </div>
        <div className='flex gap-2'> filter <svg
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
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg></div>
        <button className="bg-primary text-white p-2 rounded-full p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>

      <div className='inline-flex text-white gap-2 items-center'>
        <Link to={'/products/cart'} className='inline-flex'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>{cartItemsCount}
</Link>
     

      <Link to={ user==='Not found cookie'?'/login':'/profile'} className="flex  items-center gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>

<div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden " ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 relative top-1">
<path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
</svg>

</div>
{!!user && user !== 'Not found cookie' && (
  <div>
    {user.firstName } {user.lastName}
  </div>
)}

      </Link>
      </div>
    </header>
  
      
    
  )
}

export default Header
