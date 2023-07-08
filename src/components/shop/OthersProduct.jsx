import Link from "next/link";
import React, { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import { fetchData } from "../../store/apps/products";
SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade]);

const defaultData = {
  keyword: "",
  status: "",
  page: 1,
  limit: 100,
};
function OthersProduct() {
  const store = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log("product hih", store);
  }, [store]);

  const productSlider = useMemo(() => {
    return {
      spaceBetween: 24,
      slidesPerView: "4",
      loop: true,
      speed: 1500,
      autoplay: {
        delay: 2200,
      },
      navigation: {
        nextEl: ".next-btn-12",
        prevEl: ".prev-btn-12",
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
          slidesPerView: 4,
        },
        1400: {
          slidesPerView: 5,
        },
        1600: {
          slidesPerView: 5,
        },
      },
    };
  }, [store]);

  useEffect(() => {
    dispatch(fetchData(defaultData)).then((res) => {});
  }, [dispatch]);

  return (
    <>
      <div className="row">
        <div className="col-lg-12 d-flex flex-wrap align-items-center justify-content-md-between justify-content-start gap-2 mb-60">
          <div className="inner-section-title">
            <h2>Other Products</h2>
          </div>

          <div className="swiper-btn-wrap d-flex align-items-center">
            <div className="slider-btn prev-btn-12">
              <i style={{ cursor: "pointer" }} className="bi bi-arrow-left" />
            </div>
            <div className="slider-btn next-btn-12">
              <i style={{ cursor: "pointer" }} className="bi bi-arrow-right" />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <Swiper {...productSlider} className="swiper essential-items-slider">
          <div className="swiper-wrapper">
            {store?.data &&
              store?.data.map((item) => {
                const image =
                  item.images && item.images.length > 0 && item.images[0].url;
                let fullPath = "";
                if (image) {
                  fullPath = `https://api.petshop.hieshop.click/${image}`;
                } else {
                  fullPath =
                    "../assets/images/bg/category/h3-collection-01.png";
                }
                return (
                  <SwiperSlide className="swiper-slide">
                    <div className="collection-card">
                      <div
                        className={`offer-card ${
                          item.status === "Available"
                            ? "sale"
                            : item.status === "Sold Out"
                            ? "sold-out"
                            : ""
                        }`}
                      >
                        <span>{item.status}</span>
                      </div>
                      <div className="collection-img">
                        <img
                          className="img-gluid"
                          src={fullPath}
                          alt=""
                          style={{
                            maxWidth: "100%",
                            height: "100%",
                          }}
                        />
                        <div className="view-dt-btn">
                          <div className="plus-icon">
                            <i className="bi bi-plus" />
                          </div>
                          <Link
                            legacyBehavior
                            href={`/product-detail/${item.id}`}
                          >
                            <a>View Details</a>
                          </Link>
                        </div>
                      </div>
                      <div className="collection-content text-center">
                        <h4>
                          <Link
                            legacyBehavior
                            href={`/product-detail/${item.id}`}
                          >
                            <a>{item.productName}</a>
                          </Link>
                        </h4>
                        <div className="price">
                          <h6>{item.originalPrice}</h6>
                        </div>
                        <div className="review">
                          <ul>
                            <li>
                              <i className="bi bi-star-fill" />
                            </li>
                            <li>
                              <i className="bi bi-star-fill" />
                            </li>
                            <li>
                              <i className="bi bi-star-fill" />
                            </li>
                            <li>
                              <i className="bi bi-star-fill" />
                            </li>
                            <li>
                              <i className="bi bi-star-fill" />
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
          </div>
        </Swiper>
      </div>
    </>
  );
}

export default OthersProduct;
