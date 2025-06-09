import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface CartItem {
  productId: number;
  quantity: number;
}

declare global {
  interface Window {
    PaystackPop?: any;
  }
}

const deliveryFees = [
  { state: "West (W)", fee: 2500 },
  { state: "North (N)", fee: 3500 },
  { state: "East (E)", fee: 3500 },
  { state: "South (S)", fee: 35500 },
];

const ORDER_BIN_ID = "6826fbd28960c979a59a8f89";
const API_KEY = "$2a$10$qrNF.b6EVU4HN2N8Dvegaez/mp2L7ZO9EjET5ujsIiWNSfuOyB.mu";

const Checkout: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedDeliveryState, setSelectedDeliveryState] = useState<string>("");
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [billingInfo, setBillingInfo] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    paymentMethod: "Paystack",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }

    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://api.jsonbin.io/v3/b/680c93278a456b796691bca7/latest",
          {
            headers: {
              "X-Master-Key": API_KEY,
            },
          }
        );
        const data = await response.json();
        setProducts(data.record.products || data.record);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const totalPrice = cart.reduce((total, item) => {
    const product = products.find((p) => p.id === item.productId);
    return product ? total + item.quantity * product.price : total;
  }, 0);

  const handleDeliveryStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const state = event.target.value;
    setSelectedDeliveryState(state);
    const selectedFee = deliveryFees.find((fee) => fee.state === state);
    setDeliveryFee(selectedFee ? selectedFee.fee : 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBillingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaystackPayment = async () => {
    if (!window.PaystackPop) {
      alert("Paystack SDK not loaded");
      return;
    }

    if (!billingInfo.email || !billingInfo.name || !billingInfo.phone || !billingInfo.address) {
      alert("Please fill in all billing fields.");
      return;
    }

    if (!selectedDeliveryState) {
      alert("Please select a delivery region");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const totalAmountKobo = Math.round((totalPrice + deliveryFee) * 100);
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const orderedProducts = cart
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        return product
          ? {
              name: product.name,
              quantity: item.quantity,
              price: product.price,
              total: item.quantity * product.price,
            }
          : null;
      })
      .filter(Boolean);

    const order = {
      orderId,
      date: new Date().toISOString(),
      items: orderedProducts,
      deliveryFee,
      deliveryState: selectedDeliveryState,
      totalAmount: totalPrice + deliveryFee,
      billingInfo,
    };

    window.PaystackPop.setup({
      key: "pk_test_3c6c74e920aeec4baf4f0a74227352c934dcb2d0", // Replace with your live key in production
      email: billingInfo.email,
      amount: totalAmountKobo,
      currency: "NGN",
      ref: orderId,
      onSuccess: async () => {
        try {
          const latestRes = await fetch(
            `https://api.jsonbin.io/v3/b/${ORDER_BIN_ID}/latest`,
            {
              headers: { "X-Master-Key": API_KEY },
            }
          );
          const latestData = await latestRes.json();
          const existingInvoices = latestData.record?.invoices || [];

          const updatedData = {
            invoices: [...existingInvoices, order],
          };

          const saveRes = await fetch(`https://api.jsonbin.io/v3/b/${ORDER_BIN_ID}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "X-Master-Key": API_KEY,
              "X-Bin-Versioning": "false",
            },
            body: JSON.stringify(updatedData),
          });

          if (saveRes.ok) {
            localStorage.removeItem("cart");
            navigate("/confirmation", { state: { orderId } });
          } else {
            console.error("Failed to save order:", await saveRes.text());
            alert("Failed to save order. Please contact support.");
          }
        } catch (err) {
          console.error("Error during order save:", err);
          alert("An error occurred during checkout.");
        }
      },
      onCancel: () => {
        alert("Payment canceled");
      },
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white">
      <h1 className="text-2xl font-bold mb-6 text-[#1a2d42]">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="border p-4 rounded-lg shadow-sm bg-gray-50">
          <h2 className="text-lg font-semibold mb-4 text-[#234156]">Order Summary</h2>
          <table className="w-full border">
            <thead>
              <tr>
                <th className="p-2 border">Product</th>
                <th className="p-2 border">Qty</th>
                <th className="p-2 border">Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                return product ? (
                  <tr key={item.productId}>
                    <td className="p-2 border">{product.name}</td>
                    <td className="p-2 border">{item.quantity}</td>
                    <td className="p-2 border">
                      ₦{(item.quantity * product.price).toLocaleString()}
                    </td>
                  </tr>
                ) : null;
              })}
            </tbody>
          </table>

          <div className="mt-4">
            <label htmlFor="deliveryState" className="block text-sm font-medium text-gray-700">
              Delivery Region
            </label>
            <select
              id="deliveryState"
              value={selectedDeliveryState}
              onChange={handleDeliveryStateChange}
              className="w-full border mt-1 p-2 rounded"
            >
              <option value="">Select</option>
              {deliveryFees.map((state) => (
                <option key={state.state} value={state.state}>
                  {state.state} – ₦{state.fee.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 text-right">
            <h3 className="text-lg font-semibold">Delivery: ₦{deliveryFee.toLocaleString()}</h3>
            <h3 className="text-xl font-bold text-[#1a2d42]">
              Total: ₦{(totalPrice + deliveryFee).toLocaleString()}
            </h3>
          </div>
        </div>

        {/* Billing Info */}
        <div className="border p-4 rounded-lg shadow-sm bg-gray-50">
          <h2 className="text-lg font-semibold mb-4 text-[#234156]">Shipping Details</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={billingInfo.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={billingInfo.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={billingInfo.phone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <textarea
              name="address"
              placeholder="Shipping Address"
              value={billingInfo.address}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>

          <button
            onClick={handlePaystackPayment}
            className="mt-6 w-full py-3 bg-[#1a2d42] text-white font-medium rounded hover:bg-white hover:text-[#1a2d42] hover:border hover:border-[#1a2d42]"
          >
            Pay with Paystack
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
