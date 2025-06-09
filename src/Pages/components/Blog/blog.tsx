import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.jpg";
import { FaArrowAltCircleRight } from "react-icons/fa";
// import BlogBanner from "./blogBanner";

const JSON_BIN_ID = "681c6b418960c979a5956f7d"; // Replace with your JSONBin bin ID
const API_KEY = "$2a$10$qrNF.b6EVU4HN2N8Dvegaez/mp2L7ZO9EjET5ujsIiWNSfuOyB.mu"; // Replace with your JSONBin API Key
const BASE_URL = `https://api.jsonbin.io/v3/b/${JSON_BIN_ID}`;

interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs from JSONBin
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(BASE_URL, {
          headers: { "X-Master-Key": API_KEY },
        });
        setBlogs(response.data.record || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
    {/* <BlogBanner/> */}
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-4">Blog Section</h2>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="animate-pulse border p-4 rounded bg-gray-100">
                <div className="w-32 h-8 bg-gray-300 rounded mb-2"></div>
                <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-1/2 h-4 bg-gray-300 rounded mb-2"></div>
              </div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <p className="text-gray-500 text-center">No blogs available.</p>
        ) : (
          <>
          
          <div className="space-y-6">
            {blogs.map((blog) => (
              <div key={blog.id} className="border p-4 rounded bg-[#000]">
                <img src={logo} alt="" width={50} />
                <h4 className="text-xl text-yellow-300 mt-3 font-bold flex gap-2">
                  <FaArrowAltCircleRight className="text-yellow-400 mt-1" />
                  {blog.title}
                </h4>
                <p className="text-sm text-gray-300 mt-3">
                  {blog.content.slice(0, 150)}...{" "}
                  <Link to={`/blog/${blog.id}`} className="font-bold text-yellow-300">
                    Read More
                  </Link>
                </p>
                <div className="flex justify-between">
                 <p className="text-xs mt-2 text-gray-300">
                Author: <span className="font-bold">{blog.author || "Unknown"} </span>
              </p> <p className="text-xs mt-2 text-gray-300">at {blog.date}</p>
              </div>
              </div>
            ))}
          </div></>
        )}
      </div>
    </>
  );
};

export default Blog;
