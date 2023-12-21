import React,{useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
const Blogdetail = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const [blog,setBlog]=useState()
  const id =useParams().id
  console.log(id)
  const fetchDetails = async()=>{
    const res = await axios.get(`http://localhost:5000/${id}`)
    .catch((err)=>console.log(err))
    const data = await res.data;
    return data
  }
  useEffect(()=>{
    fetchDetails().then((data) => {
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
        imageURL:data.blog.image
      });
    });
  },[id])
  console.log(blog)

  const sendRequest = async()=>{
    const res = await axios.put(`http://localhost:5000/update/${id}`,{
      title:inputs.title,
      description:inputs.description,
      image:inputs.imageURL
    }).catch(err=>console.log(err));
    const data = await res.data
    return data
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(inputs)
    sendRequest().then(data=>console.log(data)).then(()=>navigate("/myBlogs"))
  }
  return (
    <div>
      {inputs && 
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
      </form> }
    </div>
  )
}

export default Blogdetail
