



import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../products/product";
import { Link, useNavigate } from "react-router-dom";

import bag from '../../assets/clt.webp'
import bag2 from '../../assets/rose.jpg';

const BIN_ID = "68468e468960c979a5a6e612";
const API_KEY = "$2a$10$yti1izYQ7PKY9IhwxrQiuuIk8TZDdxM6nzYFnduMOvJtKIdyRhBB.";


const headers = {
  "X-Master-Key": API_KEY,
  "Content-Type": "application/json",
};

const categories = [
    {
      label: "Clothes",
      value: "Clothes",
      image: bag,
    },
    {
      label: "SHOES",
      value: "Shoe",
      image: bag2,
    },
   
  ];
  

export default function CategorySelector() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await axios.get(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, { headers });
    setProducts(res.data.record);
  };

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // Deselect if the same category is clicked again
    } else {
      setSelectedCategory(category); // Select the new category
    }
  };


  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory).slice(0, 4)
    : [];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Browse Category</h1>

      {/* Category Cards in a Row */}
      <div className="flex gap-4 mb-8 justify-center">
        {categories.map((cat) => (
          <div
            key={cat.value}
            className="relative w-40 h-32 rounded overflow-hidden cursor-pointer shadow hover:shadow-lg transition"
            onClick={() => handleCategoryClick(cat.value)} // Toggle category selection
            style={{
              backgroundImage: `url(${cat.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-white text-sm font-semibold text-center px-2">
                {cat.label}
              </h2>
            </div>
          </div>
        ))}
      </div>



      {selectedCategory && (
        <>
          <h2 className="text-sm font-semibold mb-4 text-center">
            Showing {selectedCategory} Products
          </h2>

          {/* Compact Product Cards */}
          <div className="flex flex-wrap justify-center gap-4">
  {filteredProducts.map((product) => (
    <div key={product.id} className="w-48 bg-black shadow p-3 rounded text-sm">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-32 object-cover rounded mb-2"
        />
        <h3 className="font-semibold text-sm text-[#ccc]">{product.name}</h3>
        <p className="text-gray-300 text-xs">{product.category}</p>
        <p className="font-bold text-yellow-300 text-sm">N{product.price}</p>
      </Link>
    </div>
  ))}
</div>


          {/* Button to Shop Page */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/shop")}
              className="bg-black text-white px-6 py-2 rounded hover:border-2 hover:border-black hover:text-white hover:bg-white transition"
            >
              Go to Shop
            </button>
          </div>
        </>
      )}
    </div>
  );
}
