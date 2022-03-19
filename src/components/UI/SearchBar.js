import classes from "./SearchBar.module.css";

const SearchBar = ({ searchValue, inputChangeHandler }) => {
  return (
    <input
      className={classes.searchBar}
      type="text"
      placeholder="Search for something..."
      value={searchValue}
      onChange={inputChangeHandler}
    />
  );
};

export default SearchBar;
