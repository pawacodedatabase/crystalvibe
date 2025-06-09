import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaEnvelope, FaInstagram, FaRegStar, FaShoppingBag, FaStar } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import FeaturedProduct from './FeaturedProd';
import ReviewComponent from '../components/review';

interface CartItem {
  productId: number;
  quantity: number;
}

interface WishlistItem {
  productId: number;
}

const BIN_ID = "68468e468960c979a5a6e612"; // Your JSONBin ID
const API_KEY = "$2a$10$yti1izYQ7PKY9IhwxrQiuuIk8TZDdxM6nzYFnduMOvJtKIdyRhBB."; // Your API key
const headers = {
  "X-Master-Key": API_KEY,
  "Content-Type": "application/json",
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>(() => JSON.parse(localStorage.getItem('cart') || '[]'));
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => JSON.parse(localStorage.getItem('wishlist') || '[]'));
  const [isLoading, setIsLoading] = useState<boolean>(true); // Track loading state

  // Fetch product details from JSONBin
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, { headers });
      const productData = response.data.record.find((p: any) => p.id === parseInt(id!));
      setProduct(productData);
      if (productData) {
        setSelectedImage(productData.images[0]);
      } else {
        setIsModalOpen(true);
      }
      setIsLoading(false); // Stop loading once data is fetched
    } catch (error) {
      console.error("Error fetching product:", error);
      setIsLoading(false); // Stop loading in case of error
    }
  };

 

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const closeModal = () => {
    setIsModalOpen(false);
    window.location.href = '/shop';
  };

  const handleRating = (index: number) => {
    setRating(index);
  };

  // Add product to cart
  const addToCart = () => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find(item => item.productId === product?.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ productId: product?.id!, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Increase product quantity in cart
  const increaseQuantity = () => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find(item => item.productId === product?.id);

    if (existingItem) {
      existingItem.quantity += 1;
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  // Decrease product quantity in cart
  const decreaseQuantity = () => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find(item => item.productId === product?.id);

    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity -= 1;
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else if (existingItem && existingItem.quantity === 1) {
      const filteredCart = updatedCart.filter(item => item.productId !== product?.id);
      setCart(filteredCart);
      localStorage.setItem('cart', JSON.stringify(filteredCart));
    }
  };

  // Add product to wishlist
  const addToWishlist = () => {
    if (!wishlist.some(item => item.productId === product?.id)) {
      const updatedWishlist = [...wishlist, { productId: product?.id! }];
      setWishlist(updatedWishlist);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    }
  };

  const isProductInCart = cart.some(item => item.productId === product?.id);
  const isProductInWishlist = wishlist.some(item => item.productId === product?.id);

  // Sticky Add to Cart Button and Scroll Handling
  useEffect(() => {
    const handleScroll = () => {
      const button = document.getElementById('sticky-add-to-cart');
      if (window.scrollY > 200) {
        button?.classList.add('fixed', 'bottom-4', 'right-4');
      } else {
        button?.classList.remove('fixed', 'bottom-4', 'right-4');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get total number of items in the cart
  const getTotalCartItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <>
      <div className="product-detail container mx-auto p-6 bg-white">
        {/* Modal for product not found */}
        {isModalOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-70 z-50">
            <div className="bg-white p-8 rounded-lg mt-9 shadow-lg max-w-lg w-[80%] h-[500px] text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 font-riss">Oops! Product Not Found</h2>
              <p className="text-lg text-gray-600 mb-6">The product you are looking for doesn't exist or may have been removed.</p>
              <button
                className="mt-9 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition duration-300"
                onClick={closeModal}
              >
                X
              </button>
            </div>
          </div>
        )}

        {/* Skeleton Loader */}
        {isLoading ? (
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-2/3 mb-6 md:mb-0">
              <div className="bg-gray-300 h-80 rounded-lg animate-pulse"></div>
            </div>
            <div className="w-full md:w-1/3">
              <div className="flex space-x-4">
                <div className="bg-gray-300 h-20 w-20 rounded-lg animate-pulse"></div>
                <div className="bg-gray-300 h-20 w-20 rounded-lg animate-pulse"></div>
                <div className="bg-gray-300 h-20 w-20 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        ) : (
          // Product Information
          product && (
            <div>
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-2/3 mb-6 md:mb-0">
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="w-full h-80 object-cover rounded-lg shadow-md"
                  />
                </div>

                <div className="w-full md:w-1/3">
                  <div className="flex space-x-4">
                    {product.images.map((image: string, index: number) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-20 h-20 object-cover cursor-pointer rounded-lg border-2 border-gray-300 hover:border-black"
                        onClick={() => setSelectedImage(image)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h1 className="text-3xl font-bold text-gray-800 text-center font-riss">{product.name}</h1>
                <p className="text-sm text-gray-600 mt-2 p-2">{product.description}</p>

                <div className="flex items-center mt-4">
                  <p className="text-2xl font-bold text-gray-800">₦{product.price.toFixed(2)}</p>
                  {product.isOnSale && product.originalPrice && (
                    <p className="text-sm text-red-500 line-through ml-4">
                      ₦{product.originalPrice.toFixed(2)}
                    </p>
                  )}
                </div>

                <div>
                <div>
               {product.sizes && product.sizes.length > 0 && (
  <div className="mt-5">
    <p>
      Available Size{product.sizes.length === 1 ? "" : "s"}:
    </p>
    {product.sizes.map((size: string, index: number) => (
      <span key={index}>
        <p className="p-2 bg-gray-300 inline-block rounded text-sm mr-2">
          {size}
        </p>
        {index < product.sizes.length - 1 ? ", " : ""}
      </span>
    ))}
  </div>
)}




{product.colors && product.colors.length > 0 && (
  <div className="mt-5">
    <p>
      Available Color{product.colors.length === 1 ? "" : "s"}:
    </p>
    {product.colors.map((color: string, index: number) => (
      <span key={index}>
        <p className="p-2 bg-gray-300 inline-block rounded text-sm mr-2">
          {color}
        </p>
        {index < product.colors.length - 1 ? ", " : ""}
      </span>
    ))}
  </div>
)}


{/* <div>
  <p>
    Available Color{product.colors?.length === 1 ? "" : "s"}:
  </p>{" "}
  {product.colors?.map((color: string, index: number) => (
    <span key={index}>
       <p
  key={index}
  className="p-2 inline-block rounded text-sm mr-2"
  style={{ backgroundColor: color }}
>
  {color.charAt(0).toUpperCase() + color.slice(1)}
</p>

      {index < product.colors.length - 1 ? ", " : ""}
    </span>
  ))}
</div> */}

</div>

</div>


                <div className="mt-6 flex items-center">
                  {!isProductInCart ? (
                    <button
                      onClick={addToCart}
                      className="bg-[#1a2d42] text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition duration-300"
                    >
                      <FaShoppingBag/>
                    </button>
                  ) : (
                    <div className="flex items-center">
                      <button onClick={decreaseQuantity} className="bg-gray-300 text-black py-2 px-4 rounded-l-lg hover:bg-gray-400">
                        -
                      </button>
                      <span className="mx-2 text-lg">
                        {cart.find(item => item.productId === product?.id)?.quantity || 0}
                      </span>
                      <button onClick={increaseQuantity} className="bg-gray-300 text-black py-2 px-4 rounded-r-lg hover:bg-gray-400">
                        +
                      </button>
                    </div>
                  )}

                  <button
                    onClick={addToWishlist}
                    className={`py-2  border-2 border-[#1a2d42] px-6 rounded-lg ml-4 ${
                      isProductInWishlist ? 'bg-gray-400 text-green' : ' text-black hover:text-white hover:bg-gray-700'
                    } transition duration-300`}
                    disabled={isProductInWishlist}
                  >
                    {isProductInWishlist ? 'Added' : 'Add to Wishlist'}
                  </button>
                </div>
              </div>
            </div>
          )
        )}

        {/* Cart Icon with Counter */}
        <div className="fixed bottom-8 right-8 flex flex-col items-center">
          <div className="relative">
            <Link to='/cart'>
              <div className="bg-gray-800 text-white rounded-full p-4 cursor-pointer">
                <span className="material-icons text-2xl"><FiShoppingCart /></span>
                {getTotalCartItems() > 0 && (
                  <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalCartItems()}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>

        <div className="mt-6 flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map(index => (
            <div
              key={index}
              onClick={() => handleRating(index)}
              onMouseEnter={() => setHoverRating(index)}
              onMouseLeave={() => setHoverRating(0)}
              className="cursor-pointer"
            >
              {rating >= index || hoverRating >= index ? (
                <FaStar className="text-yellow-400" />
              ) : (
                <FaRegStar className="text-gray-400" />
              )}
            </div>
          ))}
        </div>
      
        <div>
          <div className="mt-8 border-t pt-6">
            <h2 className="text-2xl  text-gray-800 text-center font-riss">About the Brand</h2>
            <p className="text-sm text-gray-800 mt-2 text-center">
  CrystalVibe specializes in luxurious oufits. Our mission is to add elegance and sophistication to your wardrobe, all at affordable prices.
</p>

          </div>

          {/* Social Media */}
          <div className="mt-6 flex justify-center space-x-4">
            <a href="mailto:luxx" className="text-black hover:text-red-500">
              <FaEnvelope size={24} />
            </a>
            <a href="https://instagram.com/luxebybuolaa" className="text-black hover:text-red-500">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
      <FeaturedProduct/>
      <ReviewComponent/>
    </>
  );
};

export default ProductDetail;
