import { useEffect } from "react"; //hook for side effects
import Card from 'react-bootstrap/Card'; //bootstrap componenet for styling
//import link 
import { Link } from "react-router-dom"; //react router componenet for navigation
import axios from "axios";
import Button from 'react-bootstrap/Button';

//MovieItem functional component
const MovieItem = (props)=> {

  //useEffect to log movie data when mymovie prop changes
  useEffect(() => {
    console.log("Movie Item:", props.mymovie); //log movie for debugging
  }, [props.mymovie]); // Only run this effect when the mymovie prop changes

  const handleDelete = (e) => {
    e.preventDefault();
    axios.delete('http://localhost:4000/api/movie/' + props.mymovie._id)
        .then(() => {
            props.Reload(); // Refresh the movie list after deletion
        })
        .catch((error) => {
            console.error("Error deleting movie:", error);
        });
  };
  //form to display movie
  return (
    <div>
      <Card>
        <Card.Header>{props.mymovie.title}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <img src={props.mymovie.poster} alt={props.mymovie.title} />
            <footer>{props.mymovie.year}</footer>
          </blockquote>
        </Card.Body>
        <Link to={"/edit/" + props.mymovie._id} className="btn btn-primary">Edit</Link>
      </Card>
      <Button variant="danger" onClick={handleDelete}>Delete</Button>
    </div>
  );
}


export default MovieItem;
