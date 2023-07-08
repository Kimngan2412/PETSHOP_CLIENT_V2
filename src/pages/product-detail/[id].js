import React, { useState } from "react";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import OthersProduct from "../../components/shop/OthersProduct";
import ProductDetails from "../../components/shop/ProductDetails";
import SingleProductDescription from "../../components/shop/SingleProductDescription";
import { fetchProduct as getDetailProduct } from "../../store/apps/products";
import Layout from "../../../src/layout/Layout";
import { useDispatch } from "react-redux";
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { LoadingContext } from "../../context/loading-context";

function ShopDetails() {
  const { setLoading } = useContext(LoadingContext);

  const dispatch = useDispatch();
  const router = useRouter();
  console.log("router", router);

  useEffect(() => {
    if (router.query?.id) {
      // setLoading(true);
      dispatch(getDetailProduct(router.query?.id))
        .then((res) => {
          console.log("heheheh", res);
        })
        .finally(() => {
          // setLoading(false);
        });
    }
  }, [dispatch, router.query?.id]);
  return (
    <Layout>
      <Breadcrumb pageName="Shop Details" pageTitle="Shop Details" />
      <div className="shop-details-page pt-120 mb-120">
        <div className="container">
          <ProductDetails />
          <SingleProductDescription />
          <OthersProduct />
        </div>
      </div>
    </Layout>
  );
}

export default ShopDetails;
