import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingBag, FaHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import axios from "axios";
import BusinessPopup from "../components/popup";

const BIN_ID = "68468e468960c979a5a6e612"; // Your bin ID
const API_KEY = "$2a$10$yti1izYQ7PKY9IhwxrQiuuIk8TZDdxM6nzYFnduMOvJtKIdyRhBB.";
const headers = {
  "X-Master-Key": API_KEY,
  "Content-Type": "application/json",
};

interface Product {
  id: number;
  name: string;
  category: string;
  subCategories: string[];
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  sizes?: string[];
  colors?: string[];
}

interface CartItem {
  productId: number;
  quantity: number;
}

interface WishlistItem {
  productId: number;
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hoveredImages, setHoveredImages] = useState<{ [key: number]: string }>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, { headers });
      setProducts(res.data.record);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();

    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }

    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Cart logic
  const handleAddToCart = (productId: number) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.productId === productId);
      if (existing) {
        return prevCart.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { productId, quantity: 1 }];
    });
  };

  const handleDecreaseQuantity = (productId: number) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.productId === productId);
      if (existing && existing.quantity === 1) {
        return prevCart.filter((item) => item.productId !== productId);
      }
      return prevCart.map((item) =>
        item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const handleIncreaseQuantity = (productId: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Wishlist logic
  const handleAddToWishlist = (productId: number) => {
    setWishlist((prevWishlist) => {
      if (!prevWishlist.some((item) => item.productId === productId)) {
        return [...prevWishlist, { productId }];
      }
      return prevWishlist;
    });
  };

  // Helpers
  const getCartItem = (productId: number) => {
    return cart.find((item) => item.productId === productId);
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some((item) => item.productId === productId);
  };

  const handleMouseEnter = (productId: number, images: string[]) => {
    if (images.length > 1) {
      setHoveredImages((prev) => ({ ...prev, [productId]: images[1] }));
    }
  };

  const handleMouseLeave = (productId: number, images: string[]) => {
    setHoveredImages((prev) => ({ ...prev, [productId]: images[0] }));
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <>
   <BusinessPopup/>
    <div className="relative"> <h1 className="text-2xl font-thin text-center p-4">OUR COLLECTIONS</h1>
      <div className="flex flex-wrap justify-center gap-5 w-full p-6">
       
        {loading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse w-[350px] h-[400px] bg-gray-200 rounded-lg"
            />
          ))
        ) : (
          products.map((product) => {
            const cartItem = getCartItem(product.id);

            return (
              <div
                key={product.id}
                className="relative group w-[350px] overflow-hidden rounded-lg border border-gray-200 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                {/* Sale badge */}
                {product.originalPrice && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold py-1 px-3 transform rotate-45 origin-top-left z-10">
                    SALE
                  </div>
                )}

                {/* Product Image with hover */}
                <Link to={`/product/${product.id}`}>
                  <img
                    src={hoveredImages[product.id] || product.images[0]}
                    alt={product.name}
                    className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-110"
                    onMouseEnter={() => handleMouseEnter(product.id, product.images)}
                    onMouseLeave={() => handleMouseLeave(product.id, product.images)}
                  />
                </Link>

                {/* Product Details */}
                <div className="p-4">
                  <h3 className="font-thin text-lg">{product.name}</h3>
                  <p className="font-semibold text-red-500 text-lg mt-2">
                    ₦{product.price}
                    {product.originalPrice && (
                      <span className="line-through text-gray-500 ml-2">
                        ₦{product.originalPrice}
                      </span>
                    )}
                  </p>
                </div>

                {/* Cart & Wishlist Buttons */}
                <div className="flex justify-between p-4 border-t border-gray-200">
                  {cartItem ? (
                    <div className="flex items-center">
                      <button
                        onClick={() => handleDecreaseQuantity(product.id)}
                        className="bg-[#2e4156] text-white px-3 py-1 hover:bg-[#aab7b7] hover:text-black transition"
                      >
                        -
                      </button>
                      <button className="bg-[#c0c8ca] text-black px-3 py-1">
                        {cartItem.quantity}
                      </button>
                      <button
                        onClick={() => handleIncreaseQuantity(product.id)}
                        className="bg-[#2e4156] text-white px-3 py-1 hover:bg-[#aab7b7] hover:text-black transition"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="bg-[#000000] text-yellow-300 px-3 py-1 hover:bg-[#aab7b7] hover:text-black transition"
                    >
                      <div className="flex gap-2">
                        <p className="text-xl">
                          <FaShoppingBag />
                        </p>
                        <p className="text-sm">Add to cart</p>
                      </div>
                    </button>
                  )}

                  <button
                    onClick={() => handleAddToWishlist(product.id)}
                    className={`${
                      isInWishlist(product.id) ? "bg-[#2e4156] text-white" : "text-gray-700"
                    } border-2 border-[#2e4156] px-4 py-2 transition`}
                  >
                    {isInWishlist(product.id) ? (
                      <div className="flex gap-2">
                        <p className="text-xl text-red-500">
                          <FaHeart />
                        </p>
                        <p className="text-sm">Added</p>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <p className="text-xl">
                          <FaHeart />
                        </p>
                        <p className="text-sm">Wishlist</p>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Sticky Cart Icon */}
      <div className="fixed bottom-8 right-8 flex flex-col items-center">
        <div className="relative">
          <Link to="/cart">
            <div className="bg-gray-800 text-white rounded-full p-4 cursor-pointer">
              <FiShoppingCart />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full px-2">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>

      {/* Sticky Wishlist Icon */}
      <div className="fixed bottom-8 left-8 flex flex-col items-center">
        <div className="relative">
          <Link to="/wishlist">
            <div className="bg-gray-800 text-white rounded-full p-4 cursor-pointer">
              <FaHeart />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full px-2">
                  {wishlistCount}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div> </>
  );
}
