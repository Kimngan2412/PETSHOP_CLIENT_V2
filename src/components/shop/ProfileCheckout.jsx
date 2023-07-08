import React, { useState, useEffect } from "react";
import { AUTH_ENDPOINT } from "../../api/endpoint";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

let defaultValues = {
  firstName: "",
};
function ProfileCheckout(props, ref) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const router = useRouter();

  const [userInfo, setUserInfo] = useState(null);

  const onSubmit = (value) => {
    props?.onSubmit && props.onSubmit(value);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(AUTH_ENDPOINT.GET_ME);
        const userData = response.data;
        setUserInfo(userData);
        defaultValues = { ...userData };
        setValue("firstName", userData.firstName);
        setValue("lastName", userData.lastName);
        setValue("email", userData.email);
        setValue("phoneNumber", userData.phoneNumber);
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error("You must login before process checkout!");
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        }

        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <>
      {userInfo && (
        <div className="form-wrap box--shadow mb-30">
          <h4 className="title-25 mb-20">Information</h4>
          <form
            className="w-100 needs-validation"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                        disabled
                        placeholder="Your first name"
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
                        disabled
                        placeholder="Your last name"
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
                      <input
                        {...field}
                        type="text"
                        disabled
                        placeholder="Your email"
                      />
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
                        disabled
                        placeholder="Your email"
                      />
                    )}
                  />
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
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default React.forwardRef(ProfileCheckout);
