import { useState, useCallback, useRef } from "react";
import { searchUrl } from "../api_urls";

import transformMediaData from "../transFormMediaData";

const useFetchSearch = (type, query) => {
  const [searchResults, setSearchResults] = useState([]);
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(null);
  const timeout = useRef();

  // Fetches media the user has typed into searchbar
  const fetchSearch = useCallback(() => {
    clearTimeout(timeout.current);
    setMsg("");
    if (query === "") {
      setSearchResults([]);
      return;
    }

    timeout.current = setTimeout(async () => {
      setIsLoading(true);

      try {
        const request = await fetch(
          `${searchUrl}/${type}?api_key=${
            process.env.REACT_APP_API_KEY
          }&language=en-US&query=${query
            .toLowerCase()
            .trim()}&include_adult=false&page=1`
        );

        if (!request.ok) {
          throw new Error("Could not fetch the requested data.");
        }

        const { results, total_pages } = await request.json();

        if (results.length === 0) {
          setSearchResults([]);
          throw new Error(`Could not find anything matching "${query}".`);
        }

        const mediaList = transformMediaData(results);
        setSearchResults(mediaList);
        setTotalPages(total_pages);
      } catch (error) {
        console.log(error);
        setMsg(error.message);
      }
      setIsLoading(false);
    }, 250);
  }, [type, query]);

  return {
    fetchSearch,
    searchResults,
    isLoading,
    totalPages,
    msg,
  };
};

export default useFetchSearch;
