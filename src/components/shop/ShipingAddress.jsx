import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef } from "react";
import ProfileAddressCheckout from "../../components/shop/ProfileAddressCheckout";
import ProfileCheckout from "../../components/shop/ProfileCheckout";
import { LoadingContext } from "../../context/loading-context";
import axios from "../../configs/axios.interceptor";
import { toast } from "react-toastify";
import { useState } from "react";

function ShipingAddress({ cart }) {
  const { setLoading } = useContext(LoadingContext);
  const [userInfo, setUserInfor] = useState();
  const router = useRouter();

  const profileRef = useRef();
  const profileValueRef = useRef();

  const profileAddressRef = useRef();
  const profileAddressValueRef = useRef();
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
  const handleCheckoutClick = () => {
    profileRef.current?.click(() => {});
    profileAddressRef.current?.click();
    // save cart
    console.log("profileValueRef", profileValueRef);
    console.log("profileAddressValueRef", profileAddressValueRef);
  };

  const handleProfileValue = (value) => {
    if (profileValueRef) profileValueRef.current = value;
  };

  const handleProfileAddressValue = (value) => {
    setLoading(true);

    axios
      .post("/orders/v2", {
        userId: userInfo.id,
        address: value,
        orderDetails: cart,
      })
      .then((res) => {
        console.log(res);
        if (res) {
          toast.success("Process is successfully !");
          localStorage.removeItem("cart");
          setTimeout(() => {
            router.push("/order");
          }, 2000);
        } else {
          toast.error("Something went wrong !");
        }
      })
      .catch((err) => {
        toast.error("Something went wrong !");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    console.log("profileRef", profileRef);
  }, [profileRef]);

  return (
    <div className="checkout-section pt-120 pb-120">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-12">
            <ProfileCheckout ref={profileRef} onSubmit={handleProfileValue} />
            <ProfileAddressCheckout
              ref={profileAddressRef}
              onSubmit={handleProfileAddressValue}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <a className="primary-btn6" onClick={handleCheckoutClick}>
              Check Out
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShipingAddress;
