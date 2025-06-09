import React from 'react';
// import { FaWhatsapp } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderHistory: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  




  const formData = location.state?.formData; // Access the form data from location state
  const { fullName, orderId  , address , amountSent , bankName , paymentMethod , senderName , color , size } = location.state || {};

  const message = encodeURIComponent(
    `Hello! I would like to inquire about my Transaction. \n\n Order ID: ${orderId}\nName: ${fullName} \n Delivery Address: ${address} \n\n Payment Method ${paymentMethod} \n\n Shoe size ${size} \n\n Color ${color} \n\n  Amount: ${amountSent} \n Senders Name: ${senderName} \n Bank Name: ${bankName}  \n `
  );

  // WhatsApp number (replace with your own phone number)
  const whatsappNumber = '+2349132214390'; // Change this to your WhatsApp number

  // WhatsApp link with pre-filled message
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;


  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-md">
      {/* Header */}
      <h2 className="text-2xl font-bold text-center mb-6" style={{ color: '#1a2d42' }}>Order Confirmation</h2>

      {/* Greeting */}
      <div className="mb-6 text-center">
        <p className="text-xl font-medium text-gray-700">
          Hello, <span className="font-semibold text-red-300">{fullName}</span>!
        </p>
        <p className="text-lg text-gray-600 mt-2">Thank you for your order!</p>
        <p>Delivery address: {address}</p>
        <br />
        <p className=' max-w-[300px]  m-auto '>Our team will review your Transaction and get back with you shortly </p>
      </div>

      <div className="mt-6 flex justify-center">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg flex items-center hover:bg-green-600"
        >

        </a>
      </div>

      <button
        onClick={() => window.history.back()}
        className="px-4 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 mt-4"
      >
        Go Back
      </button> 

      {/* Order Details */}
      <div className="mb-6 mt-12">
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-700 text-center">Your Order ID is:</p>
          <p className="text-xl font-bold text-indigo-600  text-center">{orderId}</p>
        </div>
        
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">Order Date:</p>
          <p className="text-sm text-gray-600">{new Date().toLocaleDateString()}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">Payment Method:</p>
          <p className="text-sm text-gray-600">
            {formData?.paymentMethod === 'bitcoin' ? 'Bitcoin' : 'Bank Transfer'}
          </p>
        </div>
      </div>

      {/* Summary Button */}
      <div className="text-center">
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Back to Homepage
        </button>
      </div>

   
    </div>
  );
};

export default OrderHistory;
