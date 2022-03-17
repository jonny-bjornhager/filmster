import classes from "./PosterCard.module.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PosterCard = ({ media }) => {
  return (
    <div className={classes["poster-card"]}>
      <img src={media.poster} alt={media.title} />
      <div className={classes["poster-card-info"]}>
        <p>
          {media.rating}{" "}
          <span className={classes.rating}>
            <FontAwesomeIcon icon={faStar} />
          </span>
        </p>
        <p className={classes["trailing-text"]}>{media.title}</p>
      </div>
    </div>
  );
};

export default PosterCard;
