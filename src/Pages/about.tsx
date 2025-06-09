import React, { useState } from 'react';
import dami1 from "../assets/dami_1.jpg"
import dami2 from "../assets/dami_2.jpg"
import dami3 from "../assets/dami_3.jpg"
import dami4 from "../assets/dami_4.jpg"
import {  FaFacebookSquare, FaTiktok, FaTwitterSquare } from 'react-icons/fa';
const ceo = {
  name: 'BUKOLA',
  role: 'CEO & Founder',
  images: [
    dami4, 
    dami2,dami3,dami1
  ],
};

const AboutBrand: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(ceo.images[0]);

  return (
    <div className="bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Brand Introduction */}
        <section className="mb-12 text-center">
          <h1 className="text-2xl font-extrabold text-gray-500 mb-4">About Jaels Ann</h1>
          <p className="text-sm text-center p-4 text-gray-700 leading-relaxed">
          At <span className='font-semibold'>JAELS ANN</span>, we specialize in high-quality clothing, handcrafted leather footwear for both men and women, as well as unique handmade bags, wallets,belts and jewelries. Our products are meticulously designed to offer durability, style, and comfort, ensuring every piece reflects timeless elegance. JAELS ANN is not just about fashion; it's a lifestyle choice, empowering individuals to express their personality through premium, handcrafted fashion essentials.
          </p>
        </section>

        {/* CEO Section */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-gray-500 mb-8">Meet Our CEO</h2>
          <div className="mb-6">
            {/* Main Image */}
            <div className="w-full max-w-3xl mx-auto">
              <img
                src={selectedImage}
                alt={ceo.name}
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900">{ceo.name}</h3>
          <p className="text-gray-600 text-sm mb-6">{ceo.role}</p>

          <div className='flex gap-3 justify-center text-2xl  text-gray-400  mb-9'>
            {/* Social Media Icons */}
           <div className='hover:text-black'> <FaFacebookSquare /></div>
           <div className='hover:text-black'><FaTwitterSquare /></div> 
           <div className='hover:text-black'> <FaTiktok/></div>
          </div>
          {/* Thumbnail Gallery */}
          <div className="flex justify-center space-x-4">
            {ceo.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setSelectedImage(image)}
                className={`w-20 h-20 rounded-md object-cover cursor-pointer border-2 transition duration-200 hover:scale-105 ${
                  selectedImage === image ? 'border-gray-900' : 'border-gray-300'
                }`}
              />
            ))}
          </div>
        </section>

        {/* Additional Information */}
        <section className="mb-12 mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">More About Us</h2>
          <p className="text-sm text-center p-4 text-gray-700 leading-relaxed">
            Jaels Ann started with a simple goal: to make fashion accessible and enjoyable for everyone. Over the years, we have expanded our offerings to include a diverse range of products, from trendy clothing to elegant accessories. Our commitment to quality, innovation, and customer satisfaction sets us apart in the fashion industry. We look forward to growing and continuing to serve our customers with passion and dedication.
          </p>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Join the Jaels Ann Family</h3>
          <p className="text-gray-700 text-sm mb-6">
            Stay updated with our latest collections and exclusive offers.
          </p>
          <button className="px-6 py-2 bg-black text-white font-medium rounded-md shadow-md hover:bg-gray-400">
            Shop Now
          </button>
        </section>
      </div>
    </div>
  );
};

export default AboutBrand;
