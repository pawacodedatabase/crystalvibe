import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import img from "../../../assets/new.jpg";
import fav from "../../../assets/logo.jpg";
import FeaturedBlog from "./featuredBlog";

const JSON_BIN_ID = "68468cf18561e97a50214a90";
const API_KEY = "$2a$10$yti1izYQ7PKY9IhwxrQiuuIk8TZDdxM6nzYFnduMOvJtKIdyRhBB.";
const BASE_URL = `https://api.jsonbin.io/v3/b/${JSON_BIN_ID}`;

const BlogDetail: React.FC = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  useEffect(() => {
    axios
      .get(BASE_URL, { headers: { "X-Master-Key": API_KEY } })
      .then((res) => {
        const foundBlog = res.data.record.find((b: any) => b.id === Number(id));
        if (foundBlog) {
          setBlog(foundBlog);
          setLikes(foundBlog.likes || 0);
          setDislikes(foundBlog.dislikes || 0);
        }
      })
      .catch((err) => console.error("Error:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg animate-pulse">
        <div className="h-6 bg-gray-300 w-3/4 mb-4 rounded"></div>
        <div className="h-4 bg-gray-300 w-1/2 mb-2 rounded"></div>
        <div className="h-64 bg-gray-300 mb-4 rounded"></div>
        <div className="h-4 bg-gray-300 w-full mb-2 rounded"></div>
        <div className="h-4 bg-gray-300 w-5/6 mb-2 rounded"></div>
        <div className="h-4 bg-gray-300 w-4/6 mb-2 rounded"></div>
      </div>
    );
  }

  return (
    <>
    
      <div className="text-sm font-semibold ml-4 mt-8">
        <Link to="/">Home</Link> | <Link to="/blog">Blog</Link> | {blog.title}
      </div>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl text-center font-bold mt-4 mb-8">{blog.title}</h1>

        <div className="flex justify-between mb-6">
        <div className="flex items-center mt-2 text-xs">
  <p className="font-bold">Author:</p>
  <img
    src={fav}
    className="h-4 w-4 ml-2 mr-2 rounded-full border-2 border-black object-cover"
    alt="Author"
  />
  <span className="font-bold">{blog.author || "Unknown"}</span>
</div>


          <div>
            <p className="text-xs">at {blog.date}</p>
          </div>
        </div>
        <hr />
        <img
          src={blog.image || img}
          alt={blog.title}
          className="w-full h-[600px] rounded-lg"
        />
        <div className="text-gray-700 mt-4 space-y-4 p-9">
          {blog.content.split("\n").map((paragraph: string, index: number) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="flex items-center gap-6 mt-6">
          <button
            onClick={() => setLikes(likes + 1)}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            <FaThumbsUp /> {likes}
          </button>
          <button
            onClick={() => setDislikes(dislikes + 1)}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            <FaThumbsDown /> {dislikes}
          </button>
        </div>
        <div className="mt-6 flex items-center gap-4">
          <span className="text-gray-600 font-semibold">Share:</span>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 text-2xl"
          >
            <FaFacebook />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${blog.title}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 text-2xl"
          >
            <FaTwitter />
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${blog.title} - ${window.location.href}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 text-2xl"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
     <FeaturedBlog/>
    </>
  );
};

export default BlogDetail;
