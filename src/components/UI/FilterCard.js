import { useState, useEffect } from "react";
import classes from "./FilterCard.module.css";

const FilterCard = ({ title, children, filterHandler, isTouched }) => {
  const [active, setActive] = useState(false);

  const clickHandler = () => {
    filterHandler(title.toLowerCase(), setActive, active);
  };

  useEffect(() => {
    !isTouched && setActive(false);
  }, [isTouched]);

  return (
    <div
      onClick={clickHandler}
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
