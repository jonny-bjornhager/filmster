import classes from "./PageNotFound.module.css";

// 404 page

const PageNotFound = ({ message }) => {
  return (
    <div className={classes["page-not-found"]}>
      <p>{message}</p>
      <h3>You tried to request a page that doesn't exist.</h3>
    </div>
  );
};

export default PageNotFound;
