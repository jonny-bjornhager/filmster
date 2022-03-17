import classes from "./Search.module.css";
import SearchBar from "../UI/SearchBar";
import Button from "../UI/Button";

import { useEffect, useState } from "react";
import { useFetchSearch } from "../../hooks/useFetchSearch";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const { searchResults, fetchSearchedMovies } = useFetchSearch(
    searchInput.trim()
  );

  const searchInputChangeHandler = (event) => {
    setSearchInput(event.target.value);
  };

  const onClickSearchHandler = () => {
    if (searchInput.trim() === "") return;
    fetchSearchedMovies();
    setSearchInput("");
  };

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  return (
    <section className={classes["search-section"]}>
      <div className={classes["search-control"]}>
        <SearchBar
          changeHandler={searchInputChangeHandler}
          searchValue={searchInput}
        />
        <Button type="submit" onClick={onClickSearchHandler} variant="red">
          Search
        </Button>
      </div>
    </section>
  );
};

export default Search;
