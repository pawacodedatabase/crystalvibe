import React from "react";
import modelImg from "../../assets/hfm.jpg"; // replace with your actual image path

const OccasionEdit: React.FC = () => {
  return (
    <section className="bg-gray-100 w-full">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Text Section */}
        <div className="w-full md:w-1/2 p-8 md:p-16 text-center md:text-left space-y-4">
          <h2 className="text-2xl md:text-3xl font-serif text-black">
            CrystalVibe Luxury
          </h2>
          <hr className="w-12 border-black mx-auto md:mx-0" />
          <p className="text-black text-base md:text-lg">Make a lasting impression.</p>
          <p className="text-black font-semibold text-base md:text-lg">
            Shop Quality Items
          </p>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src={modelImg}
            alt="Occasion Edit"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default OccasionEdit;
