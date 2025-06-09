import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaShoppingCart, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  // Add other fields if needed
}

interface WishlistItem {
  productId: number;
}

const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://api.jsonbin.io/v3/b/68468e468960c979a5a6e612/latest", {
          headers: {
            "X-Master-Key": "$2a$10$yti1izYQ7PKY9IhwxrQiuuIk8TZDdxM6nzYFnduMOvJtKIdyRhBB.",
          },
        });
        const data = await res.json();
        console.log(data); // check what you get
        if (data.record.products) {
          setProducts(data.record.products);
        } else {
          setProducts(data.record);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();

    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  const handleRemoveFromWishlist = (productId: number) => {
    const updatedWishlist = wishlist.filter(item => item.productId !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const handleAddToCart = (productId: number) => {
    const storedCart = localStorage.getItem('cart');
    let cart = storedCart ? JSON.parse(storedCart) : [];

    const existingItem = cart.find((item: { productId: number }) => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ productId, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Product added to cart!");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <header className="bg-white py-8 shadow-md">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-gray-800">Your Wishlist</h1>
          <p className="text-lg text-gray-600 mt-2">Explore your favorite products, curated by you.</p>
        </div>
      </header>

      <div className="container mx-auto p-6">
        {/* Wishlist Items */}
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-16">
            <p className="text-lg text-gray-600">Your wishlist is currently empty.</p>
            <Link
              to="/shop"
              className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map(item => {
              const product = products.find(product => product.id === item.productId);
              return product ? (
                <div
                  key={item.productId}
                  className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-60 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h2>
                    <p className="text-gray-600 mt-2">₦{product.price.toFixed(2)}</p>
                    <div className="flex items-center justify-between mt-4">
                      {/* Add to Cart */}
                      <button
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center gap-2"
                        onClick={() => handleAddToCart(product.id)}
                      >
                        <FaShoppingCart /> Add to Cart
                      </button>
                      {/* Remove from Wishlist */}
                      <button
                        className="text-red-500 hover:text-red-700 transition duration-300"
                        onClick={() => handleRemoveFromWishlist(product.id)}
                      >
                        <FaTrash className="text-lg" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        )}
      </div>

      {/* About the Brand Section */}
      <section className="bg-white py-16 mt-16">
        <div className="container mx-auto text-center">
          {/* Social Media Icons */}
          <div className="flex justify-center gap-8 mt-8">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="text-blue-600 text-4xl hover:scale-110 transition-transform" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-pink-500 text-4xl hover:scale-110 transition-transform" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-blue-400 text-4xl hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Wishlist;
