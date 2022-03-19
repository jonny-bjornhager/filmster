import classes from "./SearchForm.module.css";

import Button from "./Button";
import SearchBar from "./SearchBar";
import RadioButton from "./RadioButton";

const SearchForm = ({
  mediaTypeChangeHandler,
  inputChangeHandler,
  onSubmit,
  searchValue,
}) => {
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
      <div className={classes["radio-btns"]}>
        <RadioButton
          mediaTypeChangeHandler={mediaTypeChangeHandler}
          name="type-choice"
          choice="movie"
          defaultChecked={true}
        >
          Movies
        </RadioButton>
        <div className={classes["vertical-line"]}></div>
        <RadioButton
          mediaTypeChangeHandler={mediaTypeChangeHandler}
          name="type-choice"
          choice="tv"
          defaultChecked={false}
        >
          Tv-shows
        </RadioButton>
      </div>
    </form>
  );
};

export default SearchForm;
