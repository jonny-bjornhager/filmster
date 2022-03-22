import classes from "./Search.module.css";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetchSearch } from "../../hooks/useFetchSearch";

import SearchForm from "../UI/SearchForm";
import SearchedMedia from "../Layout/SearchedMedia";
import LoadingSpinner from "../UI/LoadingSpinner";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [mediaType, setMediaType] = useState("movie");
  const { searchResults, fetchSearched, isLoading, errorMsg } = useFetchSearch(
    searchInput.trim()
  );
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

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
  }, [mediaType, setSearchParams]);

  return (
    <section className={classes["search-section"]}>
      <SearchForm
        inputChangeHandler={searchInputChangeHandler}
        searchValue={searchInput}
        onSubmit={onSubmitSearchHandler}
        mediaTypeChangeHandler={mediaTypeChangeHandler}
        searchResults={searchResults}
        mediaType={mediaType}
      />
      {isLoading && <LoadingSpinner />}
      {!isLoading && searchResults?.movies && mediaType === "movie" && (
        <SearchedMedia
          mediaItems={searchResults.movies}
          errorMsg={errorMsg}
          type={mediaType}
        />
      )}

      {!isLoading && searchResults?.tv_shows && mediaType === "tv" && (
        <SearchedMedia
          errorMsg={errorMsg}
          mediaItems={searchResults.tv_shows}
          type={mediaType}
        />
      )}
    </section>
  );
};

export default Search;
