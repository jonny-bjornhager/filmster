import classes from "./Search.module.css";

import { useEffect, useState, useReducer, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetchSearch } from "../../hooks/useFetchSearch";

import SearchForm from "../UI/SearchForm";
import Filter from "../UI/Filter";
import SearchedMedia from "../Layout/SearchedMedia";

const filterReducer = (state, action) => {
  switch (action.type) {
    case "ADD GENRE":
      return { ...state, genre: [action.input] };

    case "APPEND GENRE":
      return { ...state, genre: [...state.genre, action.input] };

    case "REMOVE GENRE":
      return {
        ...state,
        genre: state.genre.filter((item) => item !== action.input),
      };

    case "ADD RATING":
      return {
        ...state,
        rating: action.input,
      };

    case "ADD YEAR":
      return {
        ...state,
        year: action.input,
      };

    case "CHANGE TYPE":
      return {
        ...state,
        type: action.input,
      };

    case "RESET":
      return {
        type: action.input,
      };

    default:
      return state;
  }
};

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [mediaType, setMediaType] = useState("movie");
  const { searchResults, fetchSearched, isLoading, errorMsg } = useFetchSearch(
    query,
    mediaType
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchFilters, dispatch] = useReducer(filterReducer, {
    type: mediaType,
    genre: [],
    year: [],
    rating: [],
  });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filtered, setFiltered] = useState([]);

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

  // Handles change of searched media type
  const mediaTypeChangeHandler = (event) => {
    if (mediaType === event.target.value) return;
    setMediaType(event.target.value);
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
    text inside the container the use clicked*/
    callback(!callbackParam);
  };

  // Handles the changing of Number filtering (YEAR, RATING)
  const numberFilterHandler = (event, variation) => {
    if (variation === "year") {
      dispatch({
        type: "ADD YEAR",
        input: +event.target.value,
      });
    }

    if (variation === "rating") {
      dispatch({
        type: "ADD RATING",
        input: +event.target.value,
      });
    }
  };

  // Handles the RESET of search filters
  const resetFiltersHandler = useCallback(() => {
    dispatch({
      type: "RESET",
      input: mediaType,
    });
  }, [mediaType]);

  useEffect(() => {
    dispatch({
      type: "CHANGE TYPE",
      input: mediaType,
    });
  }, [mediaType]);

  useEffect(() => {
    setSearchParams(searchFilters);
  }, [setSearchParams, searchFilters]);

  useEffect(() => {
    if (query !== "") {
      fetchSearched();
    }
  }, [query, fetchSearched]);

  useEffect(() => {
    const filterChangeHandler = () => {
      const genreParams = searchParams.getAll("genre");
      const items = searchResults.map((item) => item);
      const filtered = items.filter((item) =>
        item.genres.some((item) => genreParams.includes(item))
      );
      setFiltered(filtered);
    };

    filterChangeHandler();
  }, [searchResults, searchParams]);

  useEffect(() => {
    resetFiltersHandler();
  }, [mediaType, resetFiltersHandler]);

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
      {searchResults.length !== 0 && !errorMsg && (
        <Filter
          filtersOpen={filtersOpen}
          openFiltersHandler={openFiltersHandler}
          genreFilterHandler={genreFilterHandler}
          numberFilterHandler={numberFilterHandler}
          resetFiltersHandler={resetFiltersHandler}
          type={mediaType}
        />
      )}
      <SearchedMedia
        key={mediaType}
        isLoading={isLoading}
        searchResults={filtered.length > 0 ? filtered : searchResults}
        type={mediaType}
        errorMsg={errorMsg}
      />
    </section>
  );
};

export default Search;
