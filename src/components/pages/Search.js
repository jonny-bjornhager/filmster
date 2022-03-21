import classes from "./Search.module.css";

import { useEffect, useState } from "react";
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
  const [hasFiltered, setHasFiltered] = useState(false);

  const filterHandler = (event) => {
    const value = event.target.value;

    if (value === "rating") {
      const filteredMovies = [...searchResults.movies].sort((a, b) => {
        return b.rating - a.rating;
      });

      const filteredTvShows = [...searchResults.tv_shows].sort((a, b) => {
        return b.rating - a.rating;
      });

      setFilteredMedia({
        movies: filteredMovies,
        tv_shows: filteredTvShows,
      });
    }

    if (value === "year") {
      const filteredMovies = [...searchResults.movies].sort((a, b) => {
        return b.year - a.year;
      });

      const filteredTvShows = [...searchResults.tv_shows].sort((a, b) => {
        return b.year - a.year;
      });

      setFilteredMedia({
        movies: filteredMovies,
        tv_shows: filteredTvShows,
      });
    }
  };

  const searchInputChangeHandler = (event) => {
    setSearchInput(event.target.value);
  };

  const onSubmitSearchHandler = (event) => {
    event.preventDefault();

    if (searchInput.trim() === "") return;
    fetchSearched();
    setSearchInput("");

    setHasFiltered(false);
    setFilteredMedia([]);
  };

  const mediaTypeChangeHandler = (event) => {
    if (mediaType === event.target.value) return;
    setMediaType(event.target.value);
  };

  useEffect(() => {
    Object.keys(filteredMedia).length > 0 && setHasFiltered(true);
    if (hasFiltered === true) return;
  }, [hasFiltered, filteredMedia]);

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
        <SearchedMedia
          mediaItems={
            !hasFiltered ? searchResults.movies : filteredMedia.movies
          }
          errorMsg={errorMsg}
        />
      )}

      {!isLoading && searchResults?.tv_shows && mediaType === "tv" && (
        <SearchedMedia
          errorMsg={errorMsg}
          mediaItems={
            !hasFiltered ? searchResults.tv_shows : filteredMedia.tv_shows
          }
        />
      )}
    </section>
  );
};

export default Search;
