import { useState, useCallback } from "react";

/* Transforms the given array of
movies or tv-shows to it's expected format */
const transformMediaData = (inputArray, mediaType, genres) => {
  const inputHasProperties = inputArray.filter(
    (item) =>
      item.poster_path !== null &&
      item.vote_average !== 0 &&
      item.backdrop_path !== null
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

  if (mediaType === "tv") {
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

export const useFetchSearch = (input, type) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Fetches searched Movies
  const fetchSearched = useCallback(async () => {
    setIsLoading(true);

    try {
      const mediaRequest = await fetch(
        `https://api.themoviedb.org/3/search/${type}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${input}&page=1&include_adult=false`
      );
      const mediaGenresRequest = await fetch(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );

      if (!mediaRequest.ok) {
        throw new Error("Something went wrong. Try again with another search.");
      }

      const { results } = await mediaRequest.json();
      const { genres } = await mediaGenresRequest.json();

      const transformedData = transformMediaData(results, type, genres);

      if (transformedData.length !== 0) {
        setErrorMsg(null);
      }

      if (transformedData.length === 0) {
        throw new Error(`No search matching "${input}".`);
      }

      setSearchResults(transformedData);
    } catch (error) {
      setErrorMsg(`${error.message}`);
    }
    setIsLoading(false);
  }, [type, input]);

  return {
    searchResults,
    fetchSearched,
    isLoading,
    errorMsg,
  };
};
