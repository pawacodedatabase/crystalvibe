import React from 'react';
import { Link } from 'react-router-dom';

const LegSizeGuide: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-2xl font-thin text-center mb-6 text-black">How to Measure Your Leg Size</h1>

      <div className="text-sm text-center mb-6 text-gray-700">
        <p>
          Measuring your leg size correctly is essential for ensuring a perfect fit for your
          shoes and pants. Follow these simple steps to measure your leg size accurately:
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-thin text-center  text-gray-900 mb-4">Step-by-Step Guide</h2>
        <ol className="list-disc pl-8 space-y-2 text-gray-700 text-sm ">
          <li>
            <strong>Step 1:</strong> Stand straight with your feet flat on the ground.
          </li>
          <li>
            <strong>Step 2:</strong> Use a flexible measuring tape and measure from the top of your
            inner thigh down to your ankle. Ensure the tape is snug but not tight.
          </li>
          <li>
            <strong>Step 3:</strong> To measure the inseam for pants, measure from the top of your
            inner leg down to your ankle.
          </li>
          <li>
            <strong>Step 4:</strong> For shoes, measure the length of your foot from the heel to the
            tip of your longest toe.
          </li>
        </ol>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-thin text-center text-gray-900 mb-4 ">Watch the Video Tutorial</h2>
        <div className="flex justify-center mb-6">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/-55OxDGmTL8?si=-O4y4DvOEs9Osw7I"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="text-cm  text-center mb-6 text-gray-700 ">
        <p>
          Now that you've measured your leg size, you're ready to shop for your perfect pair of shoes
           Remember, accurate measurements help ensure better fitting and comfort.
        </p>
      </div>

      <div className="text-center">
        <Link
          to="/products"
          className="inline-block px-3 py-3 border-2 border-black bg-black text-yellow-200 hover:bg-white hover:text-black rounded-md   transition duration-300"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default LegSizeGuide;
