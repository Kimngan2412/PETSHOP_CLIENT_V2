import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Layout from "../../layout/Layout";
import { fetchOrdersById } from "../../store/apps/orders";

function DetailOrderPage() {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.orders);
  const [orderDetail, setOrderDetail] = useState();
  // useEffect(() => {
  //   dispatch(fetchData()).then((res) => {});
  // });
  const router = useRouter();
  console.log("router", router);
  const { id } = router.query;
  console.log("id", id);
  useEffect(() => {
    if (id) {
      dispatch(fetchOrdersById(id)).then((res) => {
        const orderDetail = res.payload;
        setOrderDetail(orderDetail);
      });
    }
  }, [dispatch, id]);
  console.log("ssssaaa", orderDetail);

  let totalPrice = 0;
  const shippingStatus = orderDetail?.shipping.status;
  const orderDay = orderDetail?.createdAt;
  const formattedOrderDay = orderDay
    ? new Date(orderDay).toLocaleDateString()
    : "";
  console.log("orderDay", formattedOrderDay);
  // const formattedDate = format(orderDay, "MMMM dd, yyyy");

  // console.log("formattedDate", formattedDate);

  return (
    <Layout>
      <Breadcrumb pageName="Detail Order" pageTitle="Detail Order" />
      <div className="checkout-section pt-120 pb-120">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-7">
              <div className="checkout-section pb-120">
                <div className="container">
                  <div className="row g-4">
                    {orderDetail && (
                      <div className="col-lg-12">
                        {/* <div className="form-wrap box--shadow mb-30">
                          <h4 className="title-25 mb-20">Information</h4>
                          <form>
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="form-inner">
                                  <label>First Name</label>
                                  <input
                                    type="text"
                                    name="fname"
                                    placeholder="Your first name"
                                    value={orderDetail?.user?.firstName}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-inner">
                                  <label>Last Name</label>
                                  <input
                                    type="text"
                                    name="fname"
                                    placeholder="Your last name"
                                    value={orderDetail?.user?.lastName}
                                  />
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="form-inner">
                                  <label>Email</label>
                                  <input
                                    type="text"
                                    name="fname"
                                    placeholder="Your email"
                                    value={orderDetail?.user?.email}
                                  />
                                </div>
                                <div className="form-inner">
                                  <label>Phone Number</label>
                                  <input
                                    type="text"
                                    name="fname"
                                    placeholder="Your phone number"
                                    value={orderDetail?.user?.phoneNumber}
                                  />
                                </div>
                              </div>
                            </div>
                          </form>
                        </div> */}
                        <div className="form-wrap box--shadow">
                          <h4 className="title-25 mb-20">Delivery address </h4>
                          <form>
                            <div className="row">
                              <div className="col-12">
                                <div className="form-inner">
                                  <label>Street Address</label>
                                  <input
                                    type="text"
                                    name="fname"
                                    placeholder="House and street name"
                                    value={
                                      orderDetail?.shipping?.addresses?.streetNo
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="form-inner">
                                  <input
                                    type="text"
                                    name="fname"
                                    placeholder="City"
                                    value={
                                      orderDetail?.shipping?.addresses?.city
                                    }
                                  />
                                </div>
                              </div>

                              <div className="col-12">
                                <div className="form-inner">
                                  <label>Additional Information</label>
                                  <input
                                    type="text"
                                    name="fname"
                                    placeholder="Full Name"
                                    value={
                                      orderDetail?.shipping?.addresses
                                        ?.lastName +
                                      " " +
                                      orderDetail?.shipping?.addresses
                                        ?.firstName
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="form-inner">
                                  <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Phone Number"
                                    value={
                                      orderDetail?.shipping?.addresses
                                        ?.phoneNumber
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="form-inner">
                                  <textarea
                                    name="message"
                                    placeholder="Order Notes (Optional)"
                                    rows={6}
                                    defaultValue={""}
                                    value={
                                      orderDetail?.shipping?.addresses?.note
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <aside className="col-lg-5">
              <div className="added-product-summary mb-30">
                <h5 className="title-25 checkout-title">Order Summary</h5>
                <ul className="added-products">
                  {orderDetail?.orderDetails &&
                    orderDetail?.orderDetails?.map((item) => {
                      const image =
                        item.product?.images &&
                        item.product?.images.length > 0 &&
                        item.product?.images[0].url;

                      totalPrice += parseFloat(item.totalPrice) * item.quantity;
                      let fullPath = "";
                      if (image) {
                        fullPath = `https://api.petshop.hieshop.click/${image}`;
                      } else {
                        fullPath =
                          "assets/images/bg/category/h3-collection-01.png";
                      }
                      return (
                        <li className="single-product d-flex justify-content-start">
                          <div className="product-img">
                            <img src={fullPath} alt="" />
                          </div>
                          <div className="product-info">
                            <h5 className="product-title">
                              <a href="#">{item.product?.productName}</a>
                            </h5>
                            Quantity : {item?.quantity}
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </div>
              <div className="summery-card total-cost mb-30">
                <table className="table cost-summery-table total-cost">
                  <thead>
                    <tr>
                      <th>Total</th>
                      <th>${totalPrice}</th>
                    </tr>
                    <tr>
                      <th>Order Day</th>
                      <th>{formattedOrderDay}</th>
                    </tr>
                    <tr>
                      <th>Shipping Status</th>
                      <th
                        style={{
                          color:
                            shippingStatus === "PENDING"
                              ? "#ffa600"
                              : shippingStatus === "DELIVERY"
                              ? "#05894d"
                              : shippingStatus === "REJECT"
                              ? "#b62052"
                              : "inherit",
                        }}
                      >
                        {shippingStatus}
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default DetailOrderPage;
