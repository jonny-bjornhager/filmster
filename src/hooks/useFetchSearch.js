import { useState } from "react";

/* Transforms the given array of
movies or tv-shows to it's expected format */
const transformMediaData = (inputArray, mediaType, genres) => {
  const inputHasProperties = inputArray.filter(
    (item) =>
      item.poster_path && item.vote_average !== 0 && item.backdrop_path !== null
  );

  if (mediaType === "movie") {
    const movieData = inputHasProperties.map((item) => {
      return {
        id: item.id,
        title: item.original_title,
        rating: item.vote_average,
        year: new Date(item.release_date).getFullYear(),
        poster: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
        poster_placeholder: `https://image.tmdb.org/t/p/w92/${item.poster_path}`,
        mediaType,
        genres: genres.filter((genre) => item.genre_ids.includes(genre.id)),
      };
    });

    return movieData;
  }

  if (mediaType === "tv-show") {
    const tvData = inputHasProperties.map((item) => {
      return {
        id: item.id,
        title: item.original_name,
        rating: item.vote_average,
        year: new Date(item.first_air_date).getFullYear() || "",
        poster: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
        poster_placeholder: `https://image.tmdb.org/t/p/w92/${item.poster_path}`,
        mediaType,
        genres: genres.filter((genre) => item.genre_ids.includes(genre.id)),
      };
    });

    return tvData;
  }
};

export const useFetchSearch = (input) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Fetches searched Movies
  const fetchSearched = async () => {
    setIsLoading(true);

    try {
      const moviesRequest = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${input}&page=1&include_adult=false`
      );

      const tvRequest = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${input}&page=1&include_adult=false`
      );

      const movieGenresRequest = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );

      const tvGenresRequest = await fetch(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );

      if (!moviesRequest.ok || !tvRequest.ok) {
        throw new Error("Something went wrong. Try again with another search.");
      }

      const { results: movieResults } = await moviesRequest.json();
      const { genres: movieGenresResults } = await movieGenresRequest.json();

      const { results: tvResults } = await tvRequest.json();
      const { genres: tvGenresResults } = await tvGenresRequest.json();

      setSearchResults([
        transformMediaData(movieResults, "movie", movieGenresResults),
        transformMediaData(tvResults, "tv-show", tvGenresResults),
      ]);
    } catch (error) {
      setErrorMsg(`${error.message}: ${error}`);
    }

    setIsLoading(false);
  };

  return {
    searchResults,

    fetchSearched,
    isLoading,
    errorMsg,
  };
};
