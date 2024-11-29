import MovieItem from "./movieitem";

//Movies functional componenet to render movie list
function Movies(props) {
    return (
        <>
        {/*Map over myMovies array as a prop and render a MovieItem for each movie*/}
            {props.myMovies.map((movie) => (
                <MovieItem
                    mymovie={movie} //pass current movie object as a prop
                    key={movie._id} //use the movie's unique ID as key for efficient rendering
                    Reload={props.ReloadData} //Pass reloadData function ro refresh movie data
                />
            ))}
        </>
    );
}

export default Movies;
