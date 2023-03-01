import React, { useState, useEffect } from "react";

import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";
import {API_KEY} from "./config";

const API_URL = `http://www.omdbapi.com?apikey=${API_KEY}`;

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    searchMovies("Batman");
  }, []);

//   useEffect(() => {
//     searchMovies('Batman');
//     const sortArray = type => {
//         const types = {
//             year: 'year',
//             title: 'title',
//             type: 'type',
//         };
//         const sortProperty = types[type];
//         const sorted = [].sort((a,b) => b[sortProperty] - a[sortProperty]);
//         setMovies(sorted);
//     };
//     sortArray(sortType);
// }, [sortType]);


  const sortArray = (type,movies) => {
      const types = {
            Year: 'Year',
            Title: 'Title',
            Type: 'Type',
      };
      const sortProperty = types[type];
      console.log(types[type])

      movies = movies.sort((a, b) => {
        if (a[sortProperty] < b[sortProperty]) {
          return -1;
        }
      });

      // console.log("sorted by years")

      console.log(movies)
      setMovies(movies);
    };
    


  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    
    console.log(data.Search);

    // console.log(sortType);

    setMovies(data.Search);
  };

  return (
    <div className="app">
      <h1>MovieZone</h1>

      <div className="search">
        <input
        
        onKeyDown={(e)=>{
          if (e.key === "Enter") {
            searchMovies(e.target.value)
          }
        }}
      
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      <select 
            name="sort-movies" 
            id="sort-movies"
            onChange={(e) => {
              // console.log(e.target.value)
              setSortType(e.target.value);
              // console.log(sortType)
              sortArray(e.target.value, movies);
            
            }
            
            }>
            <option selected="true" disabled="true" >Filter</option>
            <option value="Year">Year</option>
            <option value="Title">Title</option>
            <option value="Type">Type</option>
      </select>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;