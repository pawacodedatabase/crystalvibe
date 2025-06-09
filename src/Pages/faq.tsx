import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReviewComponent from './components/review';

const faqs = [
  {
    question: "What makes Crystal Vibe Luxury unique?",
    answer:
      "Crystal Vibe stands out for its blend of elegance, quality, and affordability. Each bag and pair of shoes is carefully designed to empower women with style and confidence.",
  },
  {
    question: "How do you ensure the quality of your products?",
    answer:
      "We source only high-quality materials and work with skilled artisans to create stylish, durable bags and shoes. Every item is thoroughly inspected to meet our luxury standards.",
  },
  {
    question: "Is Crystal Vibe committed to sustainability?",
    answer:
      "Yes, we are. We take conscious steps towards sustainability by using ethically sourced materials and minimizing waste in our production process.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for unused items in their original packaging. If you're not satisfied, we're here to help make it right.",
  },
  {
    question: "Why should I trust Crystal Vibe Luxury?",
    answer:
      "Crystal Vibe has earned the trust of stylish women nationwide through our dedication to quality, customer service, and timeless designs.",
  },
  {
    question: "Do you offer custom or limited edition designs?",
    answer:
      "Yes, we occasionally release exclusive collections and limited-edition pieces. Be sure to follow us on social media or subscribe to our newsletter for updates.",
  },
  {
    question: "How do I know my shoe size will fit?",
    answer:
      "We provide a detailed size guide on each product page. If you’re unsure, our support team is happy to help you choose the perfect fit.",
  },
  {
    question: "Can I place a bulk or wholesale order?",
    answer:
      "Absolutely! We welcome bulk and wholesale inquiries. Please contact us directly for tailored pricing and order details.",
  },
];

const FAQAccordion: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <div className="p-8 bg-gray-100 min-h-screen">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 font-luxe">Why Choose Crystal Vibe Luxury?</h1>
          <p className="mt-4 text-gray-600">
            Explore how Crystal Vibe blends quality, elegance, and confidence into every bag and shoe we craft for the modern woman.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-300 mb-4 bg-white rounded-lg shadow-lg"
            >
              {/* Question */}
              <div
                onClick={() => toggleAccordion(index)}
                className="flex justify-between items-center p-5 cursor-pointer transition duration-300 hover:bg-gray-50"
              >
                <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                <motion.div
                  className="text-gray-500"
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                >
                  ▼
                </motion.div>
              </div>

              {/* Answer */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    className="px-5 pb-5 text-gray-600"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
      <ReviewComponent />
    </>
  );
};

export default FAQAccordion;
