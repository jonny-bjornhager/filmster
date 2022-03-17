import classes from "./SearchBar.module.css";

const SearchBar = ({ searchValue, changeHandler }) => {
  return (
    <input
      className={classes.searchBar}
      type="text"
      placeholder="Search for something..."
      value={searchValue}
      onChange={changeHandler}
    />
  );
};

export default SearchBar;
