import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Addblog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.imageURL,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs)
    sendRequest()
    .then((data) => console.log(data))
    .then(() => navigate("/blogs"));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Write Your Travel Experience</h1>
        <div className="form-outline mb-4"></div>
        <div className="form-outline mb-4"></div>
        <div className="form-outline mb-4">
          <div className="form-outline mb-4">
            <label>title:<input type='text' name='title' onChange={handleChange} value={inputs.title} /></label>
          </div>
          <textarea style={{ width: '600px', height: '400px' }} name='description' onChange={handleChange} value={inputs.description} autocomplete="off"></textarea>
        </div>
        <div className="form-outline mb-4">
          <label className="custom-file-upload">
            image:<input type="text" name='imageURL' onChange={handleChange} value={inputs.imageURL}/>
          </label>
          <br />
        </div>
        <button type="submit" className="btn btn-danger btn-block mb-4">Submit</button>
      </form>
    </div>
  )
}

export default Addblog
