const express = require('express'); //framework for building web apps
const app = express(); //initialising an express application
const port = 4000; //setting port on which server will run

/*
    CORS - allows frontend and backend to run on different domains/ports
*/

const cors = require('cors');
app.use(cors()); //use the CORS middleware for all routes

//Manually set up CORS headers to hande preflight requests 
//and allow specific HTTP methods and headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); //allow requests from any origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); //allow specific HTTP methods
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); //allow specific headers
  next();  
});

//allows json to parse info out of http request
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); //parse URL encoded bodies
app.use(bodyParser.json()); //parse JSON bodies

//connect to mongodb database using Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@martinscluster.w5rtkz0.mongodb.net/DB14'); //replace with own URL

//defines schema for the movie data model
const movieSchema = new mongoose.Schema({
  title:String, //movie title
  year:String, //release year
  poster:String //URL for movie's poster
});

//Create a model based on the schema for interacting with the database
const movieModel = new mongoose.model('myMovies',movieSchema);

//API endpoint to fetch all movies from database
app.get('/api/movies', async (req, res) => {
    const movies = await movieModel.find({}); //fetch all docs in myMovies collection
    res.status(200).json({movies}) //respond with JSON object containing movies
});

//API endpoint to fetch single movie by ID (Comment out?)
app.get('/api/movie/:id', async (req ,res)=>{
  const movie = await movieModel.findById(req.params.id); //find movie by ID
  res.json(movie); //respond with movie doc as JSON
})

//Fetches movie by ID/ used to retrieve current movie details, shown in edit form
app.get('/api/movie/:id', async (req, res) => {
  let movie = await movieModel.findById({ _id: req.params.id });
  res.send(movie); //sends movie as response
});

//Updates movie info - user submits edited data, takes updated details and updates database
app.put('/api/movie/:id', async (req, res) => {
  let movie = await movieModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(movie); //returns movie to confirm change
});

//endpoint to add new movie to database
app.post('/api/movies',async (req, res)=>{
    console.log(req.body.title); //log title of new movie to console
    const {title, year, poster} = req.body; //destructure movie details from the request body

    const newMovie = new movieModel({title, year, poster}); //create new movie doc
    await newMovie.save(); //save movie to database

    res.status(201).json({"message":"Movie Added!",Movie:newMovie}); //respond with a success message and added movie
})

//start express server on specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); //Log server URL
});

// {
//   "Title": "Avengers: Infinity War (server)",
//   "Year": "2018",
//   "imdbID": "tt4154756",
//   "Type": "movie",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
// },
// {
//   "Title": "Captain America: Civil War (server)",
//   "Year": "2016",
//   "imdbID": "tt3498820",
//   "Type": "movie",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
// },
// {
//   "Title": "World War Z (server)",
//   "Year": "2013",
//   "imdbID": "tt0816711",
//   "Type": "movie",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
// }
