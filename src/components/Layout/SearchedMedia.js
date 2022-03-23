import classes from "./SearchedMedia.module.css";
import { useState } from "react";

import PosterCard from "../UI/PosterCard";
import Filter from "../UI/Filter";
import { Link } from "react-router-dom";

const SearchedMedia = ({
  mediaItems,
  errorMsg,
  type,
  genreFilterHandler,
  numberFilterHandler,
  resetFiltersHandler,
}) => {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const openFiltersHandler = () => {
    setFiltersOpen(!filtersOpen);
  };

  const itemsNotExist = mediaItems.length === 0;
  const emptyOrError = errorMsg ? (
    <p>{errorMsg}</p>
  ) : (
    <p>We couldn't find anything matching your search, Please try again.</p>
  );

  return (
    <>
      <div className={classes["searched-media-wrapper"]}>
        <div className={classes["filter-media-container"]}>
          {!itemsNotExist && (
            <Filter
              filtersOpen={filtersOpen}
              openFiltersHandler={openFiltersHandler}
              type={type}
              genreFilterHandler={genreFilterHandler}
              numberFilterHandler={numberFilterHandler}
              resetFiltersHandler={resetFiltersHandler}
            />
          )}
        </div>
        {itemsNotExist && (
          <div className={classes["error-box"]}>{emptyOrError}</div>
        )}
        <div className={classes["searched-media-results"]}>
          {mediaItems.map((media) => {
            return (
              <Link key={media.id} to={`/${media.mediaType}/${media.id}`}>
                <PosterCard media={media} />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SearchedMedia;
