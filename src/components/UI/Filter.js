import classes from "./Filter.module.css";
import { useState, useEffect } from "react";
import Button from "./Button";
import { fetchGenres } from "../../fetchGenres";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import FilterDivider from "./FilterDivider";
import FilterCard from "./FilterCard";
import RangeInputSlider from "./RangeInputSlider";

const Filter = ({ type }) => {
  const [genres, setGenres] = useState([]);
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [isTypesActive, setIsTypesActive] = useState(false);
  const [isGenresActive, setIsGenresActive] = useState(false);
  const [isRatingActive, setIsRatingActive] = useState(false);
  const [isYearActive, setIsYearActive] = useState(false);

  const mediaTypes = ["Movies", "Tv-Shows"];

  const currentGenres = type === "movie" ? genres.movieGenres : genres.tvGenres;

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
      <Button
        style={{ width: "10rem" }}
        onClick={() => setFilterIsOpen(!filterIsOpen)}
        variant="filter-open"
      >
        Filter &nbsp;
        <FontAwesomeIcon icon={faFilter} />
      </Button>
      {filterIsOpen && (
        <div className={classes["filters-container"]}>
          <FilterDivider
            name="Type"
            setIsActive={setIsTypesActive}
            isActive={isTypesActive}
          />
          {isTypesActive && (
            <div className={classes["filters"]}>
              {mediaTypes.map((media) => {
                return <FilterCard key={media} title={media} />;
              })}
            </div>
          )}
          <FilterDivider
            name="Genres"
            setIsActive={setIsGenresActive}
            isActive={isGenresActive}
          />
          {isGenresActive && (
            <div className={classes["filters"]}>
              {currentGenres.map((genre) => {
                return <FilterCard key={genre.name} title={genre.name} />;
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
      )}
      {filterIsOpen && (
        <Button variant="red" style={{ width: "10rem", marginTop: "1.6rem" }}>
          Apply
        </Button>
      )}
    </div>
  );
};

export default Filter;
