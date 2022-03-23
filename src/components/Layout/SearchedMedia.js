import classes from "./SearchedMedia.module.css";

import PosterCard from "../UI/PosterCard";
import LoadingSpinner from "../UI/LoadingSpinner";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const SearchedMedia = ({ searchResults, errorMsg, isLoading }) => {
  const itemsNotExist = searchResults.length === 0;
  const emptyOrError = errorMsg ? (
    <p>{errorMsg}</p>
  ) : (
    <p>We couldn't find anything matching your search, Please try again.</p>
  );

  return (
    <>
      <div className={classes["searched-media-wrapper"]}>
        {isLoading && (
          <div className={classes["spinner-container"]}>
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && itemsNotExist && (
          <div className={classes["error-box"]}>{emptyOrError}</div>
        )}

        <div className={classes["searched-media-results"]}>
          {!isLoading &&
            searchResults.map((media) => {
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
