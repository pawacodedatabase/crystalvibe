import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products, Product } from './product'; // Ensure this is the correct path
import FashionComponent from '../components/fasionComp';
import {  FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Collections: React.FC = () => {
  const itemsPerPage = 8; // Number of products per page
  const [currentPage, setCurrentPage] = useState(1);

  // Shuffle products randomly
  const shuffledProducts = [...products].sort(() => 0.5 - Math.random());

  // Calculate paginated products
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = shuffledProducts.slice(startIndex, startIndex + itemsPerPage);

  // Calculate total pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
   <>
   <div className="mt-8">
      <h2 className="text-2xl font-bold text-center mb-6 font-riss">Collections</h2>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 p-5">
        {paginatedProducts.map((product: Product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            {/* Product Image */}
            <Link to={`/product/${product.id}`}>
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-[300px] object-cover"
              />
            </Link>

            {/* Product Details */}
            <div className="p-2">
              <h3 className="text-sm font-semibold truncate">{product.name}</h3>
              <p className="text-sm font-semibold text-red-500 mt-1">
                {/* ₦{product.price.toLocaleString()}
                {product.originalPrice && (
                  <span className="text-gray-500 text-xs line-through ml-2">
                    ₦{product.originalPrice.toLocaleString()}
                  </span>
                )} */}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-4 py-2 bg-black text-[#fff] rounded-lg ${
            currentPage === 1 ? 'opacity-90' : 'hover:bg-gray-300'
          }`}
          disabled={currentPage === 1}
        >
          <FaArrowLeft/>
        </button>

        <div className="text-gray-700">
           {currentPage} of {totalPages}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-4 py-2 bg-black text-[#fff] rounded-lg ${
            currentPage === totalPages ? 'opacity-90' : 'hover:bg-gray-300'
          }`}
          disabled={currentPage === totalPages}
        >
          <FaArrowRight/>
        </button>
      </div>
    </div>
    <FashionComponent/>
    </> 
  );
};

export default Collections;
