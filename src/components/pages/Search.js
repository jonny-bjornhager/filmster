import classes from "./Search.module.css";

import { useState } from "react";
import { useFetchSearch } from "../../hooks/useFetchSearch";
import SearchForm from "../UI/SearchForm";
import SearchedMedia from "../Layout/SearchedMedia";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const { searchResults, fetchSearchedMovies, fetchSearchedTvShows } =
    useFetchSearch(searchInput.trim());

  const searchInputChangeHandler = (event) => {
    setSearchInput(event.target.value);
  };

  const onSubmitSearchHandler = (event) => {
    event.preventDefault();

    if (searchInput.trim() === "") return;
    fetchSearchedTvShows();
    setSearchInput("");
  };

  return (
    <section className={classes["search-section"]}>
      <SearchForm
        changeHandler={searchInputChangeHandler}
        searchValue={searchInput}
        onSubmit={onSubmitSearchHandler}
      />

      {searchResults.length > 0 && <SearchedMedia mediaItems={searchResults} />}
    </section>
  );
};

export default Search;
