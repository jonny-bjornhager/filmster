import { useState } from "react";

const transformMovieData = (inputArray, mediaType) => {
  const inputHasProperties = inputArray.filter(
    (item) => item.poster_path && item.vote_average !== 0
  );

  if (mediaType === "movie") {
    return inputHasProperties.map((item) => {
      return {
        id: item.id,
        title: item.original_title,
        rating: item.vote_average,
        year: new Date(item.release_date).getFullYear(),
        poster: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
        poster_placeholder: `https://image.tmdb.org/t/p/w92/${item.poster_path}`,
        mediaType,
      };
    });
  }

  if (mediaType === "tv-show") {
    return inputHasProperties.map((item) => {
      return {
        id: item.id,
        title: item.original_name,
        rating: item.vote_average,
        year: new Date(item.first_air_date).getFullYear() || "",
        poster: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
        poster_placeholder: `https://image.tmdb.org/t/p/w92/${item.poster_path}`,
        mediaType,
      };
    });
  }
};

export const useFetchSearch = (input) => {
  const [searchResults, setSearchResults] = useState({});

  // Fetches searched Movies
  const fetchSearchedMovies = async () => {
    const request = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${input}&page=1&include_adult=false`
    );

    const { results } = await request.json();
    console.log(results);

    setSearchResults(transformMovieData(results, "movie"));
  };

  // Fetches searched Tv-Shows
  const fetchSearchedTvShows = async () => {
    const request = await fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${input}&page=1&include_adult=false`
    );

    const { results } = await request.json();

    setSearchResults(transformMovieData(results, "tv-show"));
  };

  return { searchResults, fetchSearchedMovies, fetchSearchedTvShows };
};
