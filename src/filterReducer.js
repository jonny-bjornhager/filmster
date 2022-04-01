const filterReducer = (state, action) => {
  switch (action.type) {
    case "MOVIE":
      return { ...state, type: action.input };

    case "TV": {
      return { ...state, type: action.input };
    }

    case "ADD GENRE":
      return { ...state, genre: [action.input] };

    case "APPEND GENRE":
      return { ...state, genre: [...state.genre, action.input] };

    case "REMOVE GENRE":
      return {
        ...state,
        genre: state.genre.filter((item) => item !== action.input),
      };

    case "RATING ASCENDING":
      return {
        ...state,
        rating: [action.input],
      };

    case "RATING DESCENDING":
      return {
        ...state,
        rating: [action.input],
      };

    case "REMOVE RATING":
      return {
        ...state,
        rating: state.rating.filter((item) => item !== action.input),
      };

    case "YEAR ASCENDING":
      return {
        ...state,
        year: [action.input],
      };

    case "YEAR DESCENDING":
      return {
        ...state,
        year: [action.input],
      };

    case "REMOVE YEAR":
      return {
        ...state,
        year: state.year.filter((item) => item !== action.input),
      };

    case "CHANGE TYPE":
      return {
        ...state,
        type: action.input,
      };

    case "FILTER": {
      return {
        ...state,
        filtered: action.input,
      };
    }

    case "RESET":
      return {
        type: action.input,
      };

    default:
      return state;
  }
};

export default filterReducer;
