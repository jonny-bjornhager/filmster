import { useState, useEffect } from "react";
import classes from "./FilterCard.module.css";

const FilterCard = ({
  title,
  children,
  onClick,
  isTouched,
  setFilterTouched,
}) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    !isTouched && setActive(false);
  }, [isTouched]);

  return (
    <div
      onClick={() => {
        onClick(title.toLowerCase(), setActive, active);
      }}
      className={
        !active
          ? classes["filter-card"]
          : `${classes["filter-card"]} ${classes["active"]}`
      }
    >
      {children ? children : title}
    </div>
  );
};

export default FilterCard;
