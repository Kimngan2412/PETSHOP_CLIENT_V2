import React, { useEffect } from "react";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import ProfileInfo from "../components/shop/Profile";
import ProfileAddress from "../components/shop/ProfileAddress";
import Layout from "../layout/Layout";
import { useAuth } from "../hooks/index";
import PasswordForm from "../components/shop/PasswordForm";
import { useDispatch } from "react-redux";
import {
  fetchData,
  updateQuantity,
  removeProductFromCart,
} from "../store/apps/carts";
import { useRouter } from "next/router";

function profilePage() {
  const router = useRouter();
  const { logout } = useAuth();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("cart");
    dispatch(removeProductFromCart());
    logout();
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      router.push("/login");
    }
  }, []);

  return (
    <Layout>
      <Breadcrumb pageName="Your Profile" pageTitle="Your Profile" />
      <div className="checkout-section pt-120 pb-120">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="row g-4">
                <div className="col-lg-12">
                  <ProfileInfo />
                  <PasswordForm />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row g-4">
                <div className="col-lg-12">
                  <ProfileAddress />
                </div>
              </div>
            </div>
            <div className="col-lg-12" style={{ textAlign: "center" }}>
              <a className="primary-btn6" onClick={handleLogout}>
                Log Out
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default profilePage;
