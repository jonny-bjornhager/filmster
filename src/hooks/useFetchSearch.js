import { useState } from "react";

// Transforms the given data to it's expected format
const transformMediaData = (inputArray, mediaType) => {
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
  const [isLoading, setIsLoading] = useState(null);

  // Fetches searched Movies
  const fetchSearched = async () => {
    setIsLoading(true);
    const moviesRequest = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${input}&page=1&include_adult=false`
    );

    const { results: movieResults } = await moviesRequest.json();

    const tvRequest = await fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${input}&page=1&include_adult=false`
    );

    const { results: tvResults } = await tvRequest.json();

    setSearchResults({
      movies: transformMediaData(movieResults, "movie"),
      tv_shows: transformMediaData(tvResults, "tv-show"),
    });
    setIsLoading(false);
  };

  return {
    searchResults,
    fetchSearched,
    isLoading,
  };
};
