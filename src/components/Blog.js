import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Blog({ title, description, imageURL, userName,isUser,id}) {
  const navigate = useNavigate()
  console.log(title,isUser)
  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };
  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:5000/${id}`)
      .catch((err) => console.log(err));
  };
  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/blogs"));
  };
  return (
    <Card style={{ width: '18rem' }}>
      {isUser&&(<>
      <button onClick={handleEdit}>update</button>
      <button onClick={handleDelete}>delete</button></>)}
       <Card.Text>{userName}</Card.Text>
      <Card.Img variant="top" src={imageURL} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
     {description}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}
export default Blog;