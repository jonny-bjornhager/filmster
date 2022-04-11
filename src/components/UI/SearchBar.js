import classes from "./SearchBar.module.css";

import { forwardRef } from "react";

const SearchBar = ({ searchValue, inputChangeHandler }, ref) => {
  return (
    <input
      ref={ref}
      className={classes.searchBar}
      type="text"
      placeholder="Search for something..."
      value={searchValue}
      onChange={inputChangeHandler}
    />
  );
};

const forwardInput = forwardRef(SearchBar);

export default forwardInput;
