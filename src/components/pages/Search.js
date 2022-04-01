import classes from "./Search.module.css";

import { useEffect, useState, useReducer, useCallback } from "react";
import { useFetchSearch } from "../../hooks/useFetchSearch";
import filterReducer from "../../filterReducer";

import SearchForm from "../UI/SearchForm";
import Filter from "../UI/Filter";
import SearchedMedia from "../Layout/SearchedMedia";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [searchFilters, dispatch] = useReducer(filterReducer, {
    type: "movie",
    genre: [],
    year: [],
    rating: [],
    filtered: [],
  });
  const {
    searchResults,
    fetchSearched,
    isLoading,
    errorMsg,
    fetchMore,
    fetchMoreIsLoading,
  } = useFetchSearch(query, searchFilters.type);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filterTouched, setFilterTouched] = useState(false);

  const openFiltersHandler = () => {
    setFiltersOpen(!filtersOpen);
  };

  // Handle search Input
  const searchInputChangeHandler = (event) => {
    setSearchInput(event.target.value);
  };

  // Handle submit
  const onSubmitSearchHandler = (event) => {
    event.preventDefault();

    if (searchInput.trim() === "") return;
    setQuery(searchInput.trim());

    setSearchInput("");
  };

  const filterChangeHandler = useCallback(() => {
    const items = searchResults.map((item) => item);
    const filtered = items.filter((item) =>
      item.genres.some((item) => searchFilters.genre?.includes(item))
    );

    dispatch({
      type: "FILTER",
      input: filtered,
    });
  }, [searchResults, searchFilters.genre]);

  // Change media type filter
  const mediaTypeChangeHandler = (event) => {
    if (searchFilters.type === event.target.value) return;

    if (event.target.value === "movie") {
      dispatch({
        type: "MOVIE",
        input: event.target.value,
      });
    }

    if (event.target.value === "tv") {
      dispatch({
        type: "TV",
        input: event.target.value,
      });
    }
  };

  const genreFilterHandler = (input, callback, callbackParam) => {
    if (!searchFilters.genre) {
      dispatch({
        type: "ADD GENRE",
        input: input,
      });
    }

    if (searchFilters.genre) {
      dispatch({
        type: "APPEND GENRE",
        input: input,
      });
    }

    if (searchFilters.genre?.includes(input)) {
      dispatch({
        type: "REMOVE GENRE",
        input: input,
      });
    }

    /* This callback reaches out to the component
    that it's beeing passed to in order do get the 
    text inside the container the user clicked*/
    callback(!callbackParam);
  };

  // Filter by Rating
  const ratingFilterHandler = (event, callback, callbackParam) => {
    if (event === "ascending") {
      dispatch({
        type: "RATING ASCENDING",
        input: event,
      });
    }

    if (event === "descending") {
      dispatch({
        type: "RATING DESCENDING",
        input: event,
      });
    }

    if (searchFilters.rating?.includes(event)) {
      dispatch({
        type: "REMOVE RATING",
        input: event,
      });
    }
    callback(!callbackParam);
  };

  // Filter by year
  const yearFilterHandler = (event, callback, callbackParam) => {
    if (event === "ascending") {
      dispatch({
        type: "YEAR ASCENDING",
        input: event,
      });
    }

    if (event === "descending") {
      dispatch({
        type: "YEAR DESCENDING",
        input: event,
      });
    }

    if (searchFilters.year?.includes(event)) {
      dispatch({
        type: "REMOVE YEAR",
        input: event,
      });
    }
    callback(!callbackParam);
  };

  // Reset search filters
  const resetFiltersHandler = useCallback(() => {
    dispatch({
      type: "movie",
      genre: [],
      year: [],
      rating: [],
      filtered: [],
    });
  }, []);

  useEffect(() => {
    if (query !== "") {
      fetchSearched();
    }
  }, [query, fetchSearched]);

  useEffect(() => {
    filterChangeHandler();
  }, [filterChangeHandler]);

  useEffect(() => {
    resetFiltersHandler();
  }, [searchFilters.type, resetFiltersHandler]);

  useEffect(() => {
    if (
      searchFilters.genre?.length !== 0 ||
      searchFilters.year?.length !== 0 ||
      searchFilters.rating?.length !== 0
    ) {
      setFilterTouched(true);
    } else {
      setFilterTouched(false);
    }
  }, [searchFilters]);

  return (
    <section className={classes["search-section"]}>
      <SearchForm
        inputChangeHandler={searchInputChangeHandler}
        searchValue={searchInput}
        onSubmit={onSubmitSearchHandler}
        mediaTypeChangeHandler={mediaTypeChangeHandler}
        searchResults={searchResults}
        mediaType={searchFilters.type}
      />
      {searchResults.length !== 0 && !errorMsg && (
        <Filter
          filterTouched={filterTouched}
          setFilterTouched={setFilterTouched}
          filtersOpen={filtersOpen}
          openFiltersHandler={openFiltersHandler}
          genreFilterHandler={genreFilterHandler}
          ratingFilterHandler={ratingFilterHandler}
          yearFilterHandler={yearFilterHandler}
          resetFiltersHandler={resetFiltersHandler}
          type={searchFilters.type}
        />
      )}
      <SearchedMedia
        key={searchFilters.type}
        isLoading={isLoading}
        searchResults={filterTouched ? searchFilters.filtered : searchResults}
        type={searchFilters.type}
        errorMsg={errorMsg}
        filtered={searchFilters.filtered}
        filterTouched={filterTouched}
        fetchMoreHandler={fetchMore}
        fetchMoreIsLoading={fetchMoreIsLoading}
      />
    </section>
  );
};

export default Search;
