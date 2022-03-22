import classes from "./Filter.module.css";
import { useState, useEffect, useReducer } from "react";
import Button from "./Button";
import { fetchGenres } from "../../fetchGenres";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faRefresh } from "@fortawesome/free-solid-svg-icons";
import FilterDivider from "./FilterDivider";
import FilterCard from "./FilterCard";
import RangeInputSlider from "./RangeInputSlider";
import { useSearchParams } from "react-router-dom";

const filterReducer = (state, action) => {
  switch (action.type) {
    case "ADD GENRE":
      return { ...state, genres: [...state.genres, action.input] };

    case "REMOVE GENRE":
      return {
        ...state,
        genres: state.genres.filter((item) => item !== action.input),
      };

    case "ADD RATING":
      return {
        ...state,
        rating: action.input,
      };

    case "ADD YEAR":
      return {
        ...state,
        year: action.input,
      };

    default:
      return state;
  }
};

const Filter = ({ type }) => {
  const [genres, setGenres] = useState([]);
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [isGenresActive, setIsGenresActive] = useState(false);
  const [isRatingActive, setIsRatingActive] = useState(false);
  const [isYearActive, setIsYearActive] = useState(false);
  const [filtersParams, setFiltersParams] = useState({});
  const [filterTouched, setFilterTouched] = useState(false);
  const [testFilters, dispatch] = useReducer(filterReducer, {
    genres: [],
    year: null,
    rating: null,
  });
  const [searchParams, setSearchParams] = useSearchParams();

  const currentGenres = type === "movie" ? genres.movieGenres : genres.tvGenres;

  const addGenreFilterHandler = (input, callback, callbackParam) => {
    if (!testFilters.genres.includes(input)) {
      dispatch({
        type: "ADD GENRE",
        input: input,
      });
    }

    if (testFilters.genres.includes(input)) {
      dispatch({
        type: "REMOVE GENRE",
        input: input,
      });
    }
    callback(!callbackParam);
  };

  const addRatingFilterHandler = (event, variation) => {
    if (variation === "year") {
      dispatch({
        type: "ADD YEAR",
        input: +event.target.value,
      });
    }

    if (variation === "rating") {
      dispatch({
        type: "ADD RATING",
        input: +event.target.value,
      });
    }
  };

  // Reset Search Parameters
  const resetSearchParams = () => {
    setSearchParams({ type: type });
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
    if (testFilters?.genres?.length > 0) {
      setFilterTouched(true);
      setSearchParams({ type: type, genre: testFilters.genres });
    }
    if (testFilters.genres.length === 0) {
      setFilterTouched(false);
      setSearchParams({ type: type });
    }
  }, [testFilters.genres, setSearchParams, type]);

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
          <RangeInputSlider
            variation="rating"
            id="rating-range"
            type="range"
            min="1"
            max="10"
            filterHandler={addRatingFilterHandler}
          />
        )}

        <FilterDivider
          name="Year"
          setIsActive={setIsYearActive}
          isActive={isYearActive}
        />

        {isYearActive && (
          <RangeInputSlider
            variation="year"
            id="year-range"
            type="range"
            min="1900"
            max={`${new Date().getFullYear()}`}
            filterHandler={addRatingFilterHandler}
          />
        )}
      </div>
    </div>
  );
};

export default Filter;
