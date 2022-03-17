import classes from "./Search.module.css";

import SearchBar from "../UI/SearchBar";
import Button from "../UI/Button";

const Search = () => {
  return (
    <section className={classes["search-section"]}>
      <div className={classes["search-control"]}>
        <SearchBar />
        <Button variant="red">Search</Button>
      </div>
    </section>
  );
};

export default Search;
