import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, MotionConfig } from "framer-motion";
import { FiHeart, FiShoppingBag, FiShoppingCart } from "react-icons/fi";
import logo from "../assets/logo.png"
import MovingText from "./components/movingtext";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <><MovingText/>
    <header className="bg-[#fff]  py-4 px-4 sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto  flex items-center justify-between">

        {/* Mobile Hamburger Menu (animated) */}
        <div className="md:hidden flex items-center">
          <MotionConfig
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            <motion.button
              initial={false}
              animate={isMenuOpen ? "open" : "closed"}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="relative h-10 w-10 rounded-full bg-black/0 transition-colors hover:bg-black/50 focus:outline-none"
            >
              <motion.span
                variants={VARIANTS.top}
                className="absolute h-1 w-6 bg-black"
                style={{ y: "-50%", left: "50%", x: "-50%", top: "35%" }}
              />
              <motion.span
                variants={VARIANTS.middle}
                className="absolute h-1 w-5 bg-gray-400"
                style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
              />
              <motion.span
                variants={VARIANTS.bottom}
                className="absolute h-1 w-4 bg-black"
                style={{
                  x: "-50%",
                  y: "50%",
                  bottom: "35%",
                  left: "calc(50% + 10px)",
                }}
              />
            </motion.button>
          </MotionConfig>
        </div>

        {/* Desktop Navigation (Left of Logo) */}
        <div className="hidden md:flex items-center gap-4 ">
          <Link
            to="/"
            className="relative text-black hover:text-gray-600 transition-colors duration-300 before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-[2px] before:bg-[#2E4156] before:transition-all before:duration-300 before:ease-in-out hover:before:w-full hover:before:left-0"
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="relative text-black hover:text-gray-600 transition-colors duration-300 before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-[2px] before:bg-[#2E4156] before:transition-all before:duration-300 before:ease-in-out hover:before:w-full hover:before:left-0"
          >
            Shop
          </Link>
          {/* <Link
            to="/about"
            className="relative text-[#fff] hover:text-red-600 transition-colors duration-300 before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-[2px] before:bg-red-400 before:transition-all before:duration-300 before:ease-in-out hover:before:w-full hover:before:left-0"
          >
            About
          </Link> */}
          <Link
            to="/blog"
            className="relative text-black hover:text-gray-600 transition-colors duration-300 before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-[2px] before:bg-[#2E4156] before:transition-all before:duration-300 before:ease-in-out hover:before:w-full hover:before:left-0"
          >
            Blog
          </Link>
        </div>

        {/* Logo in the center */}
        <Link to="/">
        <div className="flex-grow text-center md:text-left">
          <img src={logo} alt="Logo" width={150} className=" mx-auto md:mx-0" />
          {/* <h1 className=" text-yellow-300 ">LUXE BY BUKOLA</h1> */}
        </div>
        </Link>
        

        {/* Cart, Wishlist, and Shop Buttons (right) */}
        <div className="flex items-center space-x-2 text-xl ">
          <Link to="/wishlist" className="text-black  hover:font-bold hover:text-gray-400 transition-colors duration-300">
            <FiHeart  />
          </Link>
          <Link to="/cart" className="text-black  hover:font-bold hover:text-gray-400 transition-colors duration-300">
            <FiShoppingCart  />
          </Link>

          <Link
            to="/shop"
            className="text-black  hover:font-bold hover:text-gray-400  transition-colors duration-300"
          >
            <FiShoppingBag/> 
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden text-[#1a2d42]  py-4">
          <nav className="flex flex-col items-center space-y-4">
            <Link to="/" className="relative text-black hover:text-gray-400 transition-colors duration-300 before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-[2px] before:bg-[#2E4156] before:transition-all before:duration-300 before:ease-in-out hover:before:w-full hover:before:left-0" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>

            <hr className="border-2 border-gray-800 w-[50%]"/>
            <Link to="/shop" className="relative text-black hover:text-gray-400 transition-colors duration-300 before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-[2px] before:bg-[#2E4156] before:transition-all before:duration-300 before:ease-in-out hover:before:w-full hover:before:left-0" onClick={() => setIsMenuOpen(false)}>
              Shop
            </Link>

            <hr className="border-2 border-gray-800  w-[40%]"/>
            <Link to="/faq" className="relative text-black hover:text-gray-400 transition-colors duration-300 before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-[2px] before:bg-[#2E4156] before:transition-all before:duration-300 before:ease-in-out hover:before:w-full hover:before:left-0" onClick={() => setIsMenuOpen(false)}>
              FAQ
            </Link>
            <hr className="border-2 border-gray-800 w-[30%]"/>
            <Link
            to="/blog"
            className="relative text-black hover:text-gray-400 transition-colors duration-300 before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-[2px] before:bg-[#2E4156] before:transition-all before:duration-300 before:ease-in-out hover:before:w-full hover:before:left-0" onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </Link>

         

            {/* <Link to="/collection" className="relative text-[#fff] hover:text-yellow-300 transition-colors duration-300 before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-[2px] before:bg-[#2E4156] before:transition-all before:duration-300 before:ease-in-out hover:before:w-full hover:before:left-0" onClick={() => setIsMenuOpen(false)}>
              Collection
            </Link> */}
            {/* <hr className="border-2 border-gray-800 w-[20%]"/> */}
          </nav>
        </div>
      )}
    </header></>
  );
};

export default Header;

// Variants for Hamburger Animation
const VARIANTS = {
  top: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      top: ["35%", "50%", "50%"],
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      top: ["50%", "50%", "35%"],
    },
  },
  middle: {
    open: {
      rotate: ["0deg", "0deg", "-45deg"],
    },
    closed: {
      rotate: ["-45deg", "0deg", "0deg"],
    },
  },
  bottom: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      bottom: ["35%", "50%", "50%"],
      left: "50%",
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      bottom: ["50%", "50%", "35%"],
      left: "calc(50% + 10px)",
    },
  },
};
