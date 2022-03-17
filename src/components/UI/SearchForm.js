import classes from "./SearchForm.module.css";

import Button from "./Button";
import SearchBar from "./SearchBar";

const SearchForm = ({ changeHandler, onSubmit, searchValue }) => {
  return (
    <form onSubmit={onSubmit} className={classes["search-form"]}>
      <div className={classes["search-control"]}>
        <SearchBar changeHandler={changeHandler} searchValue={searchValue} />
        <Button type="submit" variant="red">
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
