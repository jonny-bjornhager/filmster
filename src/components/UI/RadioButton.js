import classes from "./RadioButton.module.css";

const RadioButton = ({
  onClick,
  choice,
  children,
  name,
  defaultChecked,
  labelType,
  radioBtnType,
  filterValue,
}) => {
  return (
    <>
      <input
        onClick={onClick}
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
