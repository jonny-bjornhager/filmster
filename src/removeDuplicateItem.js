// Checks for duplicate items in an array of objects
const removeDuplicate = (inputArray, param) => {
  return inputArray.filter(
    (value, index, self) =>
      index ===
      self.findIndex(
        (t) => t.place === value.place && t[param] === value[param]
      )
  );
};

export default removeDuplicate;
