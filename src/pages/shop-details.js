import React from "react";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import OthersProduct from "../components/shop/OthersProduct";
import ProductDetails from "../components/shop/ProductDetails";
import SingleProductDescription from "../components/shop/SingleProductDescription";
import { fetchProduct as getDetailProduct } from "../store/apps/products";
import Layout from "../layout/Layout";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function ShopDetails() {
  const dispatch = useDispatch();
  const productId = 1;
  useEffect(() => {
    dispatch(getDetailProduct(productId)).then((res) => {});
  }, [dispatch]);
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
