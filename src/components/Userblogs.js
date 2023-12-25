import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import Header from "./Header";
const UserBlogs = () => {
  const [blogs, setBlogs] = useState("");
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:5000/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs.blogs));
  }, []);
  console.log(blogs);
  return (
    <div>
      <Header/>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            title={blog.title}
            isUser={true}
            description={blog.description}
            imageURL={blog.image}
            userName={blog.user.username}
          />
        ))}
    </div>
  );
};

export default UserBlogs;