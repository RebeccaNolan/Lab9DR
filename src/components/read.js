import Movies from "./movies";
import { useEffect, useState } from "react";
import axios from "axios";

const Read = () => {

  const [movies, setMovies] = useState([]);

  const Reload = () => {
    console.log("Reloading movie data...");
    axios.get('http://localhost:4000/api/movies')
        .then((response) => {
          setMovies(response.data.movies);
        })
        .catch((error) => {
            console.error("Error reloading data:", error);
        });
};

useEffect(() => {
    Reload();
}, []);

return (
    <div>
        <h2>Movie List</h2>
        <Movies myMovies={movies} ReloadData={Reload} />
    </div>
);
}

export default Read;