import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Banner3 from "../components/banner/Banner3";
import Home3Category from "../components/category/Home3Category";
import Home3Collection from "../components/collection/Home3Collection";
import Footer3 from "../components/footer/Footer3";
import Header3 from "../components/header/Header3";
import OfferBanner from "../components/offer/OfferBanner";
import { fetchData as getCategories } from "../store/apps/categories";
import { fetchData as getProducts } from "../store/apps/products";
const defaultData = {
  keyword: "",
  status: "",
  page: 1,
  limit: 100,
};
function HomePage3() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories(defaultData)).then((res) => {});
    dispatch(getProducts(defaultData)).then((res) => {});
  }, [dispatch]);

  return (
    <>
      <Header3 />
      <Banner3 />
      <Home3Category />
      <Home3Collection />
      {/* <Home3Offer /> */}
      {/* <Home3EssentialItems /> */}
      <OfferBanner />
      {/* <Home3Testimonial /> */}
      {/* <Home3Newslatter /> */}
      {/* <Home3Blog /> */}
      <Footer3 />
    </>
  );
}

export default HomePage3;
