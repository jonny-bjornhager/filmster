import classes from "./Search.module.css";

import { useEffect, useState } from "react";
import { useFetchSearch } from "../../hooks/useFetchSearch";
import SearchForm from "../UI/SearchForm";
import SearchedMedia from "../Layout/SearchedMedia";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const { searchResults, fetchSearchedMovies } = useFetchSearch(
    searchInput.trim()
  );

  const searchInputChangeHandler = (event) => {
    setSearchInput(event.target.value);
  };

  const onSubmitSearchHandler = (event) => {
    event.preventDefault();

    if (searchInput.trim() === "") return;
    fetchSearchedMovies();
    setSearchInput("");
  };

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  return (
    <section className={classes["search-section"]}>
      <div className={classes["search-control"]}>
        <SearchForm
          changeHandler={searchInputChangeHandler}
          searchValue={searchInput}
          onSubmit={onSubmitSearchHandler}
        />
      </div>

      {searchResults.length > 0 && <SearchedMedia mediaItems={searchResults} />}
    </section>
  );
};

export default Search;
