import classes from "./RadioButton.module.css";

const RadioButton = ({
  choice,
  children,
  name,
  defaultChecked,
  mediaTypeChangeHandler,
}) => {
  return (
    <>
      <input
        onClick={mediaTypeChangeHandler}
        className={classes["radio-input"]}
        name={name}
        id={choice}
        type="radio"
        value={choice}
        defaultChecked={defaultChecked}
      />
      <label className={classes["radio-label"]} htmlFor={choice}>
        {children}
      </label>
    </>
  );
};

export default RadioButton;