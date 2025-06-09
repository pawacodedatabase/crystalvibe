import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import banner1 from '../../assets/dami_4.jpg';
import banner2 from '../../assets/br2.jpg';
import banner3 from '../../assets/dami_1.jpg';
import banner4 from '../../assets/hon.jpg';

const slides = [
  {
    id: 1,
    title: "Walk with Grace, Shine with CrystalVibe",
    subtitle: "Explore our signature footwear—crafted for elegance, comfort, and timeless sophistication.",
    buttonText: "SHOP NOW",
    image: banner1,
  },
  {
    id: 2,
    title: "Iconic Bags for the Modern Muse",
    subtitle: "Elevate every outfit with CrystalVibe Luxury’s curated collection of exquisite bags.",
    buttonText: "SHOP NOW",
    image: banner2,
  },
  {
    id: 3,
    title: "Radiate Elegance with Every Sparkle",
    subtitle: "Indulge in our fine jewelry—crafted to make every moment feel luxurious.",
    buttonText: "SHOP NOW",
    image: banner3,
  },
  {
    id: 4,
    title: "Luxury That Moves with You",
    subtitle: "From chic heels to stylish accessories, CrystalVibe Luxury merges elegance with everyday ease.",
    buttonText: "SHOP NOW",
    image: banner4,
  },
];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Left Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>

          {/* Text Content */}
          <div className="relative z-20 flex items-center h-full px-8 md:px-24">
            <div className="max-w-xl text-black space-y-6">
              <h1 className="text-3xl md:text-6xl font-serif font-semibold leading-tight">
                {slide.title}
              </h1>
              <p className="text-base md:text-lg font-light">{slide.subtitle}</p>
              <Link
                to="/shop"
                className="inline-block bg-black text-white  text-sm font-semibold px-6 py-3 mt-4 rounded hover:border-2 hover:border-black hover:text-black hover:bg-white transition"
              >
                {slide.buttonText}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
