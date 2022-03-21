import classes from "./Search.module.css";

import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetchSearch } from "../../hooks/useFetchSearch";
import { fetchGenres } from "../../fetchGenres";
import SearchForm from "../UI/SearchForm";
import SearchedMedia from "../Layout/SearchedMedia";
import LoadingSpinner from "../UI/LoadingSpinner";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [mediaType, setMediaType] = useState("movie");
  const [genres, setGenres] = useState([]);
  const { searchResults, fetchSearched, isLoading, errorMsg } = useFetchSearch(
    searchInput.trim()
  );
  const [searchParams, setSearchParams] = useSearchParams();

  // Handle filtering
  const filterHandler = (event) => {
    const value = event.target.value;
  };

  // Handle search Input
  const searchInputChangeHandler = (event) => {
    setSearchInput(event.target.value);
  };

  // Handle submit
  const onSubmitSearchHandler = (event) => {
    event.preventDefault();

    if (searchInput.trim() === "") return;
    fetchSearched();
    setSearchInput("");
  };

  // Handle change of searched media type
  const mediaTypeChangeHandler = (event) => {
    if (mediaType === event.target.value) return;
    setMediaType(event.target.value);
  };

  useEffect(() => {
    setSearchParams({ type: mediaType });
  }, [setSearchParams, mediaType]);

  useEffect(() => {
    let isMounted = true;

    fetchGenres().then((genres) => {
      if (isMounted) {
        setGenres(genres);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className={classes["search-section"]}>
      <SearchForm
        inputChangeHandler={searchInputChangeHandler}
        searchValue={searchInput}
        onSubmit={onSubmitSearchHandler}
        mediaTypeChangeHandler={mediaTypeChangeHandler}
        filterHandler={filterHandler}
        searchResults={searchResults}
      />
      {isLoading && <LoadingSpinner />}
      {!isLoading && searchResults?.movies && mediaType === "movie" && (
        <SearchedMedia mediaItems={searchResults.movies} errorMsg={errorMsg} />
      )}

      {!isLoading && searchResults?.tv_shows && mediaType === "tv" && (
        <SearchedMedia errorMsg={errorMsg} mediaItems={searchResults.movies} />
      )}
    </section>
  );
};

export default Search;
