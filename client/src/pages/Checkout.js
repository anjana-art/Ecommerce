 import { useState,useContext } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { CartContext } from "../CartContext.js";
import { UserContext } from '../UserContext.js';
import Payment from './Payment.js';


const Checkout = () => {
   const [address, setAddress] = useState({
    street: '',
    city: '',
    district: '',
    postalCode: '',
    country: '',
    contact: ''
  });
  const [showPayment, setShowPayment]= useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { cart, subtotal,createOrder } = useContext(CartContext);
  const {user} = useContext(UserContext);   
  const navigate = useNavigate(); 
  

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    setShowPayment(true);
  };

  const handlePaymentSuccess = async(paymentData) => {
    try {
      // Create order in database
      const orderResult = await createOrder(address, paymentData);
      
      console.log('Order created successfully:', orderResult);
      
      // Navigate to success page with order ID
      navigate('/paymentSuccess', { 
        state: { 
          orderId: orderResult.orderId,
          transactionId: paymentData.transactionId 
        } 
      });
    } catch (error) {
      console.error('Failed to create order:', error);
      alert('Payment was successful but there was an error saving your order. Please contact support.');
    }
   
  };


   if (showPayment) {
    return <Payment onSuccess={handlePaymentSuccess} />;
  }

  return (
    <div className="text-black p-5 ">
         <h1 className="text-3xl">Order Details</h1>

      <div className='grid md:grid-cols-7 gap-5'>

          <div className=" md:col-span-2 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-gray-100 p-5 rounded-lg mb-6">
              <h3 className="text-xl mb-4">Your Items</h3>
              {cart.items.map(item => (
                <div key={item.id} className="flex justify-between py-3 border-b border-gray-700">
                  <div>
                    <h4 className="font-medium">{item.product.title}</h4>
                    <p className="text-gray-400">Qty: {item.quantity}</p>
                     <div className="flex w-28 h-28 bg-gray-300 shrink-0">
                        {item.product.photos.length > 0 && (
                          <img
                            className="object-cover h-28 w-28"
                            src={"http://localhost:5555/uploads/" + item.product.photos[0]}
                            alt="iphone/smartphone/laptop/other"
                          />
                        )}
                      </div>
                      <p className="text-gray-400">price:{item.price}</p>
                  </div>
                  <div>${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
            </div>
         </div>

        
      
      <div className="  md:col-span-1 bg-gray-100 p-5 rounded-lg max-w-md mx-auto h-80">

        <h3 className="text-xl mb-4">Order Summary</h3>
        
        <div className="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between mb-4">
          <span>Shipping:</span>
          <span>Free</span>
        </div>
        
        <div className="border-t pt-4 flex justify-between text-xl font-bold">
          <span>Total:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        
     
      
      </div>

      
      <div className=' md:col-span-4'>
        <h1 className='mb-5 text-xl'>Contact Information</h1>
         <form onSubmit={handleAddressSubmit}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-2">First Name:</label>
                    <input 
                     type='text'
                     value={user.firstName}
                     className="w-full p-2 rounded"
                    />
                  </div>
                   <div>
                    <label className="block mb-2">Last Name:</label>
                    <input 
                     type='text'
                     value={user.lastName}
                     className="w-full p-2 rounded"
                    />
                  </div>
                   <div>
                    <label className="block mb-2">Email Address:</label>
                    <input 
                     type='text'
                     value={user.email}
                     className="w-full p-2 rounded "
                    />
                  </div>
                   <div>
                    <label className="block mb-2">Phone No.</label>
                    <input 
                     type='text'
                     value={address.contact}
                     onChange={(e) => setAddress({...address, contact: e.target.value})}
                     className="w-full p-2 rounded "
                     required
                    />
                  </div>
                 </div>
                 <div>
                 <h1 className='mb-5 text-xl'>Shipping Address</h1>

                  <div>

                    <label className="block mb-2">Street Address</label>
                    <input
                      type="text"
                      value={address.street}
                      onChange={(e) => setAddress({...address, street: e.target.value})}
                      className="w-full p-2 rounded "
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">City</label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) => setAddress({...address, city: e.target.value})}
                      className="w-full p-2 rounded "
                      required
                    />
                  </div>
               
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block mb-2">District</label>
                    <input
                      type="text"
                      value={address.district}
                      onChange={(e) => setAddress({...address, district: e.target.value})}
                      className="w-full p-2 rounded "
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Postal Code</label>
                    <input
                      type="text"
                      value={address.postalCode}
                      onChange={(e) => setAddress({...address, postalCode: e.target.value})}
                      className="w-full p-2 rounded "
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Country</label>
                    <input
                      type="text"
                      value={address.country}
                      onChange={(e) => setAddress({...address, country: e.target.value})}
                      className="w-full p-2 rounded "
                      required
                    />
                  </div>
                  </div>
                </div>
                <button  
               className="btn mt-4 block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded text-center">
                      Proceed to Payment
       </button>
              </form>
        
      </div>
      
    </div>

    </div>
   
  );
};

export default Checkout;