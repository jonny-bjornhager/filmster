import classes from "./Search.module.css";

import { useCallback, useEffect, useState, useReducer } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { filterTypes } from "../../filterTypes";
import useFetchSearch from "../../hooks/useFetchSearch";
import useInfiniteScrolling from "../../hooks/useInfiniteScrolling";

import SearchBar from "../UI/SearchBar";
import Button from "../UI/Button";
import PosterCard from "../UI/PosterCard";
import LoadingSpinner from "../UI/LoadingSpinner";

const filterReducer = (state, action) => {
  switch (action.type) {
    case filterTypes.RATING_ASC:
      return {
        ...state,
        rating: "Ascending",
        filtered: [...action.input].sort((a, b) => b.rating - a.rating),
      };

    case filterTypes.RATING_DESC:
      return {
        ...state,
        rating: "Descending",
        filtered: [...action.input].sort((a, b) => a.rating - b.rating),
      };

    case filterTypes.YEAR_ASC:
      return { ...state, year: filterTypes.YEAR_ASC };

    case filterTypes.YEAR_DESC:
      return { ...state, year: filterTypes.YEAR_DESC };

    case filterTypes.GENRES_ADD:
      return { ...state, genres: [action.input] };

    case filterTypes.ADD_FILTERED:
      return { ...state, filtered: action.input };

    default:
      return state;
  }
};

const Search = () => {
  const { ref: myRef, inView: bottomIsVisible } = useInView({
    threshold: 1,
  });

  const [searchInput, setSearchInput] = useState("");
  const [typeActive, setTypeActive] = useState(true);
  const [type, setType] = useState("movie");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, dispatch] = useReducer(filterReducer, {
    rating: null,
    year: null,
    genres: [],
    filtered: [],
  });

  const { fetchSearch, isLoading, totalPages, searchResults, msg } =
    useFetchSearch(type, searchInput, currentPage);
  const { getItems, items, scrollIsLoading } = useInfiniteScrolling(
    type,
    searchInput,
    currentPage
  );

  const isAtLastPage = currentPage === totalPages;

  // Handles changes on search bar
  const inputChangeHandler = (event) => {
    if (event.target.value.trim() === "") setCurrentPage(1);
    setSearchInput(event.target.value);
  };

  // Changes media type to active when button is clicked
  const typeChangeHandler = (event) => {
    setType(event.target.innerText.toLowerCase());
    setCurrentPage(1);
    setTypeActive(!typeActive);
  };

  // Increments the page count when user scrolls down
  const incrementPageCountHandler = useCallback(() => {
    // if (currentPage === totalPages) return;
    setCurrentPage((current) => current + 1);
  }, []);

  useEffect(() => {
    fetchSearch();
  }, [fetchSearch, searchInput, type]);

  useEffect(() => {
    if (bottomIsVisible && isAtLastPage) return;
    if (bottomIsVisible && scrollIsLoading) {
      incrementPageCountHandler();
      return;
    }
  }, [
    bottomIsVisible,
    incrementPageCountHandler,
    isAtLastPage,
    scrollIsLoading,
  ]);

  useEffect(() => {
    if (isAtLastPage) return;
    if (bottomIsVisible) getItems();
  }, [bottomIsVisible, getItems, isAtLastPage]);

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage]);

  return (
    <section className={classes["search-section"]}>
      <div className={classes["search-elements-container"]}>
        <SearchBar
          inputChangeHandler={inputChangeHandler}
          searchValue={searchInput}
        />
        <div className={classes["type-btns"]}>
          <Button
            style={{ width: "49%" }}
            variant="red"
            onClick={typeChangeHandler}
            disabled={typeActive}
          >
            <span>Movie</span>
          </Button>
          <Button
            style={{ width: "49%" }}
            variant="red"
            onClick={typeChangeHandler}
            disabled={!typeActive}
          >
            <span>Tv</span>
          </Button>
        </div>
        <Button variant="red">Ascending</Button>
        <Button variant="red">Descending</Button>
      </div>

      <div className={classes["msg-box"]}>
        {isLoading && <LoadingSpinner />}
        {!isLoading && msg && <p>{msg}</p>}
      </div>
      <div
        style={{
          display: !isLoading && searchResults.length > 0 ? "grid" : "none",
        }}
        className={classes["search-results"]}
      >
        {!isLoading &&
          searchResults.length > 0 &&
          searchResults.map((media) => {
            return (
              <Link key={media.id} to={`/${type}/${media.id}`}>
                <PosterCard media={media} />
              </Link>
            );
          })}
        {items.length > 0 &&
          items.map((media) => {
            return (
              <Link key={media.id} to={`/${type}/${media.id}`}>
                <PosterCard media={media} />
              </Link>
            );
          })}
        {!isLoading && !scrollIsLoading && searchResults.length >= 20 && (
          <div className={classes["observer-div"]} ref={myRef}></div>
        )}
      </div>
    </section>
  );
};

export default Search;
