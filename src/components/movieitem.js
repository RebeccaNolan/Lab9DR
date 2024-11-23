import { useEffect } from "react"; //hook for side effects
import Card from 'react-bootstrap/Card'; //bootstrap componenet for styling
//import link 
import { Link } from "react-router-dom"; //react router componenet for navigation

//MovieItem functional component
const MovieItem = (props)=> {
  //useEffect to log movie data when mymovie prop changes
  useEffect(() => {
    console.log("Movie Item:", props.mymovie); //log movie for debugging
  }, [props.mymovie]); // Only run this effect when the mymovie prop changes

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
        {/*Add comment here*/}
        <Link to={"/edit/" + props.mymovie._id} className="btn btn-primary">Edit</Link>
      </Card>
    </div>
  );
}

export default MovieItem;
