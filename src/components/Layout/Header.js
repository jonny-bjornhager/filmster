import classes from "./Header.module.css";
import Button from "../UI/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "../../../node_modules/swiper/swiper-bundle.css";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Header = ({ movies }) => {
  return (
    <header className={classes.header}>
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
      >
        {movies.map((movie) => {
          return (
            <SwiperSlide key={movie.id}>
              <div
                className={classes["slide-item"]}
                style={{
                  backgroundImage: `url(${movie.backdrop})`,
                }}
              >
                <div className={classes["slider-content"]}>
                  <LazyLoadImage
                    src={movie.poster}
                    alt={movie.title}
                    effect="blur"
                    placeholderSrc={movie.poster_placeholder}
                  />

                  <div className={classes["slider-info"]}>
                    <h3>{movie.title}</h3>

                    <p>{`${movie.overview}`}</p>
                    <Button variant="red-glow">
                      <Link to={`movie/${movie.id}`}>Watch Trailer</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </header>
  );
};

export default Header;
