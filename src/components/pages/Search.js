import classes from "./Search.module.css";

import { useCallback, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import useFetchSearch from "../../hooks/useFetchSearch";
import useInfiniteScrolling from "../../hooks/useInfiniteScrolling";

import SearchBar from "../UI/SearchBar";
import Button from "../UI/Button";
import PosterCard from "../UI/PosterCard";
import LoadingSpinner from "../UI/LoadingSpinner";

const Search = () => {
  const { ref: myRef, inView: bottomIsVisible } = useInView({
    threshold: 1,
    rootMargin: "10px",
  });

  const [searchInput, setSearchInput] = useState("");
  const [typeActive, setTypeActive] = useState(true);
  const [type, setType] = useState("movie");
  const [currentPage, setCurrentPage] = useState(1);

  const { fetchSearch, isLoading, totalPages, searchResults, msg } =
    useFetchSearch(type, searchInput, currentPage);
  const { getItems, items, scrollIsLoading } = useInfiniteScrolling(
    type,
    searchInput,
    currentPage,
    searchResults
  );

  const isAtLastPage = currentPage === totalPages;
  const shouldGetMore =
    !isLoading &&
    !scrollIsLoading &&
    searchResults.length >= 20 &&
    !isAtLastPage;

  const inputRef = useRef();

  // Handles changes on search bar
  const inputChangeHandler = (event) => {
    if (event.target.value.trim() === "") setCurrentPage(1);

    setSearchInput(inputRef.current.value);
  };

  // Changes media type to active when button is clicked
  const typeChangeHandler = (event) => {
    setType(event.target.innerText.toLowerCase());
    setCurrentPage(1);
    setTypeActive(!typeActive);
  };

  // Increments the page count when user scrolls down
  const incrementPageCountHandler = useCallback(() => {
    setCurrentPage((current) => current + 1);
  }, []);

  useEffect(() => {
    fetchSearch();
  }, [fetchSearch, searchInput, type]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchResults]);

  useEffect(() => {
    if (bottomIsVisible && isAtLastPage) return;
    if (bottomIsVisible && scrollIsLoading) incrementPageCountHandler();

    if (bottomIsVisible && !scrollIsLoading) getItems();
  }, [
    bottomIsVisible,
    incrementPageCountHandler,
    isAtLastPage,
    scrollIsLoading,
    getItems,
  ]);

  return (
    <section className={classes["search-section"]}>
      <div className={classes["search-elements-container"]}>
        <SearchBar
          inputChangeHandler={inputChangeHandler}
          searchValue={searchInput}
          ref={inputRef}
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
        {shouldGetMore && (
          <div className={classes["observer-div"]} ref={myRef}></div>
        )}
      </div>
    </section>
  );
};

export default Search;
