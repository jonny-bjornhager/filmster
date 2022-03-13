import classes from "./Home.module.css";
import Header from "../Layout/Header";
import CardSwiper from "../UI/CardSwiper";
import { popularMoviesUrl, popularTvShowsUrl } from "../../api_urls";
import { useFetchPopularMedia } from "../../hooks/useFetchPopularMedia";

const Home = () => {
  const { media } = useFetchPopularMedia(popularMoviesUrl);

  return (
    <>
      <Header movies={media.slice(0, 6)} />
      <section className={classes.popular}>
        <CardSwiper type="movie" fetchUrl={popularMoviesUrl} />
        <CardSwiper type="tv" fetchUrl={popularTvShowsUrl} />
      </section>
    </>
  );
};

export default Home;
