import classes from "./Search.module.css";

import SearchBar from "../UI/SearchBar";
import TypeBtn from "../UI/TypeBtn";

const Search = () => {
  return (
    <section className={classes["search-section"]}>
      <div className={classes["form-container"]}>
        <form className={classes["search-form"]}>
          <SearchBar />
          <TypeBtn />
        </form>
      </div>
    </section>
  );
};

export default Search;
