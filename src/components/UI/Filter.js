import classes from "./Filter.module.css";
import { useState, useEffect } from "react";
import Button from "./Button";
import { fetchGenres } from "../../fetchGenres";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faRefresh } from "@fortawesome/free-solid-svg-icons";
import FilterDivider from "./FilterDivider";
import FilterCard from "./FilterCard";
import RangeInputSlider from "./RangeInputSlider";
import { useSearchParams } from "react-router-dom";

const Filter = ({ type }) => {
  const [genres, setGenres] = useState([]);
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [isGenresActive, setIsGenresActive] = useState(false);
  const [isRatingActive, setIsRatingActive] = useState(false);
  const [isYearActive, setIsYearActive] = useState(false);
  const [filtersParams, setFiltersParams] = useState([]);
  const [filterTouched, setFilterTouched] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentGenres = type === "movie" ? genres.movieGenres : genres.tvGenres;

  const addGenreFilterHandler = (input, callback, callbackParam) => {
    if (filtersParams.includes(input.toLowerCase())) {
      const cleanedFilters = filtersParams
        .filter((item) => item !== input)
        .map((item) => item.toLowerCase());

      setFiltersParams(cleanedFilters);
    } else {
      setFiltersParams((prevState) => {
        return [...prevState, input.toLowerCase()];
      });
    }
    callback(!callbackParam);
  };

  // Reset Search Parameters
  const resetSearchParams = () => {
    setSearchParams("");
    setFiltersParams([]);
    setFilterTouched(false);
  };

  // Fetch Genres on Component load
  useEffect(() => {
    let isMounted = true;

    fetchGenres().then((genres) => {
      if (isMounted) {
        setGenres(genres);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Check if user has interacted with filters
  useEffect(() => {
    if (filtersParams.length > 0) {
      setFilterTouched(true);
      setSearchParams({ genre: filtersParams });
    }
    if (filtersParams.length === 0) setFilterTouched(false);
  }, [filtersParams, setSearchParams]);

  return (
    <div className={classes["filter-control"]}>
      <div className={classes["top-buttons"]}>
        <Button
          style={{ width: "45%" }}
          onClick={() => setFilterIsOpen(!filterIsOpen)}
          variant="filter-open"
        >
          Filter &nbsp;
          <FontAwesomeIcon icon={faFilter} />
        </Button>

        <Button
          style={{ width: "45%" }}
          disabled={!filterTouched}
          variant="red"
          onClick={resetSearchParams}
        >
          <FontAwesomeIcon icon={faRefresh} />
        </Button>
      </div>

      <div
        className={
          filterIsOpen
            ? `${classes["filters-container"]} ${classes["visible"]}`
            : `${classes["filters-container"]} ${classes["hidden"]}`
        }
      >
        <FilterDivider
          name="Genres"
          setIsActive={setIsGenresActive}
          isActive={isGenresActive}
        />
        {isGenresActive && (
          <div className={classes["filters"]}>
            {currentGenres.map((genre) => {
              return (
                <FilterCard
                  onClick={addGenreFilterHandler}
                  key={genre.name}
                  title={genre.name}
                  searchParams={searchParams}
                  isTouched={filterTouched}
                />
              );
            })}
          </div>
        )}
        <FilterDivider
          name="Rating"
          setIsActive={setIsRatingActive}
          isActive={isRatingActive}
        />

        {isRatingActive && (
          <RangeInputSlider id="rating-range" type="range" min="1" max="10" />
        )}

        <FilterDivider
          name="Year"
          setIsActive={setIsYearActive}
          isActive={isYearActive}
        />

        {isYearActive && (
          <RangeInputSlider
            id="year-range"
            type="range"
            min="1900"
            max={`${new Date().getFullYear()}`}
          />
        )}
      </div>
    </div>
  );
};

export default Filter;
