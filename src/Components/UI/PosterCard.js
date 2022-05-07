import classes from "./PosterCard.module.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PosterCard = ({ media }) => {
  return (
    <div className={classes["poster-card"]}>
      <img src={media.poster} alt={media.title} />

      <div className={classes["title-container"]}>
        <p>{media.title}</p>
      </div>

      <div className={classes["poster-info"]}>
        {media.year && <p>{media.year}</p>}
        <p>
          {media.rating}{" "}
          <span className={classes["rating-star"]}>
            {<FontAwesomeIcon icon={faStar} />}
          </span>{" "}
        </p>
      </div>
    </div>
  );
};

export default PosterCard;
