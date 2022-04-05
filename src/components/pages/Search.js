import classes from "./Search.module.css";

import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import useFetchSearch from "../../hooks/useFetchSearch";

import SearchBar from "../UI/SearchBar";
import Button from "../UI/Button";
import PosterCard from "../UI/PosterCard";
import LoadingSpinner from "../UI/LoadingSpinner";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { fetchSearch, searchResults, isLoading } = useFetchSearch(
    searchParams.get("type") ? searchParams.get("type") : "movie"
  );

  let hasSearchParams = searchParams.get("type")
    ? searchParams.get("type")
    : "movie";

  const inputChangeHandler = (event) => {
    setSearchInput(event.target.value);
  };

  const typeChangeHandler = (event) => {
    setSearchParams({
      type: event.target.innerText.toLowerCase(),
    });
  };

  useEffect(() => {
    fetchSearch();
  }, []);

  useEffect(() => {
    fetchSearch();
  }, [searchParams]);

  return (
    <section className={classes["search-section"]}>
      <div className={classes["search-elements-container"]}>
        <SearchBar
          inputChangeHandler={inputChangeHandler}
          searchValue={searchInput}
        />
        <div className={classes["type-btns"]}>
          <Button
            style={{ width: "50%" }}
            variant="red"
            onClick={typeChangeHandler}
          >
            <span>Movie</span>
          </Button>
          <Button
            style={{ width: "50%" }}
            variant="red"
            onClick={typeChangeHandler}
          >
            <span>Tv</span>
          </Button>
        </div>
      </div>
      <div className={classes["search-results"]}>
        {isLoading && <LoadingSpinner />}
        {!isLoading &&
          searchResults.length > 0 &&
          searchResults.map((media) => {
            return (
              <Link key={media.id} to={`/${hasSearchParams}/${media.id}`}>
                <PosterCard media={media} />
              </Link>
            );
          })}
      </div>
    </section>
  );
};

export default Search;
