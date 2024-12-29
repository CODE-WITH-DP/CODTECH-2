import React from "react";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <Header />
      <h1 className="text-2xl font-semibold gap-3 mt-3 mb-3">Add Blog Here :</h1>
      
      <BlogForm />
      <BlogList />
      <Footer />
    </div>
  );
}

export default App;
