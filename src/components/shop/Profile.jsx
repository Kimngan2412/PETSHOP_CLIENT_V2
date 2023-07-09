import axios from "axios";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AUTH_ENDPOINT } from "../../api/endpoint";
import { fetchUser, updateUser } from "../../store/apps/user";
let defaultValues = {
  firstName: "",
};
function ProfileInfo({ ref }) {
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const [inforUser, setinforUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const dispatch = useDispatch();
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
  const onSubmit = (value) => {
    const updateUserInfo = {
      firstName: value.firstName,
      lastName: value.lastName,
      phoneNumber: value.phoneNumber,
      email: value.email,
    };

    dispatch(updateUser({ id: userInfo.id, users: updateUserInfo }))
      .then(() => {
        toast.success("Update Information successful!");
      })
      .catch((error) => {
        toast.error("Update failed. Please try again."); // Hiển thị thông báo lỗi
      });
  };

  useEffect(() => {
    if (userInfo && userInfo.id) {
      dispatch(fetchUser(userInfo.id)).then((res) => {
        const infoUser = res.payload;
        setinforUser(infoUser);
        setValue("firstName", infoUser?.firstName);
        setValue("lastName", infoUser?.lastName);
        setValue("email", infoUser?.email);
        setValue("phoneNumber", infoUser?.phoneNumber);
      });
    }
  }, [dispatch, userInfo]);
  return (
    <>
      {inforUser && (
        <div className="form-wrap box--shadow mb-30">
          <h4 className="title-25 mb-20">Information</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-inner">
                  <label>FirstName</label>
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Your First Name"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-inner">
                  <label>Last Name</label>
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Your Last Name"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-inner">
                  <label>Email</label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <input {...field} type="text" placeholder="Your Email" />
                    )}
                  />
                </div>
                <div className="form-inner">
                  <label>Phone Number</label>
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Your Phone Number"
                      />
                    )}
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <button
                    className="primary-btn5"
                    style={{ fontSize: "12px" }}
                    type="submit"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default ProfileInfo;
