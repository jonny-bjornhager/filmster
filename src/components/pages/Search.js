import classes from "./Search.module.css";

import { useEffect, useState, useReducer } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetchSearch } from "../../hooks/useFetchSearch";

import SearchForm from "../UI/SearchForm";
import SearchedMedia from "../Layout/SearchedMedia";
import LoadingSpinner from "../UI/LoadingSpinner";

const filterReducer = (state, action) => {
  switch (action.type) {
    case "ADD GENRE":
      return { ...state, genres: [action.input] };

    case "APPEND GENRE":
      return { ...state, genres: [...state.genres, action.input] };

    case "REMOVE GENRE":
      return {
        ...state,
        genres: state.genres.filter((item) => item !== action.input),
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
  const [mediaType, setMediaType] = useState("movie");
  const { searchResults, fetchSearched, isLoading, errorMsg } = useFetchSearch(
    searchInput.trim()
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchFilters, dispatch] = useReducer(filterReducer, {
    type: mediaType,
    genres: [],
    year: [],
    rating: [],
  });

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

  // Handles change of searched media type
  const mediaTypeChangeHandler = (event) => {
    if (mediaType === event.target.value) return;
    setMediaType(event.target.value);
  };

  const genreFilterHandler = (input, callback, callbackParam) => {
    if (!searchFilters.genres) {
      dispatch({
        type: "ADD GENRE",
        input: input,
      });
    }

    if (searchFilters.genres) {
      dispatch({
        type: "APPEND GENRE",
        input: input,
      });
    }

    if (searchFilters.genres?.includes(input)) {
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
  const resetFiltersHandler = () => {
    dispatch({
      type: "RESET",
      input: mediaType,
    });
  };

  useEffect(() => {
    dispatch({
      type: "CHANGE TYPE",
      input: mediaType,
    });
  }, [mediaType]);

  useEffect(() => {
    setSearchParams(searchFilters);
  }, [setSearchParams, searchFilters]);

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
      {!isLoading && searchResults.length !== 0 && (
        <SearchedMedia
          mediaItems={
            mediaType === "movie" ? searchResults[0] : searchResults[1]
          }
          type={mediaType}
          genreFilterHandler={genreFilterHandler}
          numberFilterHandler={numberFilterHandler}
          resetFiltersHandler={resetFiltersHandler}
          errorMsg={errorMsg}
        />
      )}

      {/* {!isLoading && searchResults?.tv_shows && mediaType === "tv" && (
        <SearchedMedia
          errorMsg={errorMsg}
          mediaItems={searchResults.tv_shows}
          type={mediaType}
          genreFilterHandler={genreFilterHandler}
          numberFilterHandler={numberFilterHandler}
          resetFiltersHandler={resetFiltersHandler}
        />
      )} */}
    </section>
  );
};

export default Search;
