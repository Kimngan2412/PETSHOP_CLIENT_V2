import React, { useEffect, useContext } from "react";
import ProductPriceCount from "./ProductPriceCount";
import { LoadingContext } from "../../context/loading-context";
import { useState } from "react";
import { useDispatch } from "react-redux";

function OrderSummary({ cart }) {
  const { setLoading } = useContext(LoadingContext);
  const dispatch = useDispatch();
  let total = 0;
  const [state, setState] = useState(cart ?? []);

  useEffect(() => {
    setState(cart);
  }, [cart]);

  return (
    <>
      <div className="added-product-summary mb-30">
        <h5 className="title-25 checkout-title">Order Summary</h5>
        <ul className="added-products">
          {cart &&
            cart.map((item, index) => {
              const price =
                Number(item.originalPrice?.replaceAll("$", "")) * item.quantity;
              total += price;
              const detailLink = `/product-detail/${item.id}`;
              const image =
                "http://api.petshop.hieshop.click/" + item.images[0]?.url ??
                "assets/images/bg/cart-01.png";
              return (
                <li className="single-product d-flex justify-content-start">
                  <div className="product-img">
                    <img src={image} alt="" />
                  </div>
                  <div className="product-info">
                    <h5 className="product-title">
                      <a href="#">{item.productName}</a>
                    </h5>
                    <ProductPriceCount count={item.quantity} price={price} />
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
              <th>${total?.toFixed(2)}</th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
}

export default OrderSummary;
