import classes from "./RadioButton.module.css";

const RadioButton = ({ choice, children, name }) => {
  return (
    <>
      <input
        className={classes["radio-input"]}
        name={name}
        id={choice}
        type="radio"
        value={choice}
      />
      <label className={classes["radio-label"]} htmlFor={choice}>
        {children}
      </label>
    </>
  );
};

export default RadioButton;
