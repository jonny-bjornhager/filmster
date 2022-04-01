import { useState, useCallback, useEffect } from "react";
import removeDuplicate from "../removeDuplicateItem";

// Gets the trailers for either a Tv-Show or Movie
const getTrailer = (inputArray) => {
  const officialTrailer = inputArray.results.filter(
    (video) =>
      video.official === true &&
      video.site === "YouTube" &&
      video.type === "Trailer"
  );

  const nonOfficialTrailer = inputArray.results.filter(
    (video) =>
      video.official === false &&
      video.site === "YouTube" &&
      video.type === "Trailer"
  );

  if (officialTrailer.length === 0 && nonOfficialTrailer.length === 0)
    return null;

  if (officialTrailer.length === 0)
    return `https://www.youtube.com/embed/${nonOfficialTrailer[0].key}?autoplay=1`;

  if (officialTrailer.length > 0)
    return `https://www.youtube.com/embed/${officialTrailer[0].key}?autoplay=1`;
};

export const useFetchSingleMedia = (id, type) => {
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchMediaData = useCallback(async () => {
    setIsLoading(true);

    try {
      // Fetch details about movie
      const request = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos,images,credits`
      );

      if (!request.ok) {
        throw new Error("An error has occured.");
      }

      const response = await request.json();

      const collection = response.belongs_to_collection
        ? {
            id: response.belongs_to_collection.id,
            name: response.belongs_to_collection.name,
            poster: `https://image.tmdb.org/t/p/w500${response.belongs_to_collection.poster_path}`,
          }
        : null;

      const castData = response.credits.cast.map((member) => {
        return {
          id: member.id,
          name: member["original_name"],
          character: member.character,
          creditId: member["credit_id"],
          popularity: member.popularity,
          gender: member.gender === 2 ? "Male" : "Female",
          profileImage_small: `https://image.tmdb.org/t/p/w45${member["profile_path"]}`,
          profileImage_medium: `https://image.tmdb.org/t/p/w185${member["profile_path"]}`,
          profileImage_large: `https://image.tmdb.org/t/p/w300${member["profile_path"]}`,
          profileImage_original: `https://image.tmdb.org/t/p/original${member["profile_path"]}`,
        };
      });

      // Remove duplicates in the cast array
      const cast = removeDuplicate(castData, "name");

      // Sort cast based on popularity
      const popularCast = response.credits.cast
        .sort((a, b) => {
          return a.popularity + b.popularity;
        })
        .map((member) => member.name);

      const crewData = response.credits.crew
        ? response.credits.crew.map((member) => {
            return {
              id: member.id,
              name: member["original_name"],
              creditId: member["credit_id"],
              popularity: member.popularity,
              gender: member.gender === 2 ? "Male" : "Female",
              profileImage_small: `https://image.tmdb.org/t/p/w45${member["profile_path"]}`,
              profileImage_medium: `https://image.tmdb.org/t/p/w185${member["profile_path"]}`,
              profileImage_large: `https://image.tmdb.org/t/p/w300${member["profile_path"]}`,
              profileImage_original: `https://image.tmdb.org/t/p/original${member["profile_path"]}`,
            };
          })
        : null;

      // Remove duplicates in the crew array
      const crew = removeDuplicate(crewData, "name");

      const directed_by = response.credits.crew
        .filter((member) => member.job === "Director")
        .map((member) => member.name)
        .join(", ");

      const created_by = response.created_by
        ? response.created_by.map((member) => member.name).join(", ")
        : null;

      const credits = {
        directed_by: directed_by ? directed_by : created_by,
        cast,
        crew,
      };

      const trailer = getTrailer(response.videos);

      const genres_names = response.genres
        .map((genre) => genre.name)
        .join(", ");
      const genres_ids = response.genres.map((genre) => genre.id);

      return {
        id: response.id,
        title: response.title || response.original_name,
        original_title: response.original_title || response.original_name,
        genres_names,
        genres_ids,
        budget: response.budget ? response.budget : null,
        credits,
        poster: `https://image.tmdb.org/t/p/w500${response.poster_path}`,
        poster_placeholder: `https://image.tmdb.org/t/p/w92${response.poster_path}`,
        backdrop:
          response.images.backdrops.length >= 1
            ? `https://image.tmdb.org/t/p/original${response.images.backdrops[0].file_path}`
            : null,
        collection,
        released: response.realease_date ? response.realease_date : null,
        trailerUrl: trailer,
        overview: response.overview,
        original_language: response.spoken_languages[0].english_name,
        popular_cast: popularCast.slice(0, 5).join(", "),
        rating: response.vote_average,
      };
    } catch (error) {
      setErrorMessage(error.message);
    }
  }, [id, type]);

  useEffect(() => {
    let isMounted = true;
    fetchMediaData().then((data) => {
      if (isMounted) {
        setMedia(data);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [fetchMediaData]);

  return {
    media,
    isLoading,
    errorMessage,
  };
};
