import classes from "./RangeInputSlider.module.css";
import { useState } from "react";

const RangeInputSlider = ({ id, type, min, max, filterHandler, variation }) => {
  const [rangeSliderNumber, setRangeSliderNumber] = useState(min);

  const changeHandler = (event) => {
    setRangeSliderNumber(event.target.value);
    filterHandler(event, variation);
  };

  return (
    <div className={classes["range-slider-container"]}>
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
