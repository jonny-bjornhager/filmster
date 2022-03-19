import classes from "./PosterCard.module.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PosterCard = ({ media }) => {
  return (
    <div className={classes["poster-card"]}>
      <img src={media.poster} alt={media.title} />
      <div className={classes["poster-info"]}>
        <div className={classes["poster-top"]}>
          <div className={classes["poster-rating"]}>
            <p>{media.rating}</p>
          </div>
          <div
            className={`${classes["poster-title"]} ${classes["trailing-text"]}`}
          >
            <p>{media.title}</p>
          </div>
        </div>
        <div className={classes["poster-year"]}>
          <p>{media.year}</p>
        </div>
      </div>
    </div>
  );
};

export default PosterCard;
