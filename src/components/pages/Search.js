import classes from "./Search.module.css";
import SearchBar from "../UI/SearchBar";
import Button from "../UI/Button";

import { useEffect, useState } from "react";
import { useFetchSearch } from "../../hooks/useFetchSearch";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const { searchResults, fetchMulti } = useFetchSearch(searchInput.trim());

  const searchInputChangeHandler = (event) => {
    setSearchInput(event.target.value);
  };

  const onClickSearchHandler = () => {
    if (searchInput.trim() === "") return;

    fetchMulti();

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
        <Button onClick={onClickSearchHandler} variant="red">
          Search
        </Button>
      </div>
    </section>
  );
};

export default Search;
