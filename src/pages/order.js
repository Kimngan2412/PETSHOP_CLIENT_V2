import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Layout from "../layout/Layout";
import { useDispatch } from "react-redux";
import { AUTH_ENDPOINT } from "../api/endpoint";
import axios from "axios";
import {
  fetchData,
  fetchOrders,
  updateShippingStatus,
} from "../store/apps/orders";
import { LoadingContext } from "../context/loading-context";
import { toast } from "react-toastify";
function OrderPage() {
  const [userInfo, setUserInfo] = useState(null);
  const dispatch = useDispatch();
  const [orders, setOrders] = useState(null);
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // setLoading(true); // Show loading indicator
        const response = await axios.get(AUTH_ENDPOINT.GET_ME);
        const userData = response.data;
        console.log("userData1", userData);
        setUserInfo(userData);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };
    fetchUserInfo();
  }, [dispatch]);

  const cancelOrder = async (orderId) => {
    try {
      setLoading(true);
      await dispatch(updateShippingStatus({ id: orderId, status: "REJECTED" }));
      toast.success("Cancel Order Successfully!");

      // Fetch the updated orders after cancellation
      await dispatch(fetchOrders(userInfo.id)).then((res) => {
        const updatedOrders = res.payload;
        setOrders(updatedOrders);
      });
    } catch (error) {
      console.error("Error canceling order:", error);
      toast.error("Failed to cancel order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.id) {
      dispatch(fetchOrders(userInfo.id)).then((res) => {
        const fetchedOrders = res.payload;
        const orders = [...fetchedOrders].reverse();
        setOrders(orders);
      });
    }
  }, [dispatch, userInfo]);

  return (
    <Layout>
      <Breadcrumb pageName="Your Orders" pageTitle="Your Orders" />
      <div className="cart-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {orders && orders.length > 0 ? (
                orders.map((item) => {
                  console.log("item", item);
                  let totalPrice = 0;
                  item?.orderDetails.forEach((orderDetails) => {
                    totalPrice +=
                      parseFloat(orderDetails.totalPrice) *
                      orderDetails.quantity;
                  });

                  totalPrice = totalPrice.toFixed(2);
                  return (
                    <div
                      className="table-wrapper"
                      style={{
                        borderRadius: "10px",
                        boxShadow:
                          "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                      }}
                    >
                      <table className="eg-table table cart-table">
                        <thead>
                          <tr>
                            <th>Item</th>
                            <th>Food Name</th>
                            <th>Quantity</th>
                            <th>Original Price</th>
                          </tr>
                        </thead>

                        <tbody>
                          {item.orderDetails?.map((product) => {
                            console.log(product);
                            const image =
                              product.product?.images &&
                              product.product?.images.length > 0 &&
                              product.product?.images[0].url;
                            console.log(image);
                            let fullPath = "";
                            if (image) {
                              fullPath = `https://api.petshop.hieshop.click/${image}`;
                            } else {
                              fullPath =
                                "assets/images/bg/category/h3-collection-01.png";
                            }
                            return (
                              <>
                                <tr>
                                  <td data-label="Image">
                                    <img src={fullPath} alt="" />
                                  </td>

                                  <td data-label="Food Name">
                                    <Link legacyBehavior href="/shop-details">
                                      <a>{product.product?.productName}</a>
                                    </Link>
                                  </td>

                                  <td data-label="Quantity">
                                    <h6>{product?.quantity}</h6>
                                  </td>
                                  <td data-label="Unite Price">
                                    <h6>${product.product?.originalPrice}</h6>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            marginBottom: "10px",
                          }}
                        >
                          <h2
                            style={{
                              fontSize: "24px",
                              fontWeight: "bold",
                              color: "#253d4e",
                            }}
                          >
                            Cart Totals: ${totalPrice}
                          </h2>
                          <h2 style={{ fontSize: "18px" }}>
                            <span style={{ color: "#253d4e" }}>
                              Shipping Status:
                            </span>{" "}
                            <span
                              style={{
                                color: "white",
                                border: "1px solid white",
                                background:
                                  item?.shipping?.status === "PENDING"
                                    ? "#ffa600"
                                    : item?.shipping?.status === "DELIVERY"
                                    ? "#05894d"
                                    : item?.shipping?.status === "REJECTED"
                                    ? "#b62052"
                                    : "inherit",
                                padding: "5px",
                                borderRadius: "5px",
                              }}
                            >
                              {item?.shipping?.status}
                            </span>
                          </h2>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            marginBottom: "20px",
                          }}
                        >
                          <div className="h3-view-btn">
                            <Link
                              legacyBehavior
                              href={`/detail-order/${item.id}`}
                            >
                              <a>
                                View OrderDetails
                                <img
                                  src="assets/images/icon/haf-button-2.svg"
                                  alt=""
                                />
                              </a>
                            </Link>
                          </div>
                          {item?.shipping?.status === "PENDING" && (
                            <button
                              className="primary-btn5"
                              style={{ fontSize: "12px" }}
                              type="submit"
                              onClick={() => cancelOrder(item.id)}
                            >
                              Cancel order
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h3
                  style={{
                    fontWeight: 700,
                    color: "#001047",
                    textAlign: "center",
                    fontStyle: "italic",
                  }}
                >
                  You don't have any orders at the moment
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default OrderPage;
