import React, { useState, useEffect } from "react";
import axios from "axios"; // To handle Telegram API calls
import { FaUser, FaPhoneAlt, FaStar, FaTrashAlt } from "react-icons/fa"; // For icon usage

const ReviewComponent: React.FC = () => {
  const [reviews, setReviews] = useState<{ name: string; number: string; avatar: string; comment: string; rating: number }[]>([]);
  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("avatar1");
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  // Load reviews from localStorage on component mount
  useEffect(() => {
    const savedReviews = localStorage.getItem("rissLuxuryReviews");
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, []);

  // Save reviews to localStorage whenever reviews change
  useEffect(() => {
    localStorage.setItem("rissLuxuryReviews", JSON.stringify(reviews));
  }, [reviews]);

  // Send review details to Telegram bot
  const sendReviewToTelegram = async (name: string, number: string, avatar: string, comment: string, rating: number) => {
    const message = `New Review:
    Name: ${name}
    Number: ${number}
    Avatar: ${avatar}
    Review: ${comment}
    Rating: ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}`;

    const telegramApiUrl = `https://api.telegram.org/bot8119231817:AAGAmxzBGY0vBPeVFM2hEEBbXkoAUGxm_HE/sendMessage`;
    const chatId = '6837437455';

    try {
      await axios.post(telegramApiUrl, {
        chat_id: chatId,
        text: message,
      });
    } catch (error) {
      console.error("Error sending message to Telegram", error);
    }
  };

  // Handle form submission
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !name.trim() || !number.trim()) return; // Prevent adding empty comments or missing fields

    const newReview = { name, number, avatar, comment, rating };
    setReviews([newReview, ...reviews]); // Add new review to the top
    sendReviewToTelegram(name, number, avatar, comment, rating); // Send review to Telegram
    setName(""); // Clear input fields
    setNumber("");
    setComment("");
    setRating(0); // Clear rating
  };

  // Handle review deletion
  const handleDeleteReview = (index: number) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setReviews(updatedReviews);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-xl mt-8">
      <h1 className="text-3xl font-riss text-center text-gray-800 mb-6 ">Leave a Review</h1>

      <hr /> <hr className="mb-3 font-bold" />


      {/* Review Form */}
      <form onSubmit={handleAddReview} className="space-y-6">
        <div className=" space-x-6">
          {/* Avatar Selector */}
          <div className="flex flex-col items-center space-y-2">
            {/* <label className="text-lg font-riss text-gray-700">Pick an Avatar:</label> */}
            <div className="flex gap-2">
              {["avatar1", "avatar2", "avatar3"].map((avatarOption) => (
                <img
                  key={avatarOption}
                  src={`https://api.dicebear.com/6.x/thumbs/png?seed=${avatarOption}`}
                  alt={avatarOption}
                  className={`w-14 h-14 rounded-full cursor-pointer border-2 transition-all ${
                    avatar === avatarOption ? "border-blue-500" : "border-transparent"
                  }`}
                  onClick={() => setAvatar(avatarOption)}
                />
              ))}
            </div>
          </div>

          {/* Name and Phone Inputs */}
          <div className="flex-1 space-y-4 mt-7">
            <div className="flex items-center font-riss border-b-4 border-black rounded-lg p-2">
              <FaUser className="text-black mr-3" />
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 focus:outline-none "
              />
            </div>

            <div className="flex items-center border-b-4  border-black font-riss rounded-lg p-2">
              <FaPhoneAlt className="text-black mr-3" />
              <input
                type="text"
                placeholder="Your Phone Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full p-2 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Comment Input */}
        <div className="flex items-center border-b-4 border-black rounded-lg p-2">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            className="w-full h-24 p-2 outline-none"
          />
        </div>

        {/* Rating */}
        <div className="flex justify-center gap-1 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              onClick={() => setRating(star)}
              className={`cursor-pointer text-xl ${rating >= star ? "text-yellow-500" : "text-gray-300"}`}
            />
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-white hover:border-2 hover:border-black hover:text-black transition duration-300"
          >
            Submit Review
          </button>
        </div>
      </form>

      {/* Display Reviews */}
      <div className="mt-12 ">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 font-riss text-center">Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="flex items-start gap-4 p-4 mb-6 bg-[#000] rounded-lg shadow-sm">
              <img
                src={`https://api.dicebear.com/6.x/thumbs/png?seed=${review.avatar}`}
                alt={review.avatar}
                className="w-16 h-16 rounded-full"
              />
              <div className="flex-1">
                <p className="text-[#fff] font-semibold font-sans">{review.name} (Rating: {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)})</p>
                <p className="text-gray-400">{review.comment}</p>
                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteReview(index)}
                  className="text-red-500 hover:text-red-700 mt-2"
                >
                  <FaTrashAlt /> 
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No reviews yet. Be the first to add one!</p>
        )}
      </div>
    </div>
  );
};

export default ReviewComponent;
