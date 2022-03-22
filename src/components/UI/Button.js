import classes from "./Button.module.css";

const Button = ({ children, variant, onClick, type, style }) => {
  const btnClasses = variant
    ? `${classes["btn"]} ${classes[`btn-${variant}`]}`
    : `${classes["btn"]}`;

  return (
    <button
      style={style ? style : null}
      onClick={onClick}
      type={type}
      className={btnClasses}
    >
      {children}
    </button>
  );
};

export default Button;
