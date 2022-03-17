import classes from "./SearchedMedia.module.css";

import PosterCard from "../UI/PosterCard";

const SearchedMedia = ({ mediaItems }) => {
  return (
    <div className={classes["searched-media-wrapper"]}>
      {mediaItems.map((media) => {
        return <PosterCard key={media.id} media={media} />;
      })}
    </div>
  );
};

export default SearchedMedia;
