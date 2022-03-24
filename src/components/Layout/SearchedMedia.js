import classes from "./SearchedMedia.module.css";

import PosterCard from "../UI/PosterCard";
import LoadingSpinner from "../UI/LoadingSpinner";

import { Link } from "react-router-dom";

const SearchedMedia = ({ searchResults, errorMsg, isLoading }) => {
  return (
    <>
      <div className={classes["searched-media-wrapper"]}>
        {isLoading && (
          <div className={classes["spinner-container"]}>
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && errorMsg && (
          <div className={classes["error-box"]}>
            <p>{errorMsg}</p>
          </div>
        )}

        {!isLoading && !errorMsg && (
          <div className={classes["searched-media-results"]}>
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
