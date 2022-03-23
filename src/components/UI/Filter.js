import classes from "./Filter.module.css";
import { useState, useEffect } from "react";
import Button from "./Button";
import { fetchGenres } from "../../fetchGenres";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faRefresh } from "@fortawesome/free-solid-svg-icons";
import FilterDivider from "./FilterDivider";
import FilterCard from "./FilterCard";
import RangeInputSlider from "./RangeInputSlider";

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

  const currentGenres = type === "movie" ? genres.movieGenres : genres.tvGenres;

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
                  onClick={genreFilterHandler}
                  key={genre.name}
                  title={genre.name}
                  isTouched={filterTouched}
                  setFilterTouched={setFilterTouched}
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
            filterHandler={numberFilterHandler}
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
            filterHandler={numberFilterHandler}
          />
        )}
      </div>
    </div>
  );
};

export default Filter;
