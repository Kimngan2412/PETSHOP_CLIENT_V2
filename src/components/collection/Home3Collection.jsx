import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AUTH_ENDPOINT } from "../../api/endpoint";
import { addToCart } from "../../store/apps/carts";
import { addToWishlist } from "../../store/apps/wishlists";

function Home3Collection() {
  const store = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState(null);

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

  const handleAddToCart = (item) => {
    if (item.quantity > 0) {
      dispatch(addToCart({ item: item, quantity: 1 }));
      toast.success(`Added ${item.productName} into cart`);
    } else {
      toast.error("The product is out of stock");
    }
  };

  const handleAddWishList = (item) => {
    const wishlistData = {
      userId: userInfo,
      productId: item.id,
    };
    if (userInfo !== null) {
      dispatch(addToWishlist(wishlistData))
        .then(() => {
          toast.success(`${item.productName} has been added to your wishlist`);
        })
        .catch((error) => {
          toast.error("Failed to add to wishlist");
        });
    } else {
      toast.error("Please login");
    }
  };

  useEffect(() => {}, [store]);
  return (
    <div className="home3-collection-area mb-120">
      <div className="container">
        <div className="row mb-60">
          <div className="col-lg-12 d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div className="section-title3">
              <h2>
                <img src="assets/images/icon/h3-sec-tt-vect-left.svg" alt="" />
                <span>Find Pet Collections</span>
                <img src="assets/images/icon/h3-sec-tt-vect-right.svg" alt="" />
              </h2>
            </div>
            <div className="h3-view-btn d-md-flex d-none">
              <Link legacyBehavior href="/shop">
                <a>
                  View All Product
                  <img src="assets/images/icon/haf-button-2.svg" alt="" />
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="row g-4 justify-content-center">
          {store?.data &&
            store?.data.slice(0, 8).map((item, index) => {
              const image =
                item.images && item.images.length > 0 && item.images[0].url;
              let fullPath = "";
              if (image) {
                fullPath = `https://kimngan2412-petshop.onrender.com/${image}`;
              } else {
                fullPath = "assets/images/bg/category/h3-collection-01.png";
              }
              const comment = item.comments;
              return (
                <div className="col-lg-3 col-md-4 col-sm-6" key={item.id}>
                  <div className="collection-card">
                    <div
                      className={`offer-card ${
                        item.status === "Available"
                          ? "sale"
                          : item.status === "Sold Out"
                          ? "sold-out"
                          : ""
                      }`}
                    >
                      <span>{item.status}</span>
                    </div>
                    <div className="collection-img">
                      <img
                        className="img-gluid"
                        src={fullPath}
                        alt=""
                        style={{
                          maxWidth: "100%",
                          height: "100%",
                        }}
                      />
                      <div className="view-dt-btn">
                        <div className="plus-icon">
                          <i className="bi bi-plus" />
                        </div>
                        <Link
                          legacyBehavior
                          href={`/product-detail/${item.id}`}
                        >
                          <a>View Details</a>
                        </Link>
                      </div>
                      <ul className="cart-icon-list">
                        <li onClick={() => handleAddToCart(item)}>
                          <a>
                            <img
                              src="assets/images/icon/Icon-cart3.svg"
                              alt=""
                            />
                          </a>
                        </li>
                        <li>
                          <a onClick={() => handleAddWishList(item)}>
                            <img
                              src="assets/images/icon/Icon-favorites3.svg"
                              alt=""
                            />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="collection-content text-center">
                      <h4>
                        <Link
                          legacyBehavior
                          href={`/product-detail/${item.id}`}
                        >
                          <a>{item.productName}</a>
                        </Link>
                      </h4>
                      <div className="price">
                        <h6>${item.originalPrice}</h6>
                        {/* <del>$120</del> */}
                      </div>
                      <div className="review">
                        <ul>
                          <li>
                            <i className="bi bi-star-fill" />
                          </li>
                          <li>
                            <i className="bi bi-star-fill" />
                          </li>
                          <li>
                            <i className="bi bi-star-fill" />
                          </li>
                          <li>
                            <i className="bi bi-star-fill" />
                          </li>
                          <li>
                            <i className="bi bi-star-fill" />
                          </li>
                          <span>({comment.length})</span>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="row d-md-none d-block pt-30">
          <div className="col-lg-12 d-flex justify-content-center">
            <div className="h3-view-btn">
              <Link legacyBehavior href="/shop">
                <a>
                  View All Product
                  <img src="assets/images/icon/haf-button-2.svg" alt="" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home3Collection;
