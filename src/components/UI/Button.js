import classes from "./Button.module.css";

const Button = ({ children, variant, onClick, type, active }) => {
  const btnClasses = variant
    ? `${classes["btn"]} ${classes[`btn-${variant}`]}`
    : `${classes["btn"]}`;

  return (
    <button
      style={{ backgroundColor: active ? "#af0202" : null }}
      onClick={onClick}
      type={type}
      className={btnClasses}
    >
      {children}
    </button>
  );
};

export default Button;
