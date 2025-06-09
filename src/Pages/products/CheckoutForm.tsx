import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBitcoin, FaRegCreditCard, FaUser, FaEnvelope, FaMapMarkerAlt, FaCity, FaClipboard, FaPiggyBank, FaCheckCircle, FaRuler, FaPaintBrush } from 'react-icons/fa';


type CheckoutFormData = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  paymentMethod: string;
  paymentDetails: string;
  senderName: string;
  amountSent: string;
  bankName: string;
  color: string;
  size: string;
};

const CheckoutForm: React.FC = () => {
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: '',
    paymentDetails: '',
    senderName: '',
    amountSent: '',
    bankName: '',
    color: '',
    size: '',
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 

  // Function to handle changes in input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Set the appropriate payment details based on the selected payment method
  const setPaymentDetails = (paymentMethod: string) => {
    if (paymentMethod === 'bitcoin') {
      setFormData((prevState) => ({
        ...prevState,
        paymentDetails: 'Not available yet', // Example Bitcoin address
      }));
    } else if (paymentMethod === 'bankTransfer') {
      setFormData((prevState) => ({
        ...prevState,
        paymentDetails: `Opay, BUKOLA`, // Example Bank details
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        paymentDetails: '',
      }));
    }
  };

  // When the payment method changes, set the payment details accordingly
  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData({ ...formData, paymentMethod: value });
    setPaymentDetails(value);
  };

  // Function to handle copying the payment details to clipboard
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(formData.paymentDetails);
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate unique order ID
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  

    

    // Store order in local storage (simulating order history)
    const order = { orderId, formData };
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    orderHistory.push(order);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

    // Navigate to order history page
    setLoading(true);

    // After 3 seconds, navigate to order history page
    setTimeout(() => {
      setLoading(false);
      navigate('/cart/history', {
        state: {
          fullName: formData.fullName,
          senderName: formData.senderName,
          amountSent: formData.amountSent,
          bankName: formData.bankName,
          paymentMethod: formData.paymentMethod,
          orderId,
          address: formData.address,
          size: formData.size,
          color: formData.color,
        },
      });
    }, 3000);
  };
  return (
    <>
    

    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md border-b-4 border-gray-300">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Shipping Details</h2>

      {/* Full Name */}
      <div className="mb-6 relative">
        <div className="absolute left-3 top-2 text-gray-500">
          <FaUser />
        </div>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          placeholder="Full Name *"
          className="mt-1 block w-full border-b-2 border-gray-300 focus:border-[#1a2d42] focus:outline-none py-2 pl-10 text-gray-700"
        />
      </div>

      <div className="mb-6 relative">
        <div className="absolute left-3 top-2 text-gray-500">
          <FaRuler />
        </div>
        <input
          type="number"
          id="size"
          name="size"
          value={formData.size}
          onChange={handleChange}
          required
          placeholder="Shoe Size*"
          className="mt-1 block w-full border-b-2 border-gray-300 focus:border-[#1a2d42] focus:outline-none py-2 pl-10 text-gray-700"
        />
      </div>
      <div className="mb-6 relative">
        <div className="absolute left-3 top-2 text-gray-500">
          <FaPaintBrush />
        </div>
        <input
          type="text"
          id="color"
          name="color"
          value={formData.color}
          onChange={handleChange}
          required
          placeholder="Preffered color"
          className="mt-1 block w-full border-b-2 border-gray-300 focus:border-[#1a2d42] focus:outline-none py-2 pl-10 text-gray-700"
        />
      </div>



      {/* Email */}
      <div className="mb-6 relative">
        <div className="absolute left-3 top-2 text-gray-500">
          <FaEnvelope />
        </div>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Email *"
          className="mt-1 block w-full border-b-2 border-gray-300 focus:border-[#1a2d42] focus:outline-none py-2 pl-10 text-gray-700"
        />
      </div>

      {/* Address */}
      <div className="mb-6 relative">
        <div className="absolute left-3 top-2 text-gray-500">
          <FaMapMarkerAlt />
        </div>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          placeholder="Address *"
          className="mt-1 block w-full border-b-2 border-gray-300 focus:border-[#1a2d42] focus:outline-none py-2 pl-10 text-gray-700"
        />
      </div>

      {/* City and State */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="relative">
          <div className="absolute left-3 top-2 text-gray-500">
            <FaCity />
          </div>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            placeholder="City *"
            className="mt-1 block w-full border-b-2 border-gray-300 focus:border-[#1a2d42] focus:outline-none py-2 pl-10 text-gray-700"
          />
        </div>

        <div className="relative">
          <div className="absolute left-3 top-2 text-gray-500">
            <FaMapMarkerAlt />
          </div>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            placeholder="State *"
            className="mt-1 block w-full border-b-2 border-gray-300 focus:border-[#1a2d42] focus:outline-none py-2 pl-10 text-gray-700"
          />
        </div>
      </div>

      {/* ZIP Code */}
      <div className="mb-6 relative">
        <div className="absolute left-3 top-2 text-gray-500">
          <FaRegCreditCard />
        </div>
        <input
          type="text"
          id="zipCode"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          required
          placeholder="ZIP Code *"
          className="mt-1 block w-full border-b-2 border-gray-300 focus:border-[#1a2d42] focus:outline-none py-2 pl-10 text-gray-700"
        />
      </div>

      {/* Payment Method */}
      <div className="mb-6 relative">
        <div className="absolute left-3 top-2 text-gray-500">
          <FaBitcoin />
        </div>
        <select
          id="paymentMethod"
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handlePaymentMethodChange}
          required
          className="mt-1 block w-full border-b-2 border-gray-300 focus:border-[#1a2d42] focus:outline-none py-2 pl-10 text-gray-700"
        >
          <option value="">Select Payment Method</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="bankTransfer">Bank Transfer</option>
        </select>
      </div>

      {/* Payment Details */}
      {formData.paymentMethod && (
        <div className="mb-6 relative">
          <div className="absolute left-3 top-2 text-gray-500">
            <FaRegCreditCard />
          </div>
          <input
            type="text"
            id="paymentDetails"
            name="paymentDetails"
            value={formData.paymentDetails}
            onChange={handleChange}
            required
            readOnly={formData.paymentMethod === 'bitcoin' || formData.paymentMethod === 'bankTransfer'}
            className="mt-1 block w-full border-b-2 border-gray-300 focus:border-[#1a2d42] focus:outline-none py-2 pl-10 text-gray-700 text-sm p-3"
          />
          {formData.paymentMethod === 'bitcoin' && (
            <button
              type="button"
              onClick={handleCopyToClipboard}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-[#1a2d42]"
            >
              <FaClipboard />
            </button>
          )}
        </div>
      )}

      {/* Sender's Details */}
      <div className="mb-6 relative">
        <div className="absolute left-3 top-2 text-gray-500">
          <FaUser />
        </div>
        <input
          type="text"
          id="senderName"
          name="senderName"
          value={formData.senderName}
          onChange={handleChange}
          required
          placeholder="Sender's Name *"
          className="mt-1 block w-full border-b-2 border-gray-300 focus:border-[#1a2d42] focus:outline-none py-2 pl-10 text-gray-700"
        />
      </div>

      {/* Amount Sent */}
      <div className="mb-6 relative">
        <div className="absolute left-3 top-2 text-gray-500">
          <FaRegCreditCard />
        </div>
        <input
          type="number"
          id="amountSent"
          name="amountSent"
          value={formData.amountSent}
          onChange={handleChange}
          required
          placeholder="Amount Sent *"
          className="mt-1 block w-full border-b-2 border-gray-300 focus:border-[#1a2d42] focus:outline-none py-2 pl-10 text-gray-700"
        />
      </div>

      {/* Bank Name */}
      <div className="mb-6 relative">
        <div className="absolute left-3 top-2 text-gray-500">
          <FaPiggyBank />
        </div>
        <input
          type="text"
          id="bankName"
          name="bankName"
          value={formData.bankName}
          onChange={handleChange}
          required
          placeholder="Bank Name *"
          className="mt-1 block w-full border-b-2 border-gray-300 focus:border-[#1a2d42] focus:outline-none py-2 pl-10 text-gray-700"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
       
        className="w-full py-3 bg-[#1a2d42] text-white font-medium rounded-md hover:bg-white  hover:border-black hover:border-2 hover:text-[#1a2d42] focus:outline-none focus:ring-2 focus:ring-[#1a2d42]"
      >
        Place Order
      </button>

    
    
      {loading && (
        <div className="fixed  bg-[#1a2d42] inset-0 flex flex-col items-center justify-center bg-opacity-80 z-50">
          {/* Spinner */}
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 w-full h-full border-4 border-t-[#f3c623] border-l-transparent border-b-transparent border-r-[#f3c623] rounded-full animate-spin"></div>
          </div>

          {/* Glow Text */}
          <h2 className="mt-6 text-[#fff] text-2xl font-semibold animate-pulse">
            Processing Your Order
          </h2>

          {/* Progress Bar */}
          <div className="mt-4 w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-[#f3c623] rounded-full animate-progress"></div>
          </div>

          {/* Icon at the bottom */}
          <div className="mt-6 flex items-center text-[#f3c623] text-xl">
            <FaCheckCircle className="animate-bounce" />
            <span className="ml-2 text-[#fff]">Please Hold...</span>
          </div>
        </div>
      )}

    </form></>
  );
};

export default CheckoutForm;
