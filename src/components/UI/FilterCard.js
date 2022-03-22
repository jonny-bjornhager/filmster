import classes from "./FilterCard.module.css";

const FilterCard = ({ title, children }) => {
  return (
    <div className={classes["filter-card"]}>{children ? children : title}</div>
  );
};

export default FilterCard;
