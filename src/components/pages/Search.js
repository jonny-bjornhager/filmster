import classes from "./Search.module.css";
import SearchBar from "../UI/SearchBar";
import Button from "../UI/Button";

import { useState } from "react";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");

  const inputChangeHandler = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <section className={classes["search-section"]}>
      <div className={classes["search-control"]}>
        <SearchBar
          changeHandler={inputChangeHandler}
          searchValue={searchInput}
        />
        <Button variant="red">Search</Button>
      </div>
    </section>
  );
};

export default Search;
