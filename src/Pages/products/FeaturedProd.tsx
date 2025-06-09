import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];



}const BIN_ID = "68468e468960c979a5a6e612";
const API_KEY = "$2a$10$yti1izYQ7PKY9IhwxrQiuuIk8TZDdxM6nzYFnduMOvJtKIdyRhBB.";
const headers = {
  "X-Master-Key": API_KEY,
  "Content-Type": "application/json",
};

const FeaturedProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch products from JSONBin
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, { headers });
      setProducts(response.data.record);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Pick 4 random products
  const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 4);

  if (isLoading) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-center mb-6 font-riss">Featured Products</h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-4 p-5">
          {/* Skeleton Loader */}
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-300 animate-pulse h-[500px] rounded-lg overflow-hidden"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-center mb-6 font-riss">Featured Products</h2>
    
    <div className='flex justify-center flex-wrap'>
       <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-4 p-5">
        {randomProducts.map((product: Product) => (
          <div
            key={product.id}
            className="bg-black border border-gray-200 shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            {/* Product Image */}
            <Link to={`/product/${product.id}`}>
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-[500px] object-cover"
              />
            </Link>

            {/* Product Details */}
          <p className="text-sm font-semibold text-white p-4  mt-1">
  {typeof product.price === 'number'
    ? `₦${product.price.toLocaleString()}`
    : 'Price Unavailable'}

  {typeof product.originalPrice === 'number' && (
    <span className="text-gray-500 text-xs line-through ml-2">
      ₦{product.originalPrice.toLocaleString()}
    </span>
  )}
</p>

          </div>
        ))}




             </div>

      </div> 
              <div className="flex justify-center">
  <Link to="/shop">
    <button className="bg-black text-white p-4 mb-5">View All Products</button>
  </Link>
</div>
    </div>
  );
};

export default FeaturedProduct;
