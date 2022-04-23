import classes from "./PageNotFound.module.css";

const PageNotFound = ({ message }) => {
  return (
    <div className={classes["page-not-found"]}>
      <p>{message}</p>
      <h3>You tried to request a page that doesn't exist.</h3>
    </div>
  );
};

export default PageNotFound;
