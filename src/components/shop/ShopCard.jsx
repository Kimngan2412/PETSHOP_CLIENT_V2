import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/apps/carts";
import { toast } from "react-toastify";
import axios from "axios";
import { AUTH_ENDPOINT } from "../../api/endpoint";
import { addToWishlist } from "../../store/apps/wishlists";
import { useContext } from "react";
import { LoadingContext } from "../../context/loading-context";

const defaultParam = {
  keyword: "",
  page: 1,
  limit: 9,
};

function ShopCard({ selectedCategories }) {
  const [productsToShow, setProducts] = useState([]);
  const store = useSelector((state) => state.products);
  const [pages, setPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState(null);
  const { setLoading } = useContext(LoadingContext);
  const [keyword, setKeyword] = useState("");

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categoriesId = selectedCategories
          .map((category) => category.id)
          .join(",");
        const response = await axios.get("/products", {
          params: {
            limit: defaultParam.limit,
            page: currentPage,
            categoriesId: categoriesId,
            keyword: keyword,
          },
        });
        const responseData = response.data;
        setProducts(responseData.items ?? []);
        setPages(responseData.meta.totalPages);
        setTotalItems(responseData.meta.totalItems ?? 0);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [currentPage, selectedCategories, keyword]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart({ item: item, quantity: 1 }));
    toast.success(`Added ${item.productName} into cart`);
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

  return (
    <>
      <div className="multiselect-bar">
        <h6>shop</h6>
        <div className="multiselect-area">
          <div className="single-select">
            <form
              className="mobile-menu-form"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="input-with-btn d-flex align-items-center">
                <i className="bi bi-search me-3"></i>
                <input
                  type="text"
                  placeholder="Search here..."
                  style={{ background: "#f7f7f7" }}
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      {productsToShow &&
        productsToShow.map((item) => {
          const image =
            item.images && item.images.length > 0 && item.images[0].url;
          let fullPath = "";
          if (image) {
            fullPath = `https://api.petshop.hieshop.click/${image}`;
          } else {
            fullPath = "assets/images/bg/category/h3-collection-01.png";
          }
          const comment = item.comments;

          return (
            <div className="col-lg-4 col-md-4 col-sm-6" key={item.id}>
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
                    <Link legacyBehavior href={`/product-detail/${item.id}`}>
                      <a>View Details</a>
                    </Link>
                  </div>
                  <ul className="cart-icon-list">
                    <li onClick={() => handleAddToCart(item)}>
                      <a href="#">
                        <img src="assets/images/icon/Icon-cart3.svg" alt="" />
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
                    <Link legacyBehavior href={`/product-detail/${item.id}`}>
                      <a>{item.productName}</a>
                    </Link>
                  </h4>
                  <div className="price">
                    <h6>${item.originalPrice}</h6>
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
      <div
        className="paginations-area"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="pagination">
          <i
            className="bi bi-arrow-left-short"
            style={{
              cursor: "pointer",
            }}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          />
          <div className="page-info">
            Page {currentPage} of {totalItems}
          </div>
          <i
            style={{
              cursor: "pointer",
            }}
            className="bi bi-arrow-right-short"
            onClick={handleNextPage}
            disabled={currentPage === totalItems}
          />
        </div>
      </div>
    </>
  );
}

export default ShopCard;
