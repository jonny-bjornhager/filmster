import classes from "./Search.module.css";

import { useState } from "react";
import { useFetchSearch } from "../../hooks/useFetchSearch";
import SearchForm from "../UI/SearchForm";
import SearchedMedia from "../Layout/SearchedMedia";
import LoadingSpinner from "../UI/LoadingSpinner";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [mediaType, setMediaType] = useState("movie");
  const { searchResults, fetchSearched, isLoading } = useFetchSearch(
    searchInput.trim()
  );

  const searchInputChangeHandler = (event) => {
    setSearchInput(event.target.value);
  };

  const onSubmitSearchHandler = (event) => {
    event.preventDefault();

    if (searchInput.trim() === "") return;
    fetchSearched();

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
      {!isLoading && searchResults?.movies && mediaType === "movie" && (
        <SearchedMedia mediaItems={searchResults.movies} />
      )}

      {!isLoading && searchResults?.tv_shows && mediaType === "tv" && (
        <SearchedMedia mediaItems={searchResults.tv_shows} />
      )}
    </section>
  );
};

export default Search;
