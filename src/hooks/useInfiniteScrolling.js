import { useState, useCallback } from "react";
import { searchUrl } from "../api_urls";
import removeDuplicateItem from "../removeDuplicateItem";
import transformMediaData from "../transFormMediaData";

const useInfiniteScrolling = (type, query, page) => {
  const [items, setItems] = useState([]);
  const [scrollIsLoading, setScrollIsLoading] = useState(false);

  // Fetches media when user scrolls to bottom of page
  const getItems = useCallback(async () => {
    setScrollIsLoading(true);

    try {
      const request = await fetch(
        `${searchUrl}/${type}?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${query
          .toLowerCase()
          .trim()}&include_adult=false&page=${page}`
      );

      if (!request.ok) {
        throw new Error("Could not fetch the requested data.");
      }

      const { results } = await request.json();
      const newItems = transformMediaData(results);

      setItems((prevItems) =>
        removeDuplicateItem([...prevItems, ...newItems], "id")
      );
    } catch (error) {
      console.log(error, error.message);
    }

    setScrollIsLoading(false);
  }, [type, query, page]);

  return {
    getItems,
    items,
    scrollIsLoading,
  };
};

export default useInfiniteScrolling;
