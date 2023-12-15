import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Blog({ title, description, imageURL, userName }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imageURL} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{userName}</Card.Text>
        <Card.Text>
     {description}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}
export default Blog;