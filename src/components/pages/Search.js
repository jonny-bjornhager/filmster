import classes from "./Search.module.css";

import { useState } from "react";
import { useFetchSearch } from "../../hooks/useFetchSearch";
import SearchForm from "../UI/SearchForm";
import SearchedMedia from "../Layout/SearchedMedia";
import LoadingSpinner from "../UI/LoadingSpinner";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [mediaType, setMediaType] = useState("movie");

  const {
    searchResults,
    fetchSearchedMovies,
    fetchSearchedTvShows,
    isLoading,
  } = useFetchSearch(searchInput.trim());

  const searchInputChangeHandler = (event) => {
    setSearchInput(event.target.value);
  };

  const onSubmitSearchHandler = (event) => {
    event.preventDefault();

    if (searchInput.trim() === "") return;

    if (mediaType === "tv") fetchSearchedTvShows();
    if (mediaType === "movie") fetchSearchedMovies();

    setSearchInput("");
  };

  const mediaTypeChangeHandler = (event) => {
    if (mediaType === event.target.value) return;
    setMediaType(event.target.value);
  };

  return (
    <section className={classes["search-section"]}>
      <SearchForm
        inputChangeHandler={searchInputChangeHandler}
        searchValue={searchInput}
        onSubmit={onSubmitSearchHandler}
        mediaTypeChangeHandler={mediaTypeChangeHandler}
      />
      {isLoading && <LoadingSpinner />}
      {!isLoading && searchResults.length > 0 && (
        <SearchedMedia mediaItems={searchResults} />
      )}
    </section>
  );
};

export default Search;
