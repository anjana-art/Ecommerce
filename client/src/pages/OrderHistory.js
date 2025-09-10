// OrderHistory.js
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext.js';
import axios from 'axios';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      
      try {
        const response = await axios.get(`/api/orders/my-orders`,{
             headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        });
        console.log('Response Order ', response);
        if (response.data.success) {
          setOrders(response.data.orders);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return <div className="text-white p-5">Loading orders...</div>;
  }

  return (
    <div className="text-white p-5">
      <h1 className="text-2xl text-black font-bold mb-6 text-center">Order History</h1>
      
      {orders.length === 0 ? (
        <div className="bg-gray-800 p-5 rounded-lg text-center">
          <p>You haven't placed any orders yet.</p>
          <Link to="/products" className="text-blue-400 hover:text-blue-300 mt-2 inline-block">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="bg-gray-600 p-5 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Order #{order._id.slice(-8).toUpperCase()}</h3>
                  <p className="text-gray-400">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">${order.totalAmount.toFixed(2)}</p>
                  <span className={`px-2 py-1 rounded text-xs ${
                    order.orderStatus === 'delivered' ? 'bg-green-500' :
                    order.orderStatus === 'shipped' ? 'bg-blue-500' :
                    order.orderStatus === 'processing' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}>
                    {order.orderStatus}
                  </span>
                </div>
              </div>
              
              <div className="border-t border-gray-700 pt-4">
                <h4 className="font-medium mb-2">Items:</h4>
                {order.items.map(item => (
                  <div key={item._id} className="flex justify-between mb-2">
                    <span className='text-white'>{item.product ? item.product.title : "Product no longer available"} x {item.quantity}</span>
                    <div className='h-12 w-18'>
                        {item.product && item.product.photos.length > 0 ? (
                          <img
                            className="object-cover h-12 w-18"
                            src={"http://localhost:5555/uploads/" + item.product.photos[0]}
                            alt={"iphone/smartphone/laptop/other" || "Product Image"}
                          />
                        ):
                                            (
                            <div className="h-12 w-18 bg-gray-500 flex items-center justify-center">
                              No image
                            </div>
                          )
                        }
                    </div>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;