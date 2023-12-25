import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import Header from "./Header";
import './Home.css';
const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/blog")
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);
  console.log(blogs);
  return (
    <div className="styling">
      <Header/>
      <div className='container'>
    <div className='row'>
       {blogs &&
        blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            isUser={localStorage.getItem("userId")===blog.user._id}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={blog.user.username}
          
          />
        ))}
        </div>
        </div>
    </div>
  )
}

export default Blogs
