import classes from "../Pages/MediaInfo.module.css";
import Modal from "../UI/Modal";
import Trailer from "../UI/Trailer";

import { useState } from "react";
import { useFetchSingleMedia } from "../../hooks/useFetchSingleMedia";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faStar,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LoadingSpinner from "../UI/LoadingSpinner";
import Button from "../UI/Button";

const MediaInfo = ({ type }) => {
  const { id } = useParams();
  const { media, isLoading, errorMessage } = useFetchSingleMedia(id, type);

  const [modalOpen, setModalOpen] = useState(false);

  const toggleModalHandler = () => {
    setModalOpen(!modalOpen);
  };

  if (errorMessage)
    return (
      <div className={classes.error}>
        <p>{`${errorMessage}`}</p>
        <p>Maybe try again with a different resource?</p>
      </div>
    );

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && media && (
        <div className={classes["media"]}>
          <div
            style={{ backgroundImage: `url(${media.backdrop})` }}
            className={classes["media-backdrop"]}
          >
            <div className={classes["back-container"]}>
              <Link className={classes["back-link"]} to="/">
                <Button variant="red">
                  <FontAwesomeIcon icon={faChevronLeft} />
                  &nbsp;Back
                </Button>
              </Link>
            </div>

            <div className={classes["media-intro"]}>
              <LazyLoadImage
                src={media.poster}
                placeholderSrc={media.poster_placeholder}
                alt={media.original_title}
                effect="blur"
              />

              <div className={classes["info-text"]}>
                <h2 className={classes.title}>{media.title}</h2>
                <div className={classes["text-wrapper"]}>
                  <p className={classes.genres}>{media.genres_names}</p>
                </div>
              </div>
            </div>
            {!modalOpen && (
              <FontAwesomeIcon
                onClick={toggleModalHandler}
                className={classes["play"]}
                icon={faPlay}
              />
            )}
          </div>
          <div className={classes["main-content"]}>
            <div className={classes["media-information"]}>
              <div
                className={`${classes["overview"]} ${classes["info-block"]}`}
              >
                <p>{media.overview}</p>
              </div>
              <div className={`${classes["info-block"]}`}>
                <span>{type === "tv" ? "Created by" : "Directed by"}</span>
                <p>{media?.credits?.directed_by}</p>
              </div>
              <div className={classes["info-block"]}>
                <span>Cast</span>
                <p>{media.popular_cast}</p>
              </div>
              <div className={classes["info-block"]}>
                <span>Original title</span>
                <p>{media.original_title}</p>
              </div>
              <div className={classes["info-block"]}>
                <span>Original language</span>
                <p>{media.original_language}</p>
              </div>

              <div className={classes["info-block"]}>
                <span>Rating</span>
                <p>
                  {media.rating}
                  <FontAwesomeIcon
                    onClick={toggleModalHandler}
                    className={classes["star"]}
                    icon={faStar}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {modalOpen && (
        <Modal modalToggler={toggleModalHandler}>
          <Trailer
            closeTrailerModal={toggleModalHandler}
            url={media.trailerUrl}
          />
        </Modal>
      )}
    </>
  );
};

export default MediaInfo;
