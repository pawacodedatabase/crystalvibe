import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const TELEGRAM_BOT_TOKEN = "7322875815:AAGDJcNr0NKzI_4AjILrECy6qWGiHy6p3rs";
const CHAT_ID = "7280420695";
const BANK_ACCOUNT_NUMBER = "1234567890";
const BANK_NAME = "Example Bank";

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const { order } = location.state || {};
  const [loading, setLoading] = useState(false);

  if (!order) return <p>No order found.</p>;

  const createMessage = () => {
    return `
🧾 *Payment Confirmation*

*Order ID:* ${order.orderId}
*Name:* ${order.billingInfo.name}
*Email:* ${order.billingInfo.email}
*Address:* ${order.billingInfo.address}
*Phone:* ${order.billingInfo.phone}
*Delivery State:* ${order.deliveryState}
*Delivery Fee:* ₦${order.deliveryFee.toLocaleString()}
*Total:* ₦${order.totalAmount.toLocaleString()}

🛍️ *Items:*
${order.items
  .map(
    (item: any) =>
      `• ${item.name} x${item.quantity} — ₦${item.total.toLocaleString()}`
  )
  .join("\n")}
    `.trim();
  };

  const handleConfirmPayment = async () => {
    setLoading(true);
    const message = createMessage();

    try {
      // Send to Telegram
      await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: "Markdown",
          }),
        }
      );

      // Simulate loading
      setTimeout(() => {
        const whatsappMessage = encodeURIComponent(message);
        const phone = "2348131967623"; // Replace with your WhatsApp business number (no '+' sign)
        window.location.href = `https://wa.me/${phone}?text=${whatsappMessage}`;
      }, 4000);
    } catch (err) {
      setLoading(false);
      alert("Failed to send confirmation. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white">
      {loading ? (
        <div className="flex justify-center items-center h-[300px] text-center">
          <div className="animate-pulse text-lg text-[#1a2d42] font-semibold">
            Sending confirmation... Please wait.
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4 text-[#1a2d42]">Payment Instructions</h1>

          <div className="mb-6 p-4 border rounded bg-gray-100">
            <h2 className="font-semibold mb-2 text-[#234156]">Transfer Payment (₦{order.totalAmount.toLocaleString()}) To:</h2>
            <p><strong>Bank:</strong> {BANK_NAME}</p>
            <p><strong>Account Number:</strong> {BANK_ACCOUNT_NUMBER}</p>
            <p><strong>Amount:</strong> ₦{order.totalAmount.toLocaleString()}</p>
          </div>

          <div className="mb-6 border rounded p-4 bg-gray-50">
           <h2 className="font-semibold text-[#234156] mb-2">
  {order.billingInfo.name ? `${order.billingInfo.name}'s` : ''} Order Summary
</h2>

            <ul className="space-y-2">
              {order.items.map((item: any, idx: number) => (
                <li key={idx} className="text-sm">
                  {item.name} x{item.quantity} — ₦{item.total.toLocaleString()}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-right font-semibold">
              Delivery Fee: ₦{order.deliveryFee.toLocaleString()} <br />
              <span className="text-lg">Total: ₦{order.totalAmount.toLocaleString()}</span>
            </p>
          </div>

          <button
            onClick={handleConfirmPayment}
            className="w-full py-3 bg-[#1a2d42] text-white font-medium rounded hover:bg-white hover:text-[#1a2d42] hover:border hover:border-[#1a2d42]"
          >
            I Have Made the Payment
          </button>
        </>
      )}
    </div>
  );
};

export default PaymentPage;
