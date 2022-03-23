import classes from "./RangeInputSlider.module.css";
import { useState } from "react";

const RangeInputSlider = ({
  id,
  type,
  min,
  max,
  filterHandler,
  variation,
  isYearActive,
  isRatingActive,
}) => {
  const [rangeSliderNumber, setRangeSliderNumber] = useState(min);

  const changeHandler = (event) => {
    setRangeSliderNumber(event.target.value);
    filterHandler(event, variation);
  };

  const checkVariant = () => {
    if (variation === "rating" && isRatingActive) {
      return `${classes["range-slider-container"]} ${classes["slider-visible"]}`;
    } else if (variation === "year" && isYearActive) {
      return `${classes["range-slider-container"]} ${classes["slider-visible"]}`;
    } else {
      return `${classes["range-slider-container"]} ${classes["slider-hidden"]}`;
    }
  };

  return (
    <div className={`${checkVariant()}`}>
      {rangeSliderNumber === max ? (
        <p>Show only {max}</p>
      ) : (
        <p>
          Filter between {rangeSliderNumber} and {max}
        </p>
      )}
      <input
        value={rangeSliderNumber}
        onChange={changeHandler}
        id={id}
        type={type}
        min={min}
        max={max}
      />
    </div>
  );
};

export default RangeInputSlider;
