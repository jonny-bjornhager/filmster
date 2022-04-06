import { useState, useCallback } from "react";
import { searchUrl } from "../api_urls";
import removeDuplicateItem from "../removeDuplicateItem";

const transformedResults = (inputArray) => {
  return inputArray.map((item) => {
    return {
      id: item.id,
      title: item["original_title"] || item["original_name"],
      poster:
        item.poster_path !== null
          ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
          : "https://i.ibb.co/LSQTBd4/poster-unavailable.png",
      genre_ids: item.genre_ids,
      rating: item.vote_average,
      year:
        new Date(item.release_date).getFullYear() ||
        new Date(item.first_air_date).getFullYear(),
    };
  });
};

const useFetchSearch = (type, query, page) => {
  const [searchResults, setSearchResults] = useState([]);
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fetchMoreIsLoading, setFetchMoreIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(null);

  // Fetches media the user has typed into searchbar
  const fetchSearch = useCallback(async () => {
    setMsg("");

    if (query === "") {
      setSearchResults([]);
      return;
    }
    setIsLoading(true);

    try {
      const request = await fetch(
        `${searchUrl}/${type}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}&include_adult=false&page=1`
      );

      if (!request.ok) {
        throw new Error("Could not fetch the requested data.");
      }

      const { results } = await request.json();

      if (results.length === 0) {
        setSearchResults([]);
        throw new Error(`Could not find anything matching "${query}".`);
      }

      const mediaList = transformedResults(results);

      setSearchResults(mediaList);
    } catch (error) {
      console.log(error);
      setMsg(error.message);
    }
    setIsLoading(false);
  }, [type, query]);

  // Fetches media when user scrolls to bottom of page
  const fetchOnScroll = useCallback(async () => {
    if (page === totalPages) return;
    setMsg("");

    if (query === "") {
      setSearchResults([]);
      return;
    }
    setFetchMoreIsLoading(true);

    try {
      const request = await fetch(
        `${searchUrl}/${type}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}&include_adult=false&page=${page}`
      );

      if (!request.ok) {
        throw new Error("Could not fetch the requested data.");
      }

      const { results, total_pages } = await request.json();
      console.log(total_pages);

      const mediaList = transformedResults(results);

      setSearchResults((prev) =>
        removeDuplicateItem([...prev, ...mediaList], "id")
      );
      setTotalPages(total_pages);
    } catch (error) {
      console.log(error);
      setMsg(error.message);
    }

    setFetchMoreIsLoading(false);
  }, [type, query, page, totalPages]);

  return {
    fetchSearch,
    fetchOnScroll,
    searchResults,
    isLoading,
    fetchMoreIsLoading,
    msg,
    totalPages,
  };
};

export default useFetchSearch;
