import React, { useState, useEffect } from "react";
import { AUTH_ENDPOINT } from "../../api/endpoint";
import axios from "axios";
import { toast } from "react-toastify";
import {
  fetchAddress,
  fetchData,
  updateAddress,
  createAddress,
} from "../../store/apps/address";
import { useDispatch } from "react-redux";
import { defaultAddress } from "../../constants";
import { useForm, Controller } from "react-hook-form";
let defaultValues = {
  firstName: "",
};
function ProfileAddress() {
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
  });
  const [userInfo, setUserInfo] = useState(null);
  const dispatch = useDispatch();
  const [latestAddress, setLatestAddress] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  const onSubmit = (value) => {
    if (latestAddress === null || !latestAddress.id) {
      const newAddressData = {
        streetNo: value.streetNo,
        city: value.city,
        firstName: value.firstName,
        lastName: value.lastName,
        phoneNumber: value.phoneNumber,
        note: value.note,
        userId: userInfo.id,
      };

      dispatch(createAddress(newAddressData)).then((action) => {
        if (createAddress.fulfilled.match(action)) {
          const createdAddress = action.payload;
          setLatestAddress(createdAddress);
          toast.success("Address created successfully!");
        } else if (createAddress.rejected.match(action)) {
          const error = action.payload;
          toast.error(`Failed to create address: ${error.message}`);
        }
      });
    } else {
      const updatedAddressData = {
        streetNo: value.streetNo,
        city: value.city,
        firstName: value.firstName,
        lastName: value.lastName,
        phoneNumber: value.phoneNumber,
        email: value.email,
        note: value.note,
      };

      dispatch(
        updateAddress({ id: latestAddress.id, address: updatedAddressData })
      ).then(() => {
        toast.success("Update Delivery Address successful!");
      });
    }
  };

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
    if (userInfo && userInfo.id) {
      dispatch(fetchAddress(userInfo.id)).then((res) => {
        const latestAddressData = res.payload[res.payload.length - 1];
        setLatestAddress(latestAddressData ?? defaultAddress);
        setValue("streetNo", latestAddressData?.streetNo);
        setValue("city", latestAddressData?.city);
        setValue("lastName", latestAddressData?.lastName);
        setValue("firstName", latestAddressData?.firstName);
        setValue("email", latestAddressData?.user?.email);
        setValue("phoneNumber", latestAddressData?.phoneNumber);
        setValue("note", latestAddressData?.note);
      });
    }
  }, [dispatch, userInfo]);

  return (
    <>
      {latestAddress && (
        <div className="form-wrap box--shadow">
          <h4 className="title-25 mb-20">Delivery address </h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-12">
                <div className="form-inner">
                  <label>Street Address</label>
                  <Controller
                    name="streetNo"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        // name="fname"
                        placeholder="Street No"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-inner">
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <input {...field} type="text" placeholder="City" />
                    )}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-inner">
                  <label>Additional Information</label>
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        // name="fname"
                        placeholder="Your First Name"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-inner">
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Your last name"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-inner">
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        // name="fname"
                        placeholder="Your phone number"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-inner">
                  <Controller
                    name="note"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        placeholder="Order Notes (Optional)"
                        rows={17}
                        defaultValue={""}
                      />
                    )}
                  />
                </div>
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
          </form>
        </div>
      )}
    </>
  );
}

export default ProfileAddress;
