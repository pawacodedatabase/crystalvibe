import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { FaArrowAltCircleRight } from "react-icons/fa";

const JSON_BIN_ID = "68468cf18561e97a50214a90"; // Replace with your JSONBin bin ID
const API_KEY = "$2a$10$yti1izYQ7PKY9IhwxrQiuuIk8TZDdxM6nzYFnduMOvJtKIdyRhBB."; // Replace with your JSONBin API Key
const BASE_URL = `https://api.jsonbin.io/v3/b/${JSON_BIN_ID}`;

interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

const FeaturedBlog: React.FC = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(BASE_URL, {
          headers: { "X-Master-Key": API_KEY },
        });

        const blogs: BlogPost[] = response.data.record || [];
        if (blogs.length > 0) {
          const shuffled = blogs.sort(() => 0.5 - Math.random()).slice(0, 2);
          setFeaturedBlogs(shuffled);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4 ">
        Featured Blogs
      </h2>

      {loading ? (
        // 🛑 Skeleton Loader while fetching data
        <div className="grid gap-6">
          {[1, 2].map((_, index) => (
            <div key={index} className="border p-4 rounded bg-gray-100 animate-pulse">
              <div className="w-24 h-10 bg-gray-300 mx-auto mb-3 rounded"></div>
              <div className="h-4 bg-gray-300 w-3/4 mb-2 rounded"></div>
              <div className="h-3 bg-gray-300 w-full mb-2 rounded"></div>
              <div className="h-3 bg-gray-300 w-5/6 mb-2 rounded"></div>
              <div className="h-3 bg-gray-300 w-4/6 mb-2 rounded"></div>
            </div>
          ))}
        </div>
      ) : featuredBlogs.length === 0 ? (
        <p className="text-gray-500 text-center">No featured blogs available.</p>
      ) : (
        <div className="grid gap-6">
          {featuredBlogs.map((blog) => (
            
            <div key={blog.id} className="border p-4 rounded bg-[#fff]">
             <Link to={`/blog/${blog.id}`}>
             
             <img src={logo} alt="Blog Logo" className="w-24 mx-auto mb-3" />
              <h4 className="text-xl text-blackfont-bold flex items-center gap-2">
                <FaArrowAltCircleRight className="text-blue-500" />
                {blog.title}
              </h4>
              <p className="text-sm text-gray-500 mt-3">
                {blog.content.slice(0, 120)}...
                <Link to={`/blog/${blog.id}`} className="font-bold text-blue-500  underline ml-1">
                  Read More
                </Link>
              </p>
              </Link> 
              <div className="flex justify-between">
                 <p className="text-xs text-gray-500 mt-2">
                Author: <span className="font-bold">{blog.author || "Unknown"} </span>
              </p> <p className="text-xs mt-2 text-gray-500">at {blog.date}</p>
              </div>
             
            </div>
          ))}
          
          <Link to={'/blog'} className="m-auto">  <button className="bg-black text-white px-3 py-2 w-[150px] m-auto rounded hover:border-2 hover:border-black hover:bg-white hover:text-black">View all blogs</button>
  
          </Link>
              </div>

        
      )}
    </div>
  );
};

export default FeaturedBlog;
