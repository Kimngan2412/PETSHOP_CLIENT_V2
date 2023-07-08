import Link from "next/link";
import React, { useEffect, useState, useContext } from "react";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import ItemCounter from "../components/shop/ProductCount";
import Layout from "../layout/Layout";
import { useDispatch } from "react-redux";
import { LoadingContext } from "../context/loading-context";
import {
  fetchData,
  updateQuantity,
  removeProductFromCart,
} from "../store/apps/carts";
function CartPage() {
  const { setLoading } = useContext(LoadingContext);

  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  let total = 0;

  const handleCountChange = (value, count) => {
    dispatch(updateQuantity({ item: value, quantity: count })).then((res) => {
      dispatch(fetchData()).then((res) => {
        if (res?.payload) {
          setCart(res?.payload);
        }
      });
    });
  };

  const handleDeleteItem = (item) => {
    setLoading(true);
    dispatch(removeProductFromCart({ id: item?.id })).then((res) => {
      dispatch(fetchData())
        .then((res) => {
          if (res?.payload) {
            setCart(res?.payload);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

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
  return (
    <Layout>
      <Breadcrumb pageName="Cart" pageTitle="Cart" />
      <div className="cart-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="table-wrapper">
                <table className="eg-table table cart-table">
                  <thead>
                    <tr>
                      <th>Delete</th>
                      <th>Image</th>
                      <th>Food Name</th>
                      <th>Unite Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart && cart.length > 0 ? (
                      cart.map((value, index) => {
                        total +=
                          Number(value.originalPrice?.replaceAll("$", "")) *
                          value.quantity;
                        const detailLink = `/product-detail/${value.id}`;
                        const image =
                          value.images && value.images[0]?.url
                            ? `http://api.petshop.hieshop.click/${value.images[0]?.url}`
                            : "assets/images/bg/cart-01.png";
                        return (
                          <tr key={value.id}>
                            <td data-label="Delete">
                              <div
                                className="delete-icon"
                                onClick={() => handleDeleteItem(value)}
                              >
                                <i className="bi bi-x" />
                              </div>
                            </td>
                            <td data-label="Image">
                              <img src={image} alt="" />
                            </td>
                            <td data-label="Food Name">
                              <Link legacyBehavior href={detailLink}>
                                <a>{value.productName}</a>
                              </Link>
                            </td>
                            <td data-label="Unite Price">
                              <span>{value.originalPrice}</span>
                            </td>
                            <td data-label="Quantity">
                              <div className="quantity d-flex align-items-center">
                                <div className="quantity-nav nice-number d-flex align-items-center">
                                  <ItemCounter
                                    count={value.quantity}
                                    onChange={(count) =>
                                      handleCountChange(value, count)
                                    }
                                  />
                                </div>
                              </div>
                            </td>
                            <td data-label="Subtotal">
                              {"$" +
                                (
                                  Number(
                                    value.originalPrice?.replaceAll("$", "")
                                  ) * value.quantity
                                )?.toFixed(2)}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          style={{
                            fontWeight: "bold",
                            fontSize: "1.25rem",
                          }}
                        >
                          <i>No items in cart</i>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-4 d-none d-lg-block">
              {/* <div className="coupon-area">
                <div className="cart-coupon-input">
                  <h5 className="coupon-title">Coupon Code</h5>
                  <form className="coupon-input d-flex align-items-center">
                    <input type="text" placeholder="Coupon Code" />
                    <button type="submit">Apply Code</button>
                  </form>
                </div>
              </div> */}
            </div>
            <div className="col-lg-8">
              <table className="table total-table">
                <thead>
                  <tr>
                    <th>Cart Totals</th>
                    <th />
                    <th>{"$" + total?.toFixed(2)}</th>
                  </tr>
                </thead>
                {/* <tbody>
                  <tr>
                    <td>Shipping</td>
                    <td>
                      <ul className="cost-list text-start">
                        <li>Shipping Fee</li>
                        <li>Total ( tax excl.)</li>
                        <li>Total ( tax incl.)</li>
                        <li>Taxes</li>
                        <li>
                          Shipping Enter your address to view shipping options.{" "}
                          <br /> <a href="#">Calculate shipping</a>
                        </li>
                      </ul>
                    </td>
                    <td>
                      <ul className="single-cost text-center">
                        <li>Fee</li>
                        <li>$15</li>
                        <li></li>
                        <li>$15</li>
                        <li>$15</li>
                        <li>$5</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>Subtotal</td>
                    <td />
                    <td>$162.70</td>
                  </tr>
                </tbody> */}
              </table>
              <ul className="cart-btn-group">
                <li>
                  <Link legacyBehavior href="/shop">
                    <a className="primary-btn2 btn-lg">Continue to shopping</a>
                  </Link>
                </li>
                {cart && cart.length > 0 && (
                  <li>
                    <Link legacyBehavior href="/check-out">
                      <a className="primary-btn3 btn-lg">Proceed to Checkout</a>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CartPage;
