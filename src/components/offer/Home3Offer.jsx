import Link from "next/link";
import React, { useMemo } from "react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import CounterTimer from "../common/CountdownTimer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade]);
function Home3Offer() {
  const store = useSelector((state) => state.products);
  // console.log("object", store);
  const offerSldier = useMemo(() => {
    return {
      slidesPerView: "auto",
      spaceBetween: 12,
      // direction: 'vertical',
      //  effect: 'slide',

      loop: true,
      speed: 1500,
      autoplay: {
        delay: 3000,
      },
      navigation: {
        nextEl: ".next-btn-15",
        prevEl: ".prev-btn-15",
      },
    };
  }, []);

  return (
    <div className="h3-offer-area mb-120">
      <div className="container-fluid p-0 overflow-hidden">
        <div className="row">
          <div className="col-lg-6 p-0">
            <div className="offer-left">
              <div className="offer-content">
                <span>50% Off</span>
                <h2>Ingredients for dogs with packages.</h2>
                <Link legacyBehavior href="/shop">
                  <a className="primary-btn6">Shop Now</a>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6 p-0">
            <div className="offer-right">
              <div className="slider-btn-wrap">
                <div className="slider-btn prev-btn-15 mb-40">
                  <i className="bi bi-arrow-up" />
                </div>
                <div className="slider-btn next-btn-15">
                  <i className="bi bi-arrow-down" />
                </div>
              </div>
              <div className="countdown-timer">
                <CounterTimer endDate={new Date("2023-10-23")} />
              </div>
              <div className="row position-relative">
                {/* <Swiper {...offerSldier} className="swiper h3-offer-slider">
                  <div className="swiper-wrapper">
                    {store &&
                      store?.data &&
                      store?.data.slice(0, 8).map((item) => {
                        const image =
                          item.images &&
                          item.images.length > 0 &&
                          item.images[0].url;
                        let fullPath = "";
                        if (image) {
                          fullPath = `http://localhost:3002/${image}`;
                        } else {
                          fullPath = "assets/images/bg/h3-offer-right2.png";
                        }
                        return (
                          <SwiperSlide className="swiper-slide">
                            <div className="offer-right-card">
                              <div className="offer-img">
                                <div className="offer-batch">
                                  <img
                                    className="img-fluid"
                                    src="assets/images/bg/h3-offer-card.png"
                                    alt=""
                                  />
                                </div>
                                <img
                                  className="img-fluid"
                                  src={fullPath}
                                  alt=""
                                  style={{
                                    maxWidth: "100%",
                                    height: "auto",
                                  }}
                                />
                              </div>
                              <div className="offer-content">
                                <span>Limited Offer</span>
                                <h2>{item.productName}</h2>
                                <div className="price">
                                  <h6>{item.originalPrice}$</h6>
                                  <del>$30.00</del>
                                </div>
                                <Link legacyBehavior href="/shop">
                                  <a className="primary-btn6">Shop Now</a>
                                </Link>
                              </div>
                            </div>
                          </SwiperSlide>
                        );
                      })}
                  </div>
                </Swiper> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home3Offer;
