import React, { useState } from "react";
import axios from "../api/api";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/add-blog", { title, description:content });
      setTitle("");
      setContent("");
      window.location.reload(); // Quick refresh
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px"}}
    className="flex flex-col items-left gap-10 px-5 py-5 bg-white rounded-md shadow-md border-2">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="rounded-md shadow-md px-1 py-3
        "
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className="rounded-md shadow-md text px-1 py-3"
      />
      <button type="submit"
      className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full relative flex h-[50px] w-40 items-center justify-center overflow-hidden bg-blue-600 font-medium text-white shadow-2xl transition-all duration-300 before:absolute before:inset-0 before:border-0 before:border-white before:duration-100 before:ease-linear hover:bg-white hover:text-blue-600 hover:shadow-blue-600 hover:before:border-[25px]">
        <span className="relative z-10">Post Blog</span>
      </button>
    </form>
  );
};

export default BlogForm;