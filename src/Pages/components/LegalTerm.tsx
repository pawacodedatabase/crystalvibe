const LegalTerms = () => {
  return (
    <div className="bg-gray-50 py-10 px-4 lg:px-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms and Conditions</h1>
        <p className="text-gray-600 mb-4">
          Welcome to <strong>CrystalVibe Luxury</strong>! By accessing and using our website, you agree to the following
          terms and conditions. Please read them carefully.
        </p>

        <div className="space-y-8">
          {/* Section 1: Introduction */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">1. Introduction</h2>
            <p className="text-gray-600">
              These Terms and Conditions ("Terms") govern your use of our website and the purchase of our luxury products. By accessing
              or using our website, you agree to be bound by these Terms. If you do not agree, please refrain from using our platform.
            </p>
          </div>

          {/* Section 2: Products and Services */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">2. Products and Services</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>CrystalVibe Luxury offers a curated selection of premium clothing and designer bags for women.</li>
              <li>All products are subject to availability and may change without prior notice.</li>
              <li>Product images are for illustrative purposes; slight variations in color may occur due to screen display settings.</li>
            </ul>
          </div>

          {/* Section 3: Payment Terms */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">3. Payment Terms</h2>
            <p className="text-gray-600">
              Full payment is required before an order is confirmed. We accept the following payment methods:
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Bank Transfers</li>
              <li>Mobile Payment Options</li>
            </ul>
          </div>

          {/* Section 4: Order Processing and Delivery */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">4. Order Processing and Delivery</h2>
            <p className="text-gray-600">
              Orders are typically processed and shipped within <strong>2–5 working days</strong>, depending on product availability and your location.
              Shipping costs are calculated during checkout and may vary by destination.
            </p>
          </div>

          {/* Section 5: Returns and Refunds */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">5. Returns and Refunds</h2>
            <p className="text-gray-600">
              We accept returns on eligible items within 7 days of delivery, provided the following conditions are met:
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Items must be unused, unworn, and in their original condition and packaging.</li>
              <li>Return shipping costs are the responsibility of the customer unless the item received was defective or incorrect.</li>
              <li>Sale items and undergarments are non-returnable for hygiene reasons.</li>
            </ul>
          </div>

          {/* Section 6: Use of Website */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">6. Use of Website</h2>
            <p className="text-gray-600">
              You agree to use this website lawfully and not infringe on any intellectual property rights or engage in unauthorized or malicious activity.
              Any misuse may result in access restrictions or legal action.
            </p>
          </div>

          {/* Section 7: Contact Us */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">7. Contact Us</h2>
            <p className="text-gray-600">
              For questions regarding these Terms, please contact us at:
              <br />
              <strong>Email:</strong>{" "}
              <a href="mailto:crystalvibeluxury@gmail.com" className="text-blue-800 font-semibold text-sm underline">
                crystalvibeluxury@gmail.com
              </a>
              <br />
              <strong>Phone:</strong>{" "}
              <a href="tel:+2348104682609" className="text-blue-800 font-semibold text-sm underline">
                +234 810 468 2609
              </a>
            </p>
          </div>
        </div>

        <p className="text-gray-500 mt-8">
          Last updated: <span className="font-semibold">Jan 18, 2025</span>
        </p>
      </div>
    </div>
  );
};

export default LegalTerms;
