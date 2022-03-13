import classes from "./Home.module.css";
import { popularMoviesUrl } from "../../api_urls";
import { useFetchPopularMedia } from "../../hooks/useFetchPopularMedia";

const Home = () => {
  const { media } = useFetchPopularMedia(popularMoviesUrl);
  console.log(media);

  return (
    <>
      <section className={classes.popular}></section>
    </>
  );
};

export default Home;
