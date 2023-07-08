import Link from "next/link";
import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Layout from "../layout/Layout";
import { AUTH_ENDPOINT } from "../api/endpoint";
import axios from "axios";
import {
  fetchWishlist,
  deleteWishlist,
  fetchData,
} from "../store/apps/wishlists";
import { useDispatch } from "react-redux";
import { LoadingContext } from "../context/loading-context";
import { useContext } from "react";
import { toast } from "react-toastify";

function WishlistPage() {
  const [userInfo, setUserInfo] = useState(null);
  const [wishtlists, setWishtlists] = useState(null);
  const { setLoading } = useContext(LoadingContext);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(AUTH_ENDPOINT.GET_ME);
        const userData = response.data;
        console.log("userData1", userData);
        setUserInfo(userData);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (userInfo && userInfo.id) {
      dispatch(fetchWishlist(userInfo.id)).then((res) => {
        if (res?.payload) {
          // Filter duplicate items based on product id
          const uniqueWishlists = Array.from(
            new Set(res.payload.map((item) => item.product.id))
          ).map((productId) =>
            res.payload.find((item) => item.product.id === productId)
          );
          setWishtlists(uniqueWishlists);
        }
      });
    }
  }, [dispatch, userInfo]);

  const handleDeleteWishlist = (id) => {
    setLoading(true);
    dispatch(deleteWishlist(id)).then((res) => {
      dispatch(fetchWishlist(userInfo.id))
        .then((res) => {
          if (res?.payload) {
            setWishtlists(res?.payload);
          }
          toast.success("Remove product from wishlist successfully");
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };
  return (
    <Layout>
      <Breadcrumb pageName="Wishlist" pageTitle="Wishlist" />
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
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {wishtlists && wishtlists.length > 0 ? (
                      wishtlists.map((item) => {
                        console.log("item", item);
                        const image =
                          item.product.images &&
                          item.product.images.length > 0 &&
                          item.product.images[0].url;
                        let fullPath = "";
                        if (image) {
                          fullPath = `http://api.petshop.hieshop.click/${image}`;
                        } else {
                          fullPath =
                            "assets/images/bg/category/h3-collection-01.png";
                        }
                        return (
                          <tr key={item.product.id}>
                            <td data-label="Delete">
                              <div className="delete-icon">
                                <i
                                  className="bi bi-x"
                                  onClick={() => handleDeleteWishlist(item.id)}
                                />
                              </div>
                            </td>
                            <td data-label="Image">
                              <img src={fullPath} alt="" />
                            </td>
                            <td data-label="Food Name">
                              <Link
                                legacyBehavior
                                href={`/product-detail/${item.product.id}`}
                              >
                                <a>{item.product.productName}</a>
                              </Link>
                            </td>
                            <td data-label="Original Price">
                              <h6> ${item.product.originalPrice}</h6>
                            </td>

                            <td data-label="Action">
                              <Link
                                legacyBehavior
                                href={`/product-detail/${item.product.id}`}
                              >
                                <button className="primary-btn5 btn-md">
                                  Buy Now
                                </button>
                              </Link>
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
                          <i>No items in wishlist</i>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-4"></div>
            <div className="col-lg-8">
              <table className="table total-table"></table>
              <ul className="cart-btn-group">
                <li>
                  <Link legacyBehavior href="/shop">
                    <a className="primary-btn2 btn-lg">Continue to shopping</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default WishlistPage;
