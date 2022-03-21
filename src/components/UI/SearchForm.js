import classes from "./SearchForm.module.css";

import Button from "./Button";
import SearchBar from "./SearchBar";
import RadioButton from "./RadioButton";
import { useEffect, useState } from "react";

const SearchForm = ({
  searchResults,
  mediaTypeChangeHandler,
  filterHandler,
  inputChangeHandler,
  onSubmit,
  searchValue,
}) => {
  const [searchExists, setSearchExists] = useState(false);

  useEffect(() => {
    if (Object.keys(searchResults).length > 0) setSearchExists(true);
    if (searchExists) return;
  }, [searchResults, searchExists]);

  return (
    <form onSubmit={onSubmit} className={classes["search-form"]}>
      <div className={classes["search-control"]}>
        <SearchBar
          inputChangeHandler={inputChangeHandler}
          searchValue={searchValue}
        />
        <Button type="submit" variant="red">
          Search
        </Button>
      </div>
      <div className={classes["search-types"]}>
        <RadioButton
          functionType="change"
          mediaTypeChangeHandler={mediaTypeChangeHandler}
          name="type-choice"
          choice="movie"
          defaultChecked={true}
        >
          Movies
        </RadioButton>
        <div className={classes["vertical-line"]}></div>
        <RadioButton
          functionType="change"
          mediaTypeChangeHandler={mediaTypeChangeHandler}
          name="type-choice"
          choice="tv"
        >
          Tv-shows
        </RadioButton>
      </div>
    </form>
  );
};

export default SearchForm;
