import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products, Product } from './product'; // Ensure this is correct
import { FaShoppingBag, FaHeart } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import MovingText from '../components/movingtext';
import BannerPopUp from '../components/Banner';
import SearchBar from './search';





interface CartItem {
  productId: number;
  quantity: number;
}

interface WishlistItem {
  productId: number;
}

const Shop: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  
  // Load cart and wishlist from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }

    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  // Save cart and wishlist to localStorage whenever they change
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    if (wishlist.length > 0) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist]);

  // Handle adding to the cart
  const handleAddToCart = (productId: number) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.productId === productId);
      if (existingProduct) {
        return prevCart.map(item =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { productId, quantity: 1 }];
    });
  };

  // Handle removing from the cart
  // const handleRemoveFromCart = (productId: number) => {
  //   setCart(prevCart => prevCart.filter(item => item.productId !== productId));
  // };

  // Handle adding to the wishlist
  const handleAddToWishlist = (productId: number) => {
    setWishlist(prevWishlist => {
      if (!prevWishlist.some(item => item.productId === productId)) {
        return [...prevWishlist, { productId }];
      }
      return prevWishlist;
    });
  };

  // Get product data from cart
  const getCartProduct = (productId: number) => {
    return cart.find(item => item.productId === productId);
  };

  // Handle decreasing quantity and auto remove when it hits zero
  const handleDecreaseQuantity = (productId: number) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.productId === productId);
      if (existingProduct && existingProduct.quantity === 1) {
        // Automatically remove item from cart when quantity reaches zero
        return prevCart.filter(item => item.productId !== productId);
      } else {
        return prevCart.map(item =>
          item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  // Handle increase in quantity
  const handleIncreaseQuantity = (productId: number) => {
    setCart(prevCart => {
      return prevCart.map(item =>
        item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  };

  // Calculate cart count
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Wishlist count
  const wishlistCount = wishlist.length;

  return (

    <>
    <MovingText/>

    <SearchBar/>
    <BannerPopUp/>

    <hr />
    <br /> <br />
    <div>

        <h1 className='text-3xl text-center'>Our Collections</h1>
        </div> 
        
        <br />


    
    <div className="relative">
      <div className="flex flex-wrap justify-center gap-5 w-full">
        {products.map((product: Product) => {
          const cartItem = getCartProduct(product.id);
          const isInWishlist = wishlist.some(item => item.productId === product.id);

          // State to track the image on hover
          const [image, setImage] = useState<string>(product.images[0]);

          return (

        
            <div
              key={product.id}
              className="relative  group w-[350px] overflow-hidden rounded-lg border border-gray-200 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            >


                
              {/* Sale Badge (Plaster Style) */}
              {product.originalPrice && (
                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold py-1 px-3 transform rotate-45 origin-top-left z-10">
                  SALE
                </div>
              )}

              {/* Product Image with Hover Effect */}
              <Link to={`/product/${product.id}`}>
                <img
                  src={image}
                  alt={product.name}
                  className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-110"
                  onMouseEnter={() => {
                    if (product.images.length > 1) {
                      setImage(product.images[1]); // Set to second image on hover
                    }
                  }}
                  onMouseLeave={() => {
                    setImage(product.images[0]); // Reset to first image
                  }}
                />
              </Link>

              {/* Product Details */}
              <div className="p-4">
                <h3 className="font-thin text-lg">{product.name}</h3>
            
                {/* Display price with slash if on sale */}
                <p className="font-semibold  text-red-500 text-lg mt-2">
                  ₦{product.price}
                  {product.originalPrice && (
                    <span className="line-through text-gray-500 ml-2">₦{product.originalPrice}</span>
                  )}
                </p>
              </div>

              {/* Add to Cart and Add to Wishlist Buttons */}
              <div className="flex justify-between p-4 border-t border-gray-200">
                {cartItem ? (
                  <div className="flex items-center ">
                    <button
                      onClick={() => handleDecreaseQuantity(product.id)}
                      className="bg-[#2e4156]  text-white  px-3 py-1 hover:bg-[#aab7b7] hover:text-black transition"
                    >
                      -
                    </button>
                    <button
                      className="bg-[#c0c8ca] text-black  px-3 py-1 hover:bg-gray-300 transition"
                    >
                      {cartItem.quantity}
                    </button>
                    <button
                      onClick={() => handleIncreaseQuantity(product.id)}
                      className="bg-[#2e4156]  text-white  px-3 py-1 hover:bg-[#aab7b7] hover:text-black transition"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="bg-[#2e4156] text-[#d4d8dd]  px-3 py-1 hover:bg-[#aab7b7] hover:text-black transition"
                  >
                   <div className='flex gap-2'> <p className='text-xl'><FaShoppingBag/> </p> <p className='text-sm'>Add to cart</p> </div>
                  </button>
                )}

                <button
                  onClick={() => handleAddToWishlist(product.id)}
                  className={`${
                    isInWishlist ? 'bg-[#2e4156] text-white' : 'text-gray-700'
                  } border-2 border-[#2e4156] px-4 py-2 transition`}
                >
                  {isInWishlist ? <div className='flex gap-2'> <p className='text-xl text-red-500'><FaHeart/> </p> <p className='text-sm'>Added to Wishlist</p> </div> :<div className='flex gap-2'> <p className='text-xl'><FaHeart/> </p> <p className='text-sm'>Add to Wishlist</p> </div> }
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky Cart Icon (Global) */}
      <div className="fixed bottom-8 right-8 flex flex-col items-center">
        <div className="relative">
        <Link to='/cart'>  <div className="bg-gray-800 text-white rounded-full p-4 cursor-pointer">
          
            <span className="material-icons"><FiShoppingCart/></span> 
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full px-2">
                {cartCount}
              </span>
            )}
          </div></Link>
        </div>
      </div>

      {/* Sticky Wishlist Icon (Global) */}
      <div className="fixed bottom-8 left-8 flex flex-col items-center">
        <div className="relative">
          <Link to='/wishlist'> <div className="bg-gray-800 text-white rounded-full p-4 cursor-pointer">
           <span className="material-icons"><FaHeart/></span>
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full px-2">
                {wishlistCount}
              </span>
            )}
          </div> </Link>
        </div>
      </div>
    </div>
   </>
  );
};

export default Shop;
