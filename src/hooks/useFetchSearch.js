import { useState, useCallback } from "react";
import { searchUrl } from "../api_urls";

const useFetchSearch = (type, searchParams) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const popularTvShowsUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&`;

  const fetchSearch = async () => {
    setIsLoading(true);

    try {
      const request = await fetch(
        `${searchUrl}/${type}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US${searchParams}`
      );

      const { results } = await request.json();

      const transformedResults = results.map((item) => {
        return {
          id: item.id,
          title: item["original_title"] || item["original_name"],
          poster: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
          genre_ids: item.genre_ids,
          rating: item.vote_average,
          year:
            new Date(item.release_date).getFullYear() ||
            new Date(item.first_air_date).getFullYear(),
        };
      });

      setSearchResults(transformedResults);
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  };

  return {
    fetchSearch,
    searchResults,
    isLoading,
  };
};

export default useFetchSearch;
