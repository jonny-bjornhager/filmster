import classes from "./SearchedMedia.module.css";

import PosterCard from "../UI/PosterCard";
import { Link } from "react-router-dom";

const SearchedMedia = ({ mediaItems }) => {
  return (
    <div className={classes["searched-media-wrapper"]}>
      {mediaItems.map((media) => {
        return (
          <Link key={media.id} to={`/${media.mediaType}/${media.id}`}>
            <PosterCard media={media} />
          </Link>
        );
      })}
    </div>
  );
};

export default SearchedMedia;
