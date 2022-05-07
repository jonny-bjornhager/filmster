import classes from "./Trailer.module.css";

const Trailer = ({ url, closeTrailerModal }) => {
  return (
    <>
      {url !== null && (
        <>
          <div onClick={closeTrailerModal} className={classes.close}>
            X
          </div>
          <iframe
            width="560"
            height="315"
            title="Trailer"
            className={classes.trailer}
            src={`${url}`}
            frameBorder="0"
            allow="autoplay"
            allowFullScreen={true}
          ></iframe>
        </>
      )}

      {url === null && (
        <>
          <div onClick={closeTrailerModal} className={classes.close}>
            X
          </div>
          <div className={classes["trailer-error"]}>
            <p>No trailer available</p>
          </div>
        </>
      )}
    </>
  );
};

export default Trailer;
