import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProductPriceCount from "./ProductPriceCount";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart, fetchData } from "../../store/apps/carts";
import { toast } from "react-toastify";
import axios from "axios";
import { AUTH_ENDPOINT } from "../../api/endpoint";
import { addToWishlist } from "../../store/apps/wishlists";
function ProductDetails() {
  const store = useSelector((state) => state.products);
  console.log("store", store);
  const [productDetail, setProductDetail] = useState();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(AUTH_ENDPOINT.GET_ME);
        const userData = response.data;
        setUserInfo(userData);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleAddWishList = (item) => {
    const wishlistData = {
      userId: userInfo,
      productId: item.id,
    };
    dispatch(addToWishlist(wishlistData))
      .then(() => {
        toast.success(`${item.productName} has been added to your wishlist`);
      })
      .catch((error) => {
        toast.error("Failed to add to wishlist");
      });
  };

  const handleQuantityChange = (value) => {
    setQuantity(value < 0 ? 0 : value);
  };

  const handleAddToCart = () => {
    if (productDetail?.quantity === 0) {
      toast.error("The product is out of stock");
      return;
    }

    dispatch(addToCart({ item: productDetail, quantity }));
    toast.success(`Added ${productDetail.productName} into cart`);
  };

  useEffect(() => {
    setProductDetail(store?.product);
  }, [store?.product]);
  return (
    <>
      <div className="row g-lg-4 gy-5 mb-120">
        <div className="col-lg-7">
          <div className="tab-content tab-content1" id="v-pills-tabContent">
            {productDetail &&
              productDetail.images?.map((image, index) => {
                const className =
                  "tab-pane fade " + (index == 0 ? "active show" : "");
                const url = `http://api.petshop.hieshop.click/${image.url}`;
                const id = `v-pills-img${index + 1}`;
                return (
                  <div
                    style={{
                      // width: "100%",
                      height: "100%",
                    }}
                    className={className}
                    id={id}
                    role="tabpanel"
                    aria-labelledby="v-pills-img1-tab"
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      className="img-fluid"
                      src={url}
                      alt=""
                    />
                  </div>
                );
              })}
          </div>
          <div
            className="nav nav1 nav-pills"
            style={{
              justifyContent: "left",
            }}
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            {productDetail &&
              productDetail.images?.map((image, index) => {
                const className = "nav-link " + (index == 0 ? "active" : "");
                const url = `http://api.petshop.hieshop.click/${image.url}`;
                const id = `v-pills-img${index + 1}-tab`;
                const dataBsTarget = `#v-pills-img${index + 1}`;
                const ariaControls = `v-pills-img${index + 1}`;
                return (
                  <button
                    className={className}
                    id={id}
                    data-bs-toggle="pill"
                    data-bs-target={dataBsTarget}
                    type="button"
                    role="tab"
                    aria-controls={ariaControls}
                    aria-selected="true"
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      src={url}
                      alt=""
                    />
                  </button>
                );
              })}
          </div>
        </div>
        <div className="col-lg-5">
          <div className="shop-details-content">
            <h3>{productDetail?.productName}</h3>
            <ul className="shopuct-review2 d-flex flex-row align-items-center mb-25">
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
            </ul>

            <div className="price-tag">
              <h4>${productDetail?.originalPrice}</h4>
            </div>
            <p>{productDetail?.description} </p>

            <div className="shop-quantity d-flex align-items-center justify-content-start mb-20">
              <div className="quantity d-flex align-items-center">
                <ProductPriceCount
                  count={1}
                  price={productDetail?.originalPrice}
                  onQuantityChange={handleQuantityChange}
                />
              </div>
              <button
                className="primary-btn3"
                onClick={handleAddToCart}
                // disabled={productDetail?.quantity === 0}
              >
                Add to cart
              </button>
            </div>
            <div className="buy-now-btn">
              <Link legacyBehavior href="/cart">
                <a>Buy Now</a>
              </Link>
            </div>
            <div className="compare-wishlist-area">
              <ul>
                <li>
                  <a href="#" onClick={() => handleAddWishList(productDetail)}>
                    <span>
                      <img
                        src="assets/images/icon/Icon-favorites2.svg"
                        alt=""
                      />
                    </span>{" "}
                    Add to wishlist
                  </a>
                </li>
              </ul>
            </div>
            <div className="pyment-method">
              <h6>Guaranted Safe Checkout</h6>
              <ul>
                <li>
                  <img src="assets/images/icon/visa2.svg" alt="" />
                </li>
                <li>
                  <img src="assets/images/icon/amex.svg" alt="" />
                </li>
                <li>
                  <img src="assets/images/icon/discover.svg" alt="" />
                </li>
                <li>
                  <img src="assets/images/icon/mastercard.svg" alt="" />
                </li>
                <li>
                  <img src="assets/images/icon/stripe.svg" alt="" />
                </li>
                <li>
                  <img src="assets/images/icon/paypal.svg" alt="" />
                </li>
                <li>
                  <img src="assets/images/icon/pay.svg" alt="" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
