import classes from "./SearchBar.module.css";

const SearchBar = () => {
  return (
    <input
      className={classes.searchBar}
      type="text"
      placeholder="Search for show or movie"
    />
  );
};

export default SearchBar;
