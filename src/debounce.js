// Function that delays the user input send to API to reduce
// API load
const debounce = (callback, delay) => {
  let timeout;
  console.log("inital load");
  return (...args) => {
    console.log("last load");
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

export default debounce;
