import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import OrderSummary from "../components/shop/OrderSummary";
import ShipingAddress from "../components/shop/ShipingAddress";
import { LoadingContext } from "../context/loading-context";
import Layout from "../layout/Layout";
import { fetchData } from "../store/apps/carts";

function checOutPage() {
  const [userInfo, setUserInfor] = useState();

  const shippingRef = useRef();

  const { setLoading } = useContext(LoadingContext);
  const dispatch = useDispatch();
  let total = 0;
  const [cart, setCart] = useState([]);
  const router = useRouter();
  useEffect(() => {
    setLoading(true);
    dispatch(fetchData())
      .then((res) => {
        if (res?.payload) {
          setCart(res?.payload);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    if (router.asPath == "/check-out") {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/login");
      } else {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user);
        setUserInfor(user);
      }
    }
  }, []);

  return (
    <Layout>
      <Breadcrumb pageName="Check Out" pageTitle="Check Out" />
      <div className="checkout-section ">
        <div className="container ">
          <div className="row g-4">
            <div className="col-lg-7 mt-100">
              <ShipingAddress ref={shippingRef} cart={cart} />
            </div>
            <aside className="col-lg-5 pt-120">
              <OrderSummary cart={cart} />
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default checOutPage;
