import classes from "./Home.module.css";
import Header from "../Layout/Header";

import { popularMoviesUrl } from "../../api_urls";
import { useFetchPopularMedia } from "../../hooks/useFetchPopularMedia";

const Home = () => {
  const { media } = useFetchPopularMedia(popularMoviesUrl);

  return (
    <>
      <Header movies={media} />
      <section className={classes.popular}></section>
    </>
  );
};

export default Home;
