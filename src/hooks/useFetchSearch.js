import { useState, useCallback } from "react";

const removeDuplicate = (inputArray) => {
  return inputArray.filter(
    (value, index, self) =>
      index ===
      self.findIndex((t) => t.place === value.place && t.id === value.id)
  );
};

/* Transforms the given array of
movies or tv-shows to it's expected format */
const transformMediaData = (inputArray, mediaType, genres) => {
  const inputHasProperties = inputArray.filter(
    (item) =>
      item.vote_average !== 0 &&
      item.backdrop_path !== null &&
      item.poster_path !== null
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
        genres: genres
          .filter((genre) => item.genre_ids.includes(genre.id))
          .map((genre) => genre.name.toLowerCase()),
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
        genres: genres
          .filter((genre) => item.genre_ids.includes(genre.id))
          .map((genre) => genre.name.toLowerCase()),
      };
    });

    return tvData;
  }
};

export const useFetchSearch = (input, type) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [hasFetched, setHasFetched] = useState(false);
  const [scrollIsLoading, setScrollIsLoading] = useState(null);

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

  const fetchMore = useCallback(
    async (num) => {
      setScrollIsLoading(true);

      try {
        const request = await fetch(
          `https://api.themoviedb.org/3/search/${type}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${input}&page=${num}&include_adult=false`
        );

        const genresRequest = await fetch(
          `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );

        const { results } = await request.json();
        const { genres: genreResults } = await genresRequest.json();

        const transformedData = transformMediaData(results, type, genreResults);

        if (transformedData.length !== 0) {
          setErrorMsg(null);
        }

        if (transformMediaData.length === 0) return;

        // if (transformedData.length === 0) {
        //   throw new Error(`No search matching "${input}".`);
        // }

        setSearchResults((prevMedia) =>
          removeDuplicate([...prevMedia, ...transformedData])
        );
      } catch (error) {
        setErrorMsg(`${error.message}`);
      }

      setScrollIsLoading(false);
      setHasFetched(true);
    },
    [input, type]
  );

  return {
    searchResults,
    fetchSearched,
    isLoading,
    errorMsg,
    fetchMore,
    hasFetched,
    // scrollIsLoading,
  };
};
