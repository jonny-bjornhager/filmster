import classes from "./FilterDivider.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const FilterDivider = ({ name, setIsActive, isActive }) => {
  return (
    <div
      onClick={() => setIsActive(!isActive)}
      className={
        !isActive
          ? classes["filter-divider"]
          : `${classes["filter-divider"]} ${classes["filter-divider-active"]}`
      }
    >
      <FontAwesomeIcon icon={faChevronDown} />
      &nbsp; {name}
    </div>
  );
};

export default FilterDivider;
