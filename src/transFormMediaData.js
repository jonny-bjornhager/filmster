const transformMediaData = (inputArray) => {
  return inputArray.map((item) => {
    return {
      id: item.id,
      title: item["original_title"] || item["original_name"],
      poster:
        item.poster_path !== null
          ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
          : "https://i.ibb.co/LSQTBd4/poster-unavailable.png",
      genre_ids: item.genre_ids,
      rating: item.vote_average,
      year:
        new Date(item.release_date).getFullYear() ||
        new Date(item.first_air_date).getFullYear(),
    };
  });
};

export default transformMediaData;
