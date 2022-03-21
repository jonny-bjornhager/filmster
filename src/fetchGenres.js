import { tvShowsGenresUrl, moviesGenresUrl } from "./api_urls";

export const fetchGenres = async () => {
  const movieGenresRequest = await fetch(moviesGenresUrl);
  const tvGenresRequest = await fetch(tvShowsGenresUrl);

  const { genres: movieGenres } = await movieGenresRequest.json();
  const { genres: tvGenres } = await tvGenresRequest.json();

  return {
    movieGenres,
    tvGenres,
  };
};
