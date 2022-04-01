import classes from "./SearchForm.module.css";
import { useEffect, useState } from "react";

import Button from "./Button";
import SearchBar from "./SearchBar";
import RadioButton from "./RadioButton";

const SearchForm = ({
  searchResults,
  mediaTypeChangeHandler,
  inputChangeHandler,
  onSubmit,
  searchValue,
}) => {
  const [searchExists, setSearchExists] = useState(false);

  const mediaTypes = [
    { type: "movie", header: "Movies" },
    { type: "tv", header: "Tv-Shows" },
  ];

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
        {mediaTypes?.map((media) => {
          return (
            <RadioButton
              key={media.type}
              onClick={mediaTypeChangeHandler}
              value={media.type}
              labelType={"change-type-label"}
              radioBtnType="change-type-input"
              name="type-choice"
              choice={media.type}
              defaultChecked={media.type === "movie"}
            >
              {media.header}
            </RadioButton>
          );
        })}
      </div>
    </form>
  );
};

export default SearchForm;
