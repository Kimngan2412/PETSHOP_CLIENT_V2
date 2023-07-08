import React, { useState, useEffect } from "react";
import { AUTH_ENDPOINT } from "../../api/endpoint";
import axios from "axios";
import { fetchAddress, fetchData } from "../../store/apps/address";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef } from "react";
import { defaultAddress } from "../../constants";

let defaultValues = {
  firstName: "",
};
function ProfileAddressCheckout(props, ref) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const [userInfo, setUserInfo] = useState(null);
  const dispatch = useDispatch();
  const [latestAddress, setLatestAddress] = useState(null);

  const onSubmit = (value) => {
    props?.onSubmit && props.onSubmit(value);
  };

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
          <form
            className="w-100 needs-validation"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                        placeholder="House and street name"
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
                      <input
                        {...field}
                        type="text"
                        // name="fname"
                        placeholder="House and street name"
                      />
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
                        placeholder="House and street name"
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
                        placeholder="House and street name"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-inner">
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        // name="fname"
                        placeholder="House and street name"
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
                        placeholder="House and street name"
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
                        rows={6}
                        defaultValue={""}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              style={{
                visibility: "hidden",
              }}
              ref={ref}
            >
              submit
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default React.forwardRef(ProfileAddressCheckout);
