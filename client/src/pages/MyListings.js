import React, {useState, useEffect} from 'react';
import ProfileNav from '../components/ProfileNav.js';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyListings = () => {
    const [myProducts, setMyProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMyListings = async () => {
            try {
                setLoading(true);
                console.log('Fetching products from /api/products/myListings');
                
                const response = await axios.get('/api/products/myListings');
                console.log('Response received:', response);
                console.log('Response data:', response.data);
                
                setMyProducts(response.data);
            } catch (err) {
                console.error('Error fetching listings:', err);
                setError(err.message || 'Failed to fetch listings');
            } finally {
                setLoading(false);
            }
        };

        fetchMyListings();
    }, []);

    if (loading) {
        return (
            <div className='bg-slate-800 w-full min-h-screen pt-5'>
                <ProfileNav />
                <div className="flex justify-center items-center h-64">
                    <div className="text-white text-xl">Loading your listings...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='bg-slate-800 w-full min-h-screen pt-5'>
                <ProfileNav />
                <div className="flex justify-center items-center h-64">
                    <div className="text-red-400 text-xl">Error: {error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className='bg-slate-800 w-full min-h-screen pt-5 grid grid-cols-1 md:grid-cols-4 gap-4 '>
           <div className='md:col-span-1'>  <ProfileNav /></div>
           <div>
            <h1 className='text-white text-2xl text-center mb-5'>My Listings</h1>
            
            {myProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-10">
                    <div className="text-white text-xl mb-4">You haven't listed any products yet.</div>
                    <Link 
                        to="/addNewProduct" 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full inline-flex items-center"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={1.5} 
                            stroke="currentColor" 
                            className="w-5 h-5 mr-2"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M12 4.5v15m7.5-7.5h-15" 
                            />
                        </svg>
                        Add Your First Product
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1  md:col-span-3 gap-6 px-4 pb-10">
                    {myProducts.map(product => (
                        <div key={product._id} className='bg-gray-200 rounded-2xl p-4 flex flex-col'>
                            <div className="flex mb-4">
                                <div className="w-32 h-32 bg-gray-300 flex-shrink-0 rounded-lg overflow-hidden">
                                    {product.photos.length > 0 ? (
                                        <img 
                                            className="object-cover h-full w-full" 
                                            src={'http://localhost:5555/uploads/' + product.photos[0]} 
                                            alt={product.title}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                                            No Image
                                        </div>
                                    )}
                                </div>
                                <div className="ml-4 flex-grow">
                                    <h2 className="text-xl font-semibold">{product.title}</h2>
                                    <p className="text-sm mt-2 line-clamp-2">{product.description}</p>
                                    <p className="text-md font-bold mt-2">Price: ${product.price}</p>
                                </div>
                            </div>
                            <div className='flex justify-end space-x-2 mt-auto'>
                                <Link 
                                    to={'/myListings/' + product._id}
                                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full text-sm"
                                >
                                    Edit
                                </Link>
                                <button 
                                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-full text-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            </div>
        </div>
    );
}

export default MyListings;