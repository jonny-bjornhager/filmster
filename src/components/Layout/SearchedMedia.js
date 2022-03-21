import classes from "./SearchedMedia.module.css";

import PosterCard from "../UI/PosterCard";
import { Link } from "react-router-dom";

const SearchedMedia = ({ mediaItems, errorMsg, filtered }) => {
  const itemsNotExist = mediaItems.length === 0;
  const emptyOrError = errorMsg ? (
    <p>{errorMsg}</p>
  ) : (
    <p>We couldn't find anything matching your search, Please try again.</p>
  );

  return (
    <>
      {itemsNotExist && (
        <div className={classes["error-box"]}>{emptyOrError}</div>
      )}
      <div className={classes["searched-media-wrapper"]}>
        {mediaItems &&
          mediaItems.map((media) => {
            return (
              <Link key={media.id} to={`/${media.mediaType}/${media.id}`}>
                <PosterCard media={media} />
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default SearchedMedia;
