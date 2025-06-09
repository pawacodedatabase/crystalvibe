import React, { useState } from "react";
import { FaInstagram, FaWhatsapp, FaPhone, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === "") return;
    setSuccess(true);
    setEmail("");
  };

  return (
    <footer className="bg-[#000] text-white py-12">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* About Us */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-l-4 border-gray-300 pl-2">
              About Us
            </h3>
           <p className="text-gray-300 text-sm leading-relaxed">
  At CrystalVibe Luxury, we redefine sophistication with our exclusive range of high-end clothing and designer bags. Each piece is thoughtfully curated to elevate your wardrobe and make a bold statement of style and confidence.
</p>


          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-l-4 border-gray-300 pl-2">
              Newsletter
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to our newsletter and stay updated on new arrivals,
              sales, and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 rounded-full bg-gray-800 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
              <button
                type="submit"
                className="absolute top-1/2 transform -translate-y-1/2 right-3 px-6 py-2 rounded-full bg-gray-300 hover:bg-black hover:text-gray-300  text-black text-sm font-bold transition"
              >
                Subscribe
              </button>
            </form>
            {success && (
              <p className="text-green-200 mt-2 text-sm">
                Thanks for subscribing!
              </p>
            )}
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-l-4 border-gray-300 pl-2">
              Follow Us
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Connect with us on social media:
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://www.tiktok.com/@crystalvibeluxe?_r=1&_d=e7dh7b8d97ldg9&sec_uid=MS4wLjABAAAA3A5NqJF3FbzQJwGP-vJ192yZhsBdmXMEkyOHw9E2geTVw9dw2CbHsBrXAFI-c85S&share_author_id=6824595848320549894&sharer_language=en&source=h5_m&u_code=dedgm3mljh3803&ug_btm=b6880,b5836&sec_user_id=MS4wLjABAAAAuL1w9uEZRF0EfyoLOi2ojHdq4H4kV9Q5hePcaOskCzjVB7F45RYdMkmGHxxQh85C&utm_source=copy&social_share_type=5&utm_campaign=client_share&utm_medium=ios&tt_from=copy&user_id=6872366736688169990&enable_checksum=1&share_link_id=84209114-23D5-4476-9668-0883A53B0C71&share_app_id=1233"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-200 hover:bg-gray-300 p-3 rounded-full text-black text-lg transition"
              >
                <FaTiktok />
              </a>

              <a
                href="https://instagram.com/crystalvibeluxe"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-200 hover:bg-gray-300 p-3 rounded-full text-black text-lg transition"
              >
                <FaInstagram />
              </a>
              <a
  href="https://wa.me/+2348131967623" 
  target="_blank"
  rel="noopener noreferrer"
  className="bg-gray-200 hover:bg-gray-300 p-3 rounded-full text-black text-lg transition">
  <FaWhatsapp />
</a>


              <a
                href="tel:+2348131967623"
                className="bg-gray-200 hover:bg-gray-300 p-3 rounded-full text-black text-lg transition"
              >
                <FaPhone />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} CrystalVibe. All rights reserved.
          </p>
          <ul className="flex space-x-6 mt-4 md:mt-0 ">
            <li>
            

                <Link to={'/legal'}  className="text-gray-400  hover:text-yellow-300 text-sm transition"
             > Privacy Policy
                </Link>
               
            </li>
            <li>
            

                <Link to={'/legal'}  className="text-gray-400 hover:text-yellow-300 text-sm transition"
             > Terms of Service
                </Link>
               
            </li>
            <li>
            

                <Link to={'/legal'}  className="text-gray-400 hover:text-yellow-300 text-sm transition"
             > Refund Policy
                </Link>
               
            </li>
            <li>
            

                <Link to={'/blog'}  className="text-gray-400 hover:text-yellow-300 text-sm transition"
             > Blog
                </Link>
               
            </li>
          
          </ul>
        </div>

        {/* //advert */}
        <div className="text-sm text-center mt-8 ">
          <p className="text-gray-400">
            Website created by |{" "}
            <a
              href="https://wa.me/2348053208997"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-300"
            >
              @pawacode
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
