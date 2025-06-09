import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { products, Product } from './product'; // Ensure your product data is imported
import { FiSearch } from 'react-icons/fi';

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const navigate = useNavigate();

  // Handle Search Button Click
  const handleSearch = () => {
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  // Handle View Product
  const handleViewProduct = (productId: number) => {
    navigate(`/product/${productId}`); // Adjust the route as per your app's structure
  };

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto flex  ">
        <input
          type="text"
          placeholder=". Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border  focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-[#1a2d42] text-white  "
        >
         <FiSearch/> 
        </button>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 ? (
        <div className="overflow-y-auto mt-6  border rounded-lg">
          <table className=" bg-white border-collapse">
            <thead className="bg-gray-200 sticky top-0 z-10">
              <tr>
                <th className="border px-4 py-2 text-left"></th>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Price</th>
                <th className="border px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((product: Product) => (
                <tr key={product.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="border px-4 py-2">{product.name}</td>
                  <td className="border px-4 py-2  font-bold text-red-500">
                  ₦{product.price}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => handleViewProduct(product.id)}
                      className="px-4 py-1 bg-[#1a2d42] text-white  text-sm  hover:bg-[#1a2d42]"
                    >
                      View 
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">
          {searchResults.length === 0 && searchQuery
            ? ''
            : ''}
        </p>
      )}
    </div>
  );
};

export default SearchBar;
