import { useRouter } from "next/router";
import React, { useEffect, useReducer } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}
function ProductPriceCount({ count, price, onQuantityChange, page }) {
  const [state, dispatch] = useReducer(reducer, { count });
  const currentRoute = useRouter().pathname;
  const increment = () => {
    if (state.count < productDetail?.quantity) {
      dispatch({ type: "increment" });
      onQuantityChange && onQuantityChange(state.count + 1);
    } else {
      toast.error("Cannot increase quantity beyond available inventory.");
    }
  };
  const store = useSelector((state) => state.products);
  const [productDetail, setProductDetail] = useState();
  useEffect(() => {
    setProductDetail(store?.product);
  }, [store?.product]);

  console.log("aazzz", productDetail);
  const decrement = () => {
    if (state.count > 1) {
      dispatch({ type: "decrement" });
      onQuantityChange && onQuantityChange(state.count - 1);
    }
  };

  useEffect(() => {}, [count, price]);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="model-number">
        <span>Inventory: {productDetail?.quantity}</span>
      </div>
      <div className="product-total d-flex align-items-center">
        <div className="quantity">
          <div className="quantity d-flex align-items-center">
            <div className="quantity-nav nice-number d-flex align-items-center">
              <button
                onClick={decrement}
                type="button"
                // disabled={page !== "PRODUCT_DETAIL"}
              >
                <i className="bi bi-dash"></i>
              </button>
              <span
                style={{
                  margin: "0 15px",
                  fontFamily: "var(--font-cabin)",
                  color: "var(--title-color1)",
                  fontSize: "16px",
                }}
              >
                {state.count}
              </span>
              <button
                onClick={increment}
                type="button"
                disabled={state.count > productDetail?.quantity}
              >
                <i className="bi bi-plus"></i>
              </button>
            </div>
          </div>
        </div>
        {currentRoute === "/shop-details" ? (
          ""
        ) : (
          <strong>
            {" "}
            <i className="bi bi-x-lg px-2" />
            <span
              className="product-price"
              style={{
                margin: "0 px",
                fontFamily: "var(--font-cabin)",
                color: "var(--title-color1)",
                fontSize: "18px",
                fontWeight: "500",
              }}
            >
              ${parseFloat(price).toFixed(2)}
            </span>
          </strong>
        )}
      </div>
    </div>
  );
}
export default ProductPriceCount;
