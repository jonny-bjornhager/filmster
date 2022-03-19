import classes from "./RadioButton.module.css";

const RadioButton = () => {
  return (
    <div className={classes["radio-control"]}>
      <label htmlFor="search-type-choice"></label>
      <input id="search-type-choice" type="radio" />
    </div>
  );
};

export default RadioButton;
