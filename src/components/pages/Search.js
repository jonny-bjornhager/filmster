import classes from "./Search.module.css";

import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetchSearch from "../../hooks/useFetchSearch";
import { useInView } from "react-intersection-observer";

import SearchBar from "../UI/SearchBar";
import Button from "../UI/Button";
import PosterCard from "../UI/PosterCard";
import LoadingSpinner from "../UI/LoadingSpinner";

const Search = () => {
  const { ref: myRef, inView: bottomIsVisible } = useInView({
    threshold: 1,
  });

  const [searchInput, setSearchInput] = useState("");
  const [typeActive, setTypeActive] = useState(true);
  const [type, setType] = useState("movie");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    fetchSearch,
    isLoading,
    fetchMoreIsLoading,
    fetchOnScroll,
    totalPages,
    searchResults,
    msg,
  } = useFetchSearch(type, searchInput.toLowerCase().trim(), currentPage);

  const inputChangeHandler = (event) => {
    if (event.target.value.trim() === "") setCurrentPage(1);
    setSearchInput(event.target.value);
  };

  const typeChangeHandler = (event) => {
    setType(event.target.innerText.toLowerCase());
    setCurrentPage(1);
    setTypeActive(!typeActive);
  };

  const incrementPageCountHandler = useCallback(() => {
    if (currentPage === totalPages) return;
    setCurrentPage((current) => current + 1);
  }, [currentPage, totalPages]);

  useEffect(() => {
    fetchSearch();
  }, [fetchSearch, searchInput, type]);

  useEffect(() => {
    if (bottomIsVisible) {
      incrementPageCountHandler();
    }
  }, [bottomIsVisible, incrementPageCountHandler]);

  useEffect(() => {
    if (bottomIsVisible) {
      fetchOnScroll();
    }
  }, [fetchOnScroll, bottomIsVisible, currentPage, totalPages]);

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
      </div>
      {fetchMoreIsLoading && (
        <div className={classes["fetch-more-loader"]}>
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && !fetchMoreIsLoading && searchResults.length >= 20 && (
        <div className={classes["observer-div"]} ref={myRef}></div>
      )}
    </section>
  );
};

export default Search;
