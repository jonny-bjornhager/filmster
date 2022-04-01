import classes from "./SearchedMedia.module.css";

import PosterCard from "../UI/PosterCard";
import LoadingSpinner from "../UI/LoadingSpinner";
import Button from "../UI/Button";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const SearchedMedia = ({
  searchResults,
  errorMsg,
  isLoading,
  filtered,
  filterTouched,
  fetchMoreHandler,
  fetchMoreIsLoading,
}) => {
  const [pageNum, setPageNum] = useState(1);

  const noMatchingFilter =
    !isLoading &&
    !errorMsg &&
    filterTouched &&
    searchResults.length !== 0 &&
    filtered.length === 0;

  useEffect(() => {
    if (pageNum === 1) return;
    fetchMoreHandler(pageNum);
  }, [pageNum, fetchMoreHandler]);

  const loadMore = () => {
    setPageNum((prevPageNum) => prevPageNum + 1);
  };

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
        {!isLoading && !errorMsg && searchResults.length > 0 && (
          <div className={classes["load-more-container"]}>
            {fetchMoreIsLoading && <LoadingSpinner />}
            {!fetchMoreIsLoading && (
              <Button
                style={{ margin: "0 auto", display: "block" }}
                variant="red"
                onClick={loadMore}
              >
                Load more
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchedMedia;
