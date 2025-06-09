import React, { useState } from 'react';
import img from '../../assets/dami_1.jpg'
import { Link } from 'react-router-dom';
const EmailPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-white  shadow-lg w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] flex relative">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-xl text-black hover:text-gray-300"
              onClick={closePopup}
            >
              X
            </button>

            {/* Popup Content */}
            <div className="flex w-full h-[100%]">
              {/* Image on the left */}
              <div className="w-[50%]">
                <img
                  src={img} // Replace with the actual image link
                  alt="Model"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              {/* Text and Call to Action Button on the right */}
              <div className="w-2/6 p-3 text-center">
                <h2 className="text-lg font-bold text-gray-800">
                  Get 20% off your order
                </h2>
                <p className="text-gray-600 mt-2 font-thin text-center">
                  Join our mailing list and be the first to hear about our best offers, exclusive discounts & more!
                </p>
                <Link to="/contact">
                <button className="mt-4  px-3 py-1 text-sm bg-black text-white  hover:bg-gray-500">
                 Subscribe
                </button>
                </Link>
                
                
              
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmailPopup;
