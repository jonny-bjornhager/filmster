import { useState } from "react";

const transformMovieData = (inputArray) => {
  return inputArray.map((item) => {
    return {
      id: item.id,
      title: item.original_title,
      rating: item.vote_average,
      year: new Date(item.release_date).getFullYear(),
      poster: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
      poster_placeholder: `https://image.tmdb.org/t/p/w92/${item.poster_path}`,
    };
  });
};

export const useFetchSearch = (input) => {
  const [searchResults, setSearchResults] = useState({});

  // Fetches both tv-shows, movies and actors in a single fetch
  const fetchSearchedMovies = async () => {
    const request = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${input}&page=1&include_adult=false`
    );

    const { results } = await request.json();
    console.log(results);

    setSearchResults(transformMovieData(results));
  };

  return { searchResults, fetchSearchedMovies };
};
