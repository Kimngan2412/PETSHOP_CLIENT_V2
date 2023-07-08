import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import ShopCard from "../components/shop/ShopCard";
import Layout from "../layout/Layout";
import { fetchData, fetchCategories } from "../store/apps/categories";
import { useDispatch } from "react-redux";

function Shop() {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData({ page: 1, limit: 9999 })).then((res) => {
      const allCategories = res?.payload?.items ?? [];
      setCategories(allCategories);
      setSelectedCategories(allCategories);
    });
  }, [dispatch]);

  const handleCategoryChange = async (id) => {
    const response = await dispatch(fetchCategories(id));
    const selectedCategory = response?.payload;

    if (selectedCategory) {
      const updatedCategories = [...selectedCategories];
      const categoryIndex = updatedCategories.findIndex(
        (category) => category.id === selectedCategory.id
      );

      if (categoryIndex > -1) {
        updatedCategories.splice(categoryIndex, 1);
      } else {
        updatedCategories.push(selectedCategory);
      }

      setSelectedCategories(updatedCategories);
    }
  };

  return (
    <Layout>
      <Breadcrumb pageName="Shop" pageTitle="Shop" />
      <div className="shop-page pt-120 mb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="shop-sidebar">
                <div className="shop-widget">
                  <div className="check-box-item">
                    <h5 className="shop-widget-title">Category</h5>
                    {categories &&
                      categories.map((item, index) => {
                        return (
                          <div className="checkbox-container" key={item.id}>
                            <label className="containerss">
                              {item.categoriesName}
                              <input
                                type="checkbox"
                                defaultChecked={true}
                                checked={selectedCategories.some(
                                  (category) => category.id === item.id
                                )}
                                onChange={() => handleCategoryChange(item.id)}
                              />
                              <span className="checkmark" />
                            </label>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="row mb-50">
                <div className="col-lg-12">
                  <div className="multiselect-bar">
                    <h6>shop</h6>
                  </div>
                </div>
              </div>
              <div className="row g-4 justify-content-center">
                <ShopCard selectedCategories={selectedCategories} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Shop;
