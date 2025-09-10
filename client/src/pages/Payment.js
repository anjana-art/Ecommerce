import { useState, useContext, useEffect } from 'react';
import { CartContext } from "../CartContext.js";
import { Link , useNavigate} from 'react-router-dom';

const Payment = ({ onSuccess }) => {
  const [cardHolderName, setCardHolderName] = useState('');  
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const { cart, subtotal } = useContext(CartContext);
   const navigate = useNavigate(); 

   
  // Validate card number using Luhn algorithm
  const validateCardNumber = (number) => {
    // Remove all non-digit characters
    const cleanNumber = number.replace(/\D/g, '');
    
    // Check if it's empty or not all digits
    if (cleanNumber === '') return 'Card number is required';
    if (!/^\d+$/.test(cleanNumber)) return 'Card number must contain only digits';
    if (cleanNumber.length < 13 || cleanNumber.length > 19) return 'Card number must be between 13 and 19 digits';
    
    // Luhn algorithm validation
   let sum = 0; /* 
    let isEven = false;
    
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber.charAt(i), 10);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    } 
    */
    return (sum === 0) ? '' : 'Invalid card number';  
  };

  // Validate expiry date format and if it's in the future
  const validateExpiry = (expiryDate) => {
    if (!expiryDate) return 'Expiry date is required';
    
    // Check format (MM/YY or MM/YYYY)
    if (!/^\d{2}\/\d{2,4}$/.test(expiryDate)) return 'Use format MM/YY or MM/YYYY';
    
    const [month, year] = expiryDate.split('/');
    const monthNum = parseInt(month, 10);
    let yearNum = parseInt(year, 10);
    
    // Convert 2-digit year to 4-digit
    if (year.length === 2) {
      yearNum += 2000;
    }
    
    // Validate month
    if (monthNum < 1 || monthNum > 12) return 'Invalid month';
    
    // Check if card is expired
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed
    
    if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
      return 'Card has expired';
    }
    
    return '';
  };

  // Validate CVC code
  const validateCVC = (cvc) => {
    if (!cvc) return 'CVC is required';
    if (!/^\d+$/.test(cvc)) return 'CVC must contain only digits';
    if (cvc.length < 3 || cvc.length > 4) return 'CVC must be 3 or 4 digits';
    return '';
  };

  // Validate card holder name
  const validateCardHolder = (name) => {
    if (!name) return 'Card holder name is required';
    if (name.length < 2) return 'Name is too short';
    if (!/^[a-zA-Z\s]+$/.test(name)) return 'Name can only contain letters and spaces';
    return '';
  };

  // Format card number with spaces
  const formatCardNumber = (value) => {
    // Remove all non-digits
    const v = value.replace(/\D/g, '');
    
    // Add space after every 4 digits
    const parts = [];
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substring(i, i + 4));
    }
    
    return parts.join(' ');
  };

  // Format expiry date
  const formatExpiry = (value) => {
    const v = value.replace(/\D/g, '');
    
    if (v.length <= 2) {
      return v;
    }
    
    return `${v.substring(0, 2)}/${v.substring(2, 6)}`;
  };

  // Handle card number input
  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
    
    // Validate and set error
    const error = validateCardNumber(formattedValue);
    setFormErrors(prev => ({ ...prev, cardNumber: error }));
  };

  // Handle expiry input
  const handleExpiryChange = (e) => {
    const formattedValue = formatExpiry(e.target.value);
    setExpiry(formattedValue);
    
    // Validate and set error
    const error = validateExpiry(formattedValue);
    setFormErrors(prev => ({ ...prev, expiry: error }));
  };

  // Handle CVC input
  const handleCvcChange = (e) => {
    // Only allow digits and limit to 4 characters
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCvc(value);
    
    // Validate and set error
    const error = validateCVC(value);
    setFormErrors(prev => ({ ...prev, cvc: error }));
  };

  // Handle card holder name input
  const handleCardHolderChange = (e) => {
    const value = e.target.value;
    // Only allow letters and spaces
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setCardHolderName(value);
      
      // Validate and set error
      const error = validateCardHolder(value);
      setFormErrors(prev => ({ ...prev, cardHolderName: error }));
    }
  };

  // Check if form is valid
  const isFormValid = () => {
    return (
      !formErrors.cardHolderName &&
      !formErrors.cardNumber &&
      !formErrors.expiry &&
      !formErrors.cvc &&
      cardHolderName &&
      cardNumber.replace(/\s/g, '').length >= 13 &&
      expiry &&
      cvc.length >= 3
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      // Validate all fields before submission
    const errors = {
      cardHolderName: validateCardHolder(cardHolderName),
      cardNumber: validateCardNumber(cardNumber),
      expiry: validateExpiry(expiry),
      cvc: validateCVC(cvc)
    };
    
    setFormErrors(errors);
    
    // Check if there are any errors
    if (Object.values(errors).some(error => error !== '')) {
      return;
    }
    setIsProcessing(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Randomly decide if payment succeeds (80% chance)
      const isSuccess = Math.random() < 0.8;
        if (isSuccess) {
        const paymentData = {
          transactionId: `mock_${Date.now()}`,
          amount: subtotal,
          timestamp: new Date().toISOString()
        };
     
         // Call the onSuccess callback with payment data
        if (onSuccess && typeof onSuccess === 'function') {
          await onSuccess(paymentData);
        }
        setShowSuccess(true);
        navigate('/paymentSuccess')
      } else {
        throw new Error('Payment failed: Insufficient funds');
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGoHome = () => {
    // Redirect to home page
    window.location.href = '/';
  };

  return (
    <div className="text-black p-5 grid md:grid-cols-2">
      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-100 rounded-xl max-w-md w-full p-8 transform transition-all duration-300 scale-100 opacity-100">
            {/* Success icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>

            {/* Success message */}
            <h2 className="text-2xl font-bold text-center text-white mb-4">Payment Successful!</h2>
            <p className="text-gray-300 text-center mb-8">
              Thank you for your purchase. Your payment has been processed successfully.
            </p>

            {/* Action button */}
            <div className="flex justify-center">
              <Link 
                onClick={handleGoHome}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      )}
      
      <div className='max-h-4'>         
        <h1 className='text-2xl'>Payment Method</h1>
        <p className='text-gray-400'>Debit/Credit Card</p>
      </div>
      
      <div>
        <div className="bg-gray-200 p-5 rounded-lg max-w-md mx-auto">
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
            <span>Total Amount To Pay:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div>
        <form onSubmit={handleSubmit}>
          <div className='bg-yellow-100  border rounded-lg p-5 rounded'>
            <div className="mb-4">
              <label className="block mb-2">Card Holder's Name</label>
              <input 
                type="text" 
                value={cardHolderName}
                onChange={handleCardHolderChange}
                placeholder="Full Name"
                className="w-full p-3 rounded bg-gray-100 "
                required
              />
              {formErrors.cardHolderName && (
                <p className="text-red-400 text-sm mt-1">{formErrors.cardHolderName}</p>
              )}
            </div>      
            
            <div className="mb-4">
              <label className="block mb-2">Card Number</label>
              <input 
                type="text" 
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="4242 4242 4242 4242"
                className="w-full p-3 rounded bg-gray-100 "
                required
              />
               {formErrors.cardNumber && (
                <p className="text-red-400 text-sm mt-1">{formErrors.cardNumber}</p>
              )}
            </div>
            
            <div className='grid md:grid-cols-2 gap-5 mb-4'>
              <div>
                <label className="block mb-2">Expiry Date</label>
                <input 
                  type="text" 
                  value={expiry}
                  onChange={handleExpiryChange}
                  placeholder="MM/YY"
                  className="w-full p-3 rounded bg-gray-100"
                  required
                />
                 {formErrors.expiry && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.expiry}</p>
                )}
              </div>
              
              <div>
                <label className="block mb-2">CVC</label>
                <input 
                  type="text" 
                  value={cvc}
                  onChange={handleCvcChange}
                  placeholder="123"
                  className="w-full p-3 rounded bg-gray-100 "
                  required
                />
                {formErrors.cvc && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.cvc}</p>
                )}
              </div>
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={isProcessing || !isFormValid()} 
            className="btn mt-4 block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded text-center disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : 'Pay Now'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;