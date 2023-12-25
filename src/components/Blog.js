import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText,MDBCardImage} from 'mdb-react-ui-kit';

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
    <>
   {/* <Card style={{ width: '18rem' }}>
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
      </Card> */}
       <div className='col-md-6'>
            <MDBCard className='mb-3'>
        <MDBCardImage position='top' src={imageURL}  alt='...' />
        <MDBCardBody>
          <MDBCardTitle>{title}</MDBCardTitle>
          <MDBCardText>
          {description}
          </MDBCardText>
          <MDBCardText>
            <small className='text-muted'>{userName}</small>
          </MDBCardText>
          {isUser&&(<>
        <div style={{'display':'flex','gap':'20px','justifyContent':'flex-end'}}>
      <button onClick={handleEdit} style={{'borderRadius':'10px','width':'100px','height':'40px','backgroundColor':'#0080ff','color':'white','borderColor':'white'}}>update</button>
      <button onClick={handleDelete}  style={{'borderRadius':'10px','width':'100px','height':'40px','backgroundColor':'#0080ff','color':'white','borderColor':'white'}}>delete</button></div></>)}
        </MDBCardBody>
      </MDBCard>
      </div>
   </>
  );
}
export default Blog;