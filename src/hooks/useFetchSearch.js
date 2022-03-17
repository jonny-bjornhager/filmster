import { useState } from "react";

export const useFetchSearch = (input) => {
  const [searchResults, setSearchResults] = useState({});

  // Fetches both tv-shows, movies and actors in a single fetch
  const fetchMulti = async () => {
    const request = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${input}&page=1&include_adult=false`
    );

    const results = await request.json();

    setSearchResults(results);
  };

  return { searchResults, fetchMulti };
};
