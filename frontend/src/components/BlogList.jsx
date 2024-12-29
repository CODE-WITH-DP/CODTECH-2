import React, { useState, useEffect } from "react";
import axios from "../api/api";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [isEditBlog,setIsEditBlog] = useState(false)
  const [blogInfo,setBlogInfo] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");


  useEffect(() => {
   
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/blog-list");
      console.log(response)
      setBlogs(response.data.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };


  const deleteBlog = async (id) => {
    try {
      await axios.delete(`/delete-blog/${id}`);
      // setBlogs(blogs.filter((blog) => blog._id !== id));
      fetchBlogs()
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/update-blog/"+blogInfo._id, { title, description:content });
      setTitle("");
      setContent("");
      window.location.reload(); // Quick refresh
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };


  const renderEditBlock = () => {
    if(isEditBlog) {
      return <div>
 <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Post Blog</button>
    </form>
      </div>
    }
  }

  return (
    <div>
       {renderEditBlock()}
      {blogs && blogs.length > 0 && blogs.map((blog) => (
        // eslint-disable-next-line react/jsx-key
        <div style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }} className="flex flex-col items-left gap-10 px-5 py-5 bg-white rounded-md shadow-md border-2">
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <button onClick={() => deleteBlog(blog._id)} className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-1.5 px-3 rounded-full
          relative flex h-[50px] w-40 items-center justify-center overflow-hidden bg-blue-600 font-medium text-white shadow-2xl transition-all duration-300 before:absolute before:inset-0 before:border-0 before:border-white before:duration-100 before:ease-linear hover:bg-white hover:text-blue-600 hover:shadow-blue-600 hover:before:border-[25px]">
            <span className="relative z-10">Delete</span>
          </button>
         <button onClick={() => {
          setIsEditBlog(true);
          setTitle(blog.title);
          setContent(blog.content);
          setBlogInfo(blog);
         }} className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-1.5 px-3 rounded-full
         relative flex h-[50px] w-40 items-center justify-center overflow-hidden bg-blue-600 font-medium text-white shadow-2xl transition-all duration-300 before:absolute before:inset-0 before:border-0 before:border-white before:duration-100 before:ease-linear hover:bg-white hover:text-blue-600 hover:shadow-blue-600 hover:before:border-[25px]">
          <span className="relative z-10">Update</span>
         </button>
        </div>
      ))}
     
    </div>
  );
};

export default BlogList;
