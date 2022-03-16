import classes from "./CardSwiper.module.css";
import { useState, useEffect } from "react";
import { useFetchPopularMedia } from "../../hooks/useFetchPopularMedia";

import { Link } from "react-router-dom";
import SwiperCore, { Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const CardSwiper = ({ type, fetchUrl }) => {
  const { media: movies } = useFetchPopularMedia(fetchUrl);
  const [popularType, setPopularType] = useState("");

  useEffect(() => {
    switch (type) {
      case "movie":
        setPopularType("Movies");

        break;

      case "tv":
        setPopularType("Tv-shows");

        break;

      default:
        setPopularType("");
    }
  }, [type]);

  const linkType = type === "movie" ? "movie" : "tv-show";

  const swiperBreakPoints = {
    280: { slidesPerView: 2, spaceBetween: 10 },
    320: { slidesPerView: 2.5, spaceBetween: 10 },
    414: { slidesPerView: 3, spaceBetween: 15 },
    750: { slidesPerView: 3, spaceBetween: 50 },
    768: { slidesPerView: 4, spaceBetween: 30 },
    910: { slidesPerView: 4.5, spaceBetween: 30 },
    1080: { slidesPerView: 3.5 },
    1440: { slidesPerView: 4.5 },
  };

  SwiperCore.use([Scrollbar]);

  return (
    <>
      <div className={classes["card-swiper"]}>
        <h3>Popular {popularType}</h3>
        <Swiper
          className={classes["swiper"]}
          grabCursor={true}
          slidesPerView={4.5}
          spaceBetween={50}
          draggable={true}
          breakpoints={swiperBreakPoints}
        >
          {movies.map((movie, i) => {
            return (
              <SwiperSlide key={`scroll-${i}`}>
                <Link to={`/${linkType}/${movie.id}`}>
                  <div className={classes.scroller}>
                    {/* <img src={movie?.poster} alt="" /> */}
                    <LazyLoadImage
                      src={movie.poster}
                      effect="blur"
                      placeholderSrc={movie.poster_placeholder}
                      alt={movie.title}
                    />
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default CardSwiper;
