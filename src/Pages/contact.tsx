import React from 'react';
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from 'react-icons/fa';

const ContactUs: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 bg-white">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#1a2d42]">Contact Us</h1>
        <p className="text-lg text-gray-600 mt-2">
          We're here to help! Reach out to us anytime, and we'll respond as soon as possible.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-[#1a2d42] mb-6">
            Send Us a Message
          </h2>
          <form>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#1a2d42] focus:border-[#1a2d42]"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#1a2d42] focus:border-[#1a2d42]"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Write your message here..."
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#1a2d42] focus:border-[#1a2d42]"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#1a2d42] text-white py-3 px-4 rounded-lg shadow-lg hover:bg-[#142233] transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Details */}
        <div className="space-y-8">
          {/* Contact Info */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-[#1a2d42] mb-4">
              Contact Information
            </h2>
            <ul className="space-y-4">
              <li className="flex items-center space-x-4">
                <FaEnvelope className="text-[#1a2d42] text-xl" />
                <span className="text-gray-700">support@example.com</span>
              </li>
              <li className="flex items-center space-x-4">
                <FaPhoneAlt className="text-[#1a2d42] text-xl" />
                <span className="text-gray-700">+234 801 234 5678</span>
              </li>
              <li className="flex items-center space-x-4">
                <FaMapMarkerAlt className="text-[#1a2d42] text-xl" />
                <span className="text-gray-700">
                  123 Shopify Lane, Lagos, Nigeria
                </span>
              </li>
            </ul>
          </div>

          {/* Operational Hours */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-[#1a2d42] mb-4">
              Business Hours
            </h2>
            <ul className="space-y-4">
              <li className="flex items-center space-x-4">
                <FaClock className="text-[#1a2d42] text-xl" />
                <span className="text-gray-700">Open 24/7</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-[#1a2d42] mb-4">
              Connect With Us
            </h2>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="text-white bg-[#1a2d42] p-3 rounded-full shadow-lg hover:bg-[#142233]"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                className="text-white bg-[#1a2d42] p-3 rounded-full shadow-lg hover:bg-[#142233]"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                className="text-white bg-[#1a2d42] p-3 rounded-full shadow-lg hover:bg-[#142233]"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
