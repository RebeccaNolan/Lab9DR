import Movies from "./movies"; //Import movies componenet
import { useEffect, useState } from "react"; //react hooks
import axios from "axios"; //for making HTTP requests

//functional component to fetch and display movie list
const Read =
  () => {

  //state to store the array of movies
  const [movies, setMovies] = useState([]);

    //function to reload movie data from server
  const Reload = () => {
    console.log("Reloading movie data..."); //log to debug when reload is called
    axios.get('http://localhost:4000/api/movies') //send get request to fetch movies
        .then((response) => {
          setMovies(response.data.movies); //update state with retrieved movies
        })
        .catch((error) => {
            console.error("Error reloading data:", error); //log errors
        });
};

 //hook to load movie data when the component mounts
useEffect(() => {
    Reload(); //call reload to fetch movie data initially
}, []); //empty dependency array ensures only runs once when component mounts

//renders movie list
return (
    <div>
        <h2>Movie List</h2>
  //Render Movies componenet, passing the movies data and reload function as props
        <Movies myMovies={movies} ReloadData={Reload} />
    </div>
);
}

export default Read; //export Read componenet 
