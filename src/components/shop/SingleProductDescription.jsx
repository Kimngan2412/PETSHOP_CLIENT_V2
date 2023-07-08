import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProductPriceCount from "./ProductPriceCount";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { AUTH_ENDPOINT } from "../../api/endpoint";
import { toast } from "react-toastify";
import comment, {
  fetchData,
  fetchComment,
  addComment,
  deleteComment,
} from "../../store/apps/comment";
function SingleProductDescription() {
  const store = useSelector((state) => state.products);
  const [productDetail, setProductDetail] = useState();
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [noComments, setNoComments] = useState(false);
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
    setProductDetail(store?.product);
  }, [store?.product]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (productDetail?.id) {
      dispatch(fetchComment(productDetail.id)).then((res) => {
        const comment = res.payload;
        const commentCount = comment.length;
        setComments(res);
        setNoComments(commentCount === 0);
      });
    }
  }, [dispatch, productDetail?.id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (commentContent.trim() !== "") {
      const commentData = {
        content: commentContent,
        productsId: productDetail.id,
        userId: userInfo,
      };

      dispatch(addComment(commentData)).then(() => {
        dispatch(fetchComment(productDetail.id)).then((res) => {
          const comment = res.payload;
          const commentCount = comment.length;
          setComments(res);
          setNoComments(commentCount === 0);
        });
        toast.success("Add review successfully");
      });

      setCommentContent("");
    }
  };
  const handleDeleteComment = (userId, commentId) => {
    if (userInfo && userId === userInfo.id) {
      dispatch(deleteComment(commentId)).then(() => {
        dispatch(fetchComment(productDetail.id)).then((res) => {
          const comment = res.payload;
          const commentCount = comment.length;
          setComments(res);
          setNoComments(commentCount === 0);
        });
        toast.success("Comment deleted successfully");
      });
    } else {
      toast.error("This is not your comment!");
    }
  };

  return (
    <>
      <div className="row mb-120">
        <div className="col-lg-12">
          <div
            className="nav nav2 nav  nav-pills"
            id="v-pills-tab2"
            role="tablist"
            aria-orientation="vertical"
          >
            <button
              className="nav-link active"
              id="v-pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-home"
              type="button"
              role="tab"
              aria-controls="v-pills-home"
              aria-selected="false"
            >
              Description
            </button>

            <button
              className="nav-link"
              id="v-pills-common-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-common"
              type="button"
              role="tab"
              aria-controls="v-pills-common"
              aria-selected="true"
            >
              Review
            </button>
          </div>
          <div className="tab-content tab-content2" id="v-pills-tabContent2">
            <div
              className="tab-pane fade active show"
              id="v-pills-home"
              role="tabpanel"
              aria-labelledby="v-pills-home-tab"
            >
              <div className="description">
                <p className="para-2 mb-3">{productDetail?.description}</p>
                <p className="para-2 mb-3">
                  This food may help from a variety of different ingredients,
                  including meat, grains, vegetables, and fortified vitamins and
                  minerals. Some pet food is formulated for specific life
                  stages, such as puppy or senior, and may contain higher levels
                  of certain nutrients to support the needs of pets at those
                  stages of life.
                </p>
                <p className="para-2 mb-0">
                  At the end, also formulated for pets with special dietary
                  needs, such as those with food allergies or sensitivities.
                </p>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-common"
              role="tabpanel"
              aria-labelledby="v-pills-common-tab"
            >
              <div className="reviews-area">
                <div className="row g-lg-4 gy-5">
                  <div className="col-lg-8">
                    <div className="number-of-review">
                      <h3>Review :</h3>
                    </div>
                    <div className="review-list-area">
                      <ul className="review-list">
                        {noComments ? (
                          <p>No review for product</p>
                        ) : (
                          comments?.payload?.map((item) => {
                            {
                              /* console.log("item", item); */
                            }
                            const fullName = `${item.user?.firstName} ${item.user?.lastName}`;
                            const date = new Date(`${item?.createdAt}`);
                            const year = date.getFullYear();
                            const month = ("0" + (date.getMonth() + 1)).slice(
                              -2
                            );
                            const day = ("0" + date.getDate()).slice(-2);
                            const formattedDate = `${year}-${month}-${day}`;
                            return (
                              <li>
                                <div className="single-review d-flex  flex-md-nowrap flex-wrap">
                                  <div className="review-image"></div>
                                  <div className="review-content">
                                    <div className="c-header d-flex align-items-center">
                                      <div className="review-meta">
                                        <h5 className="mb-0">
                                          <a href="#">{fullName}</a>
                                        </h5>
                                        <div className="c-date">
                                          {formattedDate}
                                        </div>
                                        <div className="replay-btn">
                                          <a
                                            onClick={() =>
                                              handleDeleteComment(
                                                item.userId,
                                                item.id
                                              )
                                            }
                                          >
                                            <i class="bi bi-trash"></i>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      className="c-body"
                                      style={{ marginTop: "20px" }}
                                    >
                                      <p>{item?.content}</p>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          })
                        )}
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="review-form">
                      <div className="number-of-review">
                        <h3>Leave A Review</h3>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-inner mb-10">
                              <textarea
                                placeholder="Message..."
                                value={commentContent}
                                onChange={(e) =>
                                  setCommentContent(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="form-inner two">
                              <button
                                className="primary-btn3 btn-lg"
                                type="submit"
                              >
                                Post Comment
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProductDescription;
