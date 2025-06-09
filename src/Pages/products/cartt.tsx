import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  // Add more fields if needed
}

interface CartItem {
  productId: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [promoCode, setPromoCode] = useState<string>("");
  const [discountApplied, setDiscountApplied] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://api.jsonbin.io/v3/b/68468e468960c979a5a6e612/latest", {
          headers: {
            "X-Master-Key": "$2a$10$yti1izYQ7PKY9IhwxrQiuuIk8TZDdxM6nzYFnduMOvJtKIdyRhBB.",
          },
        });
        const data = await res.json();
        console.log(data); // <- check what your data looks like in console

        if (data.record.products) {
          setProducts(data.record.products);
        } else {
          setProducts(data.record); // fallback if products are not nested
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();

    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const handleRemoveFromCart = (productId: number) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDecreaseQuantity = (productId: number) => {
    const updatedCart = cart.map((item) =>
      item.productId === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleIncreaseQuantity = (productId: number) => {
    const updatedCart = cart.map((item) =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handlePromoCode = () => {
    if (promoCode === "ATB5OFF") {
      setDiscountApplied(true);
    } else {
      alert("Invalid promo code");
      setDiscountApplied(false);
    }
  };

  const totalPrice = cart.reduce((total, item) => {
    const product = products.find((p) => p.id === item.productId);
    if (product) {
      return total + item.quantity * product.price;
    }
    return total;
  }, 0);

  const totalWithDiscount = discountApplied ? totalPrice * 0.95 : totalPrice;
  const finalTotal = totalWithDiscount;

  return (
    <div className="bg-white min-h-screen text-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Your Cart</h1>

        <div>
          <p className="text-center">
            If your item is not here kindly{" "}
            <span className="border-2 border-[#1a2d42] px-3 text-sm py-1 bg-[#1a2d42] text-white hover:bg-transparent hover:text-black rounded-md">
              <Link to="/cart">Refresh</Link>
            </span>
          </p>
        </div>

        <br /> <br />

        {cart.length === 0 ? (
          <div>
            <p className="text-center text-2xl text-gray-600 mb-5">
              Your cart is empty.{" "}
              <Link to="/shop" className="border-2 border-[#1a2d42] px-3 text-sm py-1 bg-[#1a2d42] text-white hover:bg-transparent hover:text-black rounded-md">
                Start shopping!
              </Link>
            </p>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left border-collapse">
                <thead className="border-b border-gray-300">
                  <tr className="text-sm text-gray-600">
                    <th className="pb-4 px-6 text-left">Product</th>
                    <th className="pb-4 px-6 text-center">Quantity</th>
                    <th className="pb-4 px-6 text-center">Price</th>
                    <th className="pb-4 px-6 text-center">Total</th>
                    <th className="pb-4 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => {
                    const product = products.find((p) => p.id === item.productId);
                    return product ? (
                      <tr key={item.productId} className="border-b border-gray-200 hover:bg-gray-100 transition">
                        <td className="py-4 px-6 flex items-center">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-16 h-16 object-cover mr-4 rounded"
                          />
                          <span className="font-semibold">{product.name}</span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => handleDecreaseQuantity(item.productId)}
                              className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-600 hover:text-white transition"
                            >
                              -
                            </button>
                            <span className="px-4 py-2 bg-gray-200 text-gray-800 rounded">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleIncreaseQuantity(item.productId)}
                              className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-600 hover:text-white transition"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">₦{product.price.toFixed(2)}</td>
                        <td className="py-4 px-6 text-center">
                          ₦{(item.quantity * product.price).toFixed(2)}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <button
                            onClick={() => handleRemoveFromCart(item.productId)}
                            className="text-red-500 hover:underline flex items-center justify-center"
                          >
                            <FaTrashAlt />
                            <span className="ml-1">Remove</span>
                          </button>
                        </td>
                      </tr>
                    ) : null;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {cart.length > 0 && (
          <div className="mt-6">
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <div className="flex flex-col mb-6">
                <label className="text-lg text-gray-600 mb-2">Promo Code</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter Promo Code"
                    className="px-4 py-2 bg-gray-100 text-gray-800 rounded"
                  />
                  <button
                    onClick={handlePromoCode}
                    className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center text-lg text-gray-600">
                <span>Subtotal:</span>
                <span>₦{totalPrice.toFixed(2)}</span>
              </div>

              {discountApplied && (
                <div className="flex justify-between items-center text-lg text-green-500">
                  <span>Discount (5%):</span>
                  <span>-₦{(totalPrice * 0.05).toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between items-center text-xl font-semibold text-gray-700 mt-4">
                <span>Total:</span>
                <span>₦{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={() => navigate("/checkout")}
                className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
