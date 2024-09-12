import React, {useContext} from 'react';
import ProfileNav from '../components/ProfileNav';
import { CartContext } from '../CartContext';


const CartPage = () => {
  const {cartProducts, addProduct} = useContext(CartContext);


  return (
    <div>
                <h1 className='text-2xl text-center mt-1'>My Cart</h1>

        <div className='mt-5'>   
                 <ProfileNav/>
        </div>
        <div>
          {addProduct} 
        </div>
    </div>
  )
}

export default CartPage;
