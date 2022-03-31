import classes from "./SearchedMedia.module.css";

import PosterCard from "../UI/PosterCard";
import LoadingSpinner from "../UI/LoadingSpinner";

import { useInView } from "react-intersection-observer";

import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const SearchedMedia = ({
  searchResults,
  errorMsg,
  isLoading,
  filtered,
  filterTouched,
  ref,
}) => {
  const { ref: mediaRef, inView: mediaIsVisible } = useInView({
    threshold: 1,
  });

  const noMatchingFilter =
    !isLoading &&
    !errorMsg &&
    filterTouched &&
    searchResults.length !== 0 &&
    filtered.length === 0;

  useEffect(() => {
    console.log(mediaIsVisible);
  }, [mediaIsVisible]);

  return (
    <>
      <div className={classes["searched-media-wrapper"]}>
        {isLoading && (
          <div className={classes["spinner-container"]}>
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && errorMsg && (
          <div className={classes["msg-box"]}>
            <p>{errorMsg}</p>
          </div>
        )}

        {noMatchingFilter && (
          <div className={classes["msg-box"]}>
            <p>No match for current filter.</p>
          </div>
        )}

        {!isLoading && !errorMsg && searchResults.length > 0 && (
          <div ref={mediaRef} className={classes["searched-media-results"]}>
            {searchResults.map((media) => {
              return (
                <Link key={media.id} to={`/${media.mediaType}/${media.id}`}>
                  <PosterCard media={media} />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchedMedia;
