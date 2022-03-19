import classes from "./SearchForm.module.css";

import Button from "./Button";
import SearchBar from "./SearchBar";
import RadioButton from "./RadioButton";

const SearchForm = ({ changeHandler, onSubmit, searchValue }) => {
  return (
    <form onSubmit={onSubmit} className={classes["search-form"]}>
      <div className={classes["search-control"]}>
        <SearchBar changeHandler={changeHandler} searchValue={searchValue} />
        <Button type="submit" variant="red">
          Search
        </Button>
      </div>
      <div className={classes["radio-btns"]}>
        <RadioButton name="type-choice" choice="movie">
          Movies
        </RadioButton>
        <RadioButton name="type-choice" choice="tv">
          Tv-shows
        </RadioButton>
      </div>
    </form>
  );
};

export default SearchForm;
