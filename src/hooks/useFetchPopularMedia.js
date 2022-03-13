import { useState, useCallback, useEffect } from "react";

export const useFetchPopularMedia = (url) => {
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchPopular = useCallback(async () => {
    setIsLoading(true);

    try {
      const request = await fetch(url);

      const { results } = await request.json();

      // Filter movies that has no backdrop and map
      // through movies array

      return results
        .filter((item) => item.backdrop_path !== null)
        .map((item) => {
          return {
            id: item.id,
            title: item["original_title"] || item["original_name"],
            backdrop: `https://image.tmdb.org/t/p/original/${item.backdrop_path}`,
            backdrop_placeholder: `https://image.tmdb.org/t/p/w300/${item.backdrop_path}`,
            poster: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
            poster_placeholder: `https://image.tmdb.org/t/p/w92/${item.poster_path}`,
            overview: item.overview,
            genres: item.genre_ids,
            rating: item.vote_average,
          };
        });

      // Catch errors
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    }
  }, [url]);

  useEffect(() => {
    let isMounted = true;
    fetchPopular().then((data) => {
      if (isMounted) {
        setMedia(data);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [fetchPopular]);

  return { media, isLoading, errorMessage };
};
