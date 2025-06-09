import React, { useState } from 'react';
import img from '../../assets/BLOG.jpg';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const BlogBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-80 flex justify-center items-center z-50"
          onClick={closePopup} // Close the popup when clicking anywhere
        >
          <div 
            className="bg-white shadow-lg w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] flex relative rounded-lg overflow-hidden"
          >
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-xl text-black hover:text-gray-300"
              onClick={closePopup}
            >
              <FaTimes />
            </button>

            {/* Popup Content */}
            <div className="flex w-full h-full" onClick={closePopup}>
              {/* Image on the left */}
              <div className="w-1/2">
                <img
                  src={img}
                  alt="Blog"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              {/* Text and Call to Action Button on the right */}
              <div className="w-1/2 p-6 flex flex-col justify-center items-center text-center">
                <h2 className="text-sm font-bold text-gray-800">
                  Introducing ATB Blog
                </h2>
                <p className="text-gray-600 mt-4 text-sm font-thin">
                  Discover a world of insightful articles, expert tips, and engaging stories covering a variety of topics. Whether you're looking for style advice, lifestyle hacks, or the latest trends, our blog has something for everyone. Stay informed, inspired, and connected.
                </p>
                <Link to="/blog">
                  <button className="mt-6 px-6 py-2 text-sm bg-black text-white hover:bg-white hover:border hover:text-black hover:border-black mb-9">
                    View Blog
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

export default BlogBanner;
