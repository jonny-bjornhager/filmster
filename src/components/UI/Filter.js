import classes from "./Filter.module.css";
import { useState, useEffect } from "react";
import Button from "./Button";
import { fetchGenres } from "../../fetchGenres";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faRefresh } from "@fortawesome/free-solid-svg-icons";
import FilterDivider from "./FilterDivider";
import FilterCard from "./FilterCard";

import { useSearchParams } from "react-router-dom";

const Filter = ({
  type,
  genreFilterHandler,
  ratingFilterHandler,
  yearFilterHandler,
  resetFiltersHandler,
  filterTouched,
  setFilterTouched,
}) => {
  const [genres, setGenres] = useState([]);
  const [isGenresActive, setIsGenresActive] = useState(false);
  const [isRatingActive, setIsRatingActive] = useState(false);
  const [isYearActive, setIsYearActive] = useState(false);
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const currentGenres = type === "movie" ? genres.movieGenres : genres.tvGenres;

  const genreIsActive = searchParams.getAll("genre").length === 0;
  const ratingIsActive = searchParams.getAll("rating").length === 0;
  const yearIsActive = searchParams.getAll("year").length === 0;

  const filtersAreActive = genreIsActive && ratingIsActive && yearIsActive;

  // Toggles if the filter panel is open or closed
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
  }, [filtersAreActive, setFilterTouched]);

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
                filterHandler={genreFilterHandler}
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

        <div
          className={
            isRatingActive
              ? `${classes["filters"]} ${classes["filters-visible"]}`
              : `${classes["filters"]} ${classes["filters-hidden"]}`
          }
        >
          <FilterCard
            filterHandler={ratingFilterHandler}
            key={"Ascending"}
            title={"Ascending"}
            isTouched={filterTouched}
            setFilterIsTouched={setFilterTouched}
          />

          <FilterCard
            filterHandler={ratingFilterHandler}
            key={"Descending"}
            title={"Descending"}
            isTouched={filterTouched}
            setFilterIsTouched={setFilterTouched}
          />
        </div>
        <FilterDivider
          name="Year"
          setIsActive={setIsYearActive}
          isActive={isYearActive}
        />
        <div
          className={
            isYearActive
              ? `${classes["filters"]} ${classes["filters-visible"]}`
              : `${classes["filters"]} ${classes["filters-hidden"]}`
          }
        >
          <FilterCard
            filterHandler={yearFilterHandler}
            key={"Ascending"}
            title={"Ascending"}
            isTouched={filterTouched}
            setFilterIsTouched={setFilterTouched}
          />
          <FilterCard
            filterHandler={yearFilterHandler}
            key={"Descending"}
            title={"Descending"}
            isTouched={filterTouched}
            setFilterIsTouched={setFilterTouched}
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
