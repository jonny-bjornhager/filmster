import classes from "./RadioButton.module.css";

const RadioButton = ({
  choice,
  children,
  name,
  defaultChecked,
  mediaTypeChangeHandler,
  filterChangeHandler,
  functionType,
  labelType,
  radioBtnType,
  filterValue,
}) => {
  return (
    <>
      <input
        onClick={
          functionType === "change"
            ? mediaTypeChangeHandler
            : filterChangeHandler
        }
        className={classes[radioBtnType]}
        name={name}
        id={choice}
        type="radio"
        value={choice ? choice : filterValue}
        defaultChecked={defaultChecked}
      />
      <label className={classes[labelType]} htmlFor={choice}>
        {children}
      </label>
    </>
  );
};

export default RadioButton;
