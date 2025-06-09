import { motion } from "framer-motion";
import IMG1 from "../../assets/dami_3.jpg";
import IMG2 from "../../assets/dami_4.jpg";

const FashionComponent = () => {
  return (
    <motion.div
      className="flex flex-col md:flex-row items-start gap-8 p-8"
      initial={{ opacity: 0, y: 50 }} // Initial hidden state
      whileInView={{ opacity: 1, y: 0 }} // Animate when in view
      viewport={{ once: true, amount: 0.2 }} // Trigger animation once when 20% of the section is visible
      transition={{ duration: 0.8, ease: "easeOut" }} // Smooth animation
    >
      {/* Left Section */}
      <div className="flex-1 space-y-16">
        {/* First Text Block */}
        <div className="text-left space-y-4">
          <h2 className="font-bold text-lg tracking-wide font-riss">
            At Riss Luxury
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We believe that fashion is the ultimate expression of individuality
            and refined artistry. Our mission is to craft exquisite garments
            that epitomize sophistication and elevate the wearer’s sense of
            style to unparalleled heights.
          </p>
        </div>

        {/* Second Text Block */}
        <div className="text-center space-y-4">
          <p className="text-gray-700 leading-relaxed">
            With an unwavering commitment to craftsmanship and meticulous
            attention to detail, every piece in our collection is a true
            masterpiece, designed to exude elegance and timeless luxury.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col gap-4 relative">
        {/* Large Image */}
        <motion.img
          src={IMG1}
          alt="High Fashion Model"
          className="w-full h-auto rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }} // Initial hidden state
          whileInView={{ opacity: 1, scale: 1 }} // Animate when in view
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />

        {/* Small Image */}
        <motion.img
          src={IMG2}
          alt="High Fashion Models"
          className="w-1/2 h-auto rounded-lg shadow-lg self-end"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        />
      </div>
    </motion.div>
  );
};

export default FashionComponent;
