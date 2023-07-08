import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade]);

const categoryIcons = [
  "assets/images/icon/Rabbit.svg",
  "assets/images/icon/fish.svg",
  "assets/images/icon/bird.svg",
  "assets/images/icon/cat.svg",
  "assets/images/icon/dog.svg",
];
const categoryImage = [
  "assets/images/bg/h3-category-5.png",
  "assets/images/bg/h3-category-3.png",
  "assets/images/bg/h3-category-4.png",
  "assets/images/bg/h3-category-2.png",
  "assets/images/bg/h3-category-1.png",
];
function Home3Category() {
  const store = useSelector((state) => state.categories);

  useEffect(() => {
    // console.log(store);
  }, [store]);

  const categoryslide = useMemo(() => {
    return {
      spaceBetween: 24,
      slidesPerView: "auto",
      loop: true,
      speed: 1500,
      autoplay: {
        delay: 2200,
      },
      navigation: {
        nextEl: ".next-btn-11",
        prevEl: ".prev-btn-11",
      },
      breakpoints: {
        280: {
          slidesPerView: 1,
        },
        420: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 5,
        },
        1400: {
          slidesPerView: 6,
        },
        1600: {
          slidesPerView: 6,
        },
      },
    };
  }, [store]);
  return (
    <div className="home3-categoty-area pt-120 mb-120">
      <div className="container">
        <div className="row mb-60">
          <div className="col-lg-12 d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div className="section-title3">
              <h2>
                <img src="assets/images/icon/h3-sec-tt-vect-left.svg" alt="" />
                <span>Browse By Categories</span>
                <img src="assets/images/icon/h3-sec-tt-vect-right.svg" alt="" />
              </h2>
            </div>
            <div className="slider-btn-wrap">
              <div className="slider-btn prev-btn-11">
                <i style={{ cursor: "pointer" }} className="bi bi-arrow-left" />
              </div>
              <div className="slider-btn next-btn-11">
                <i
                  style={{ cursor: "pointer" }}
                  className="bi bi-arrow-right"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 d-flex justify-content-center">
            <Swiper {...categoryslide} className="swiper h3-category-slider">
              <div className="swiper-wrapper">
                {store?.data &&
                  store?.data.map((item, index) => {
                    const iconUrl = categoryIcons[index];
                    const imageUrl = categoryImage[index];
                    return (
                      <div>
                        <SwiperSlide className="swiper-slide">
                          <div className="category-card">
                            <Link legacyBehavior href="/shop">
                              <a className="category-card-inner">
                                <div className="category-card-front">
                                  <div className="category-icon">
                                    <img src={iconUrl} alt="" />
                                  </div>
                                  <div className="content">
                                    <h4>{item.categoriesName}</h4>
                                  </div>
                                </div>
                                <div className="category-card-back">
                                  <img src={imageUrl} alt="" />
                                </div>
                              </a>
                            </Link>
                          </div>
                        </SwiperSlide>
                      </div>
                    );
                  })}
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home3Category;
