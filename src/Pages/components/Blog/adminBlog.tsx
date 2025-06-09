import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JSON_BIN_ID = "68468cf18561e97a50214a90";
const API_KEY = "$2a$10$yti1izYQ7PKY9IhwxrQiuuIk8TZDdxM6nzYFnduMOvJtKIdyRhBB.";
const BASE_URL = `https://api.jsonbin.io/v3/b/${JSON_BIN_ID}`;

interface BlogPost {
  id: number;
  title: string;
  author: string;
  content: string;
  date: string;
}

const AdminBlog: React.FC = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const navigate = useNavigate();
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
      }
    };
    fetchBlogs();
  }, []);

  // Handle Add or Update Blog
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author || !content)
      return alert("Title, Author, and Content are required!");

    let updatedBlogs = blogs;

    if (editId !== null) {
      // Edit existing blog
      updatedBlogs = blogs.map((blog) =>
        blog.id === editId ? { ...blog, title, author, content } : blog
      );
      setEditId(null);
    } else {
      // Add new blog
      const newBlog: BlogPost = {
        id: Date.now(),
        title,
        author,
        content,
        date: new Date().toISOString(),
      };
      updatedBlogs = [...blogs, newBlog];
    }

    try {
      await axios.put(BASE_URL, updatedBlogs, {
        headers: { "X-Master-Key": API_KEY, "Content-Type": "application/json" },
      });
      setBlogs(updatedBlogs);
      setTitle("");
      setAuthor("");
      setContent("");
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  // Handle Delete Blog
  const handleDelete = async (id: number) => {
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);
    try {
      await axios.put(BASE_URL, updatedBlogs, {
        headers: { "X-Master-Key": API_KEY, "Content-Type": "application/json" },
      });
      setBlogs(updatedBlogs);
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  // Handle Edit Blog
  const handleEdit = (blog: BlogPost) => {
    setTitle(blog.title);
    setAuthor(blog.author);
    setContent(blog.content);
    setEditId(blog.id);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center text-black mb-6">
        Admin Blog Panel
      </h2>
     <button onClick={()=> navigate('../blog')} className="w-full bg-black text-white py-2 font-semibold hover:bg-gray-800 transition-all">Check Blog Page</button>
 
      {/* Blog Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-6 rounded-lg shadow-md mb-8"
      >

        <p className="text-2xl font-semibold text-center text-black mb-6">Add New Blog</p>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Blog Title
          </label>
          <input
            type="text"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Author Name
          </label>
          <input
            type="text"
            placeholder="Enter author name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Blog Content
          </label>
          <textarea
            placeholder="Enter blog content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-purple-400 outline-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 font-semibold hover:bg-gray-800 transition-all"
        >
          {editId !== null ? "Update Blog" : "Publish Blog"}
        </button>
      </form>

      {/* Blog List */}
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Existing Blogs:</h3>
      {blogs.length === 0 ? (
        <p className="text-gray-500 text-center">No blog posts yet.</p>
      ) : (
        <div className="space-y-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="border border-gray-300 p-6 rounded-lg bg-gray-50 shadow-sm"
            >
              <h4 className="text-xl font-bold text-gray-900">{blog.title}</h4>
              <p className="text-sm text-gray-500">
                By {blog.author} - {new Date(blog.date).toLocaleDateString()}
              </p>
              <p className="mt-3 text-gray-700">{blog.content}</p>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleEdit(blog)}
                  className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition-all"
                >
                  Delete
                </button>
              </div>

             
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default AdminBlog;
