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

const Filter = ({
  type,
  genreFilterHandler,
  numberFilterHandler,
  resetFiltersHandler,
}) => {
  const [genres, setGenres] = useState([]);
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [isGenresActive, setIsGenresActive] = useState(false);
  const [isRatingActive, setIsRatingActive] = useState(false);
  const [isYearActive, setIsYearActive] = useState(false);
  const [filterTouched, setFilterTouched] = useState(false);
  const [searchParams] = useSearchParams();

  const currentGenres = type === "movie" ? genres.movieGenres : genres.tvGenres;

  const genreIsActive = searchParams.getAll("genre").length === 0;
  const ratingIsActive = searchParams.getAll("rating").length === 0;
  const yearIsActive = searchParams.getAll("year").length === 0;

  const filtersAreActive = genreIsActive && ratingIsActive && yearIsActive;

  const toggleFiltersOpenHandler = () => {
    setFilterIsOpen(!filterIsOpen);
    setIsGenresActive(false);
    setIsRatingActive(false);
    setIsYearActive(false);
  };

  // Check if user has interacted with filters
  useEffect(() => {
    if (!filtersAreActive) {
      setFilterTouched(true);
    }

    if (filtersAreActive) {
      setFilterTouched(false);
    }
  }, [filtersAreActive]);

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

  return (
    <div className={classes["filter-control"]}>
      <div className={classes["top-buttons"]}>
        <Button
          style={{ width: "45%" }}
          onClick={toggleFiltersOpenHandler}
          variant="filter-open"
        >
          Filter &nbsp;
          <FontAwesomeIcon icon={faFilter} />
        </Button>

        <Button
          style={{ width: "45%" }}
          disabled={!filterTouched}
          variant="red"
          onClick={() => {
            setFilterTouched(false);
            resetFiltersHandler();
          }}
        >
          <FontAwesomeIcon icon={faRefresh} />
        </Button>
      </div>

      <div
        className={
          filterIsOpen
            ? `${classes["filters-container"]} ${classes["filters-container-visible"]}`
            : `${classes["filters-container"]} ${classes["filters-container-hidden"]}`
        }
      >
        <FilterDivider
          name="Genres"
          setIsActive={setIsGenresActive}
          isActive={isGenresActive}
        />

        <div
          className={
            isGenresActive
              ? `${classes["filters"]} ${classes["filters-visible"]}`
              : `${classes["filters"]} ${classes["filters-hidden"]}`
          }
        >
          {currentGenres?.map((genre) => {
            return (
              <FilterCard
                genreFilterHandler={genreFilterHandler}
                key={genre.name}
                title={genre.name}
                isTouched={filterTouched}
                setFilterIsTouched={setFilterTouched}
              />
            );
          })}
        </div>

        <FilterDivider
          name="Rating"
          setIsActive={setIsRatingActive}
          isActive={isRatingActive}
        />

        <RangeInputSlider
          variation="rating"
          id="rating-range"
          type="range"
          min="1"
          max="10"
          filterHandler={numberFilterHandler}
          isRatingActive={isRatingActive}
        />

        <FilterDivider
          name="Year"
          setIsActive={setIsYearActive}
          isActive={isYearActive}
        />

        <RangeInputSlider
          variation="year"
          id="year-range"
          type="range"
          min="1900"
          max={`${new Date().getFullYear()}`}
          filterHandler={numberFilterHandler}
          isYearActive={isYearActive}
        />
      </div>
    </div>
  );
};

export default Filter;
