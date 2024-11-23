
import React from 'react'; //react library for building componenets
import { useParams } from 'react-router-dom'; //hook to access route parameters
import { useState, useEffect } from 'react'; //react hooks for managing state and sife effects
import axios from 'axios'; //axiod library for making HTTP requests
import { useNavigate } from "react-router-dom"; //hook to navigate to different routes

//Exporting the edit componenet
export default function Edit(props) {
  //extract id param from the route using useParams hooks
  let { id } = useParams();
  //variables to store movie details
  const [title, setTitle] = useState(""); //movie title
  const [year, setYear] = useState(""); //movie year
  const [poster, setPoster] = useState(""); //movie poster
  const navigate = useNavigate(); //hook to navigate to other routes

  //useEffect hook to fetch movie details from server when component is mounted or id changes
useEffect(() => {
    axios.get('http://localhost:4000/api/movie/' + id) //fetch movie by ID
        .then((response) => {
          //populate state variables with response data
            setTitle(response.data.title);
            setYear(response.data.year);
            setPoster(response.data.poster);
        })
        .catch((error) => {
            console.log(error); //log errors to console
        });
}, [id]); //dependency array ensures effect runs when ID changes

  //event handler for form submission
const handleSubmit = (event) => {
    event.preventDefault(); //prevent default form submission behaviour
    const newMovie = { id, title, year, poster };
  //sending PUT request to update movie on the server
    axios.put('http://localhost:4000/api/movie/' + id, newMovie)
        .then((res) => {
            console.log(res.data); //log servers response
            navigate('/read'); //redirect to read page after update
        });
}

  //for updating the form
return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Movie Title: </label>
                <input type="text" 
                className="form-control" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Release Year: </label>
                <input type="text" 
                className="form-control" 
                value={year} 
                onChange={(e) => setYear(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Poster URL: </label>
                <input type="text" 
                className="form-control" 
                value={poster} 
                onChange={(e) => setPoster(e.target.value)} />
            </div>
            <div className="form-group">
                <input type="submit" value="Edit Movie" className="btn btn-primary" />
            </div>
        </form>
    </div>
);
}
