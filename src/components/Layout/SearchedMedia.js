import classes from "./SearchedMedia.module.css";

import PosterCard from "../UI/PosterCard";
import { Link } from "react-router-dom";

const SearchedMedia = ({ mediaItems }) => {
  console.log(mediaItems);

  return (
    <div className={classes["searched-media-wrapper"]}>
      {mediaItems.map((media) => {
        return (
          <Link to={`/${media.mediaType}/${media.id}`}>
            <PosterCard key={media.id} media={media} />
          </Link>
        );
      })}
    </div>
  );
};

export default SearchedMedia;
