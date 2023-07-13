import Link from "next/link";
import React from "react";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Layout from "../layout/Layout";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  userName: yup.string().min(3).required(),
  firstName: yup.string().min(3).required(),
  lastName: yup.string().min(3).required(),
  email: yup.string().email().required(),
  phoneNumber: yup.string().matches(/^[0-9]{7,15}$/, {
    message: "Please enter valid number.",
    excludeEmptyString: false,
  }),
  password: yup.string().min(5).required(),
  confirmPassword: yup
    .string()
    .min(5)
    .required()
    .oneOf([yup.ref("password")], "Your passwords do not match."),
});

const defaultValues = {
  userName: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phoneNumber: "",
  confirmPassword: "",
  isAccept: false,
};

function signUpPage() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (value) => {
    axios
      .post("/users", { ...value, roleName: "User" })
      .then((res) => {
        console.log("res", res);
        toast.success(`Process is successfully!`);
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      })
      .catch((err) => {
        console.log("err", err);
        toast.error(`UserName or Email already exits!`);
      });
  };

  return (
    <>
      <Layout>
        <Breadcrumb pageName="Sign-Up" pageTitle="Sign-Up" />
        <div className="signup-section pt-120 pb-120">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-xl-6 col-lg-8 col-md-10">
                <div
                  className="form-wrapper wow fadeInUp"
                  data-wow-duration="1.5s"
                  data-wow-delay=".2s"
                >
                  <div className="form-title">
                    <h3>Sign Up</h3>
                    <p>
                      Do you already have an account?{" "}
                      <Link legacyBehavior href="/login">
                        <a>Log in here</a>
                      </Link>
                    </p>
                  </div>
                  <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>User Name *</label>
                          <Controller
                            name="userName"
                            control={control}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="text"
                                // name="fname"
                                placeholder="User Name"
                              />
                            )}
                          />
                          {errors?.userName && (
                            <div className="invalid-feedback">
                              {errors?.userName?.message}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>First Name *</label>
                          <Controller
                            name="firstName"
                            control={control}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="text"
                                // name="fname"
                                placeholder="First Name"
                              />
                            )}
                          />
                          {errors?.firstName && (
                            <div className="invalid-feedback">
                              {errors?.firstName?.message}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>Last Name *</label>
                          <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="text"
                                // name="fname"
                                placeholder="Last Name"
                              />
                            )}
                          />
                          {errors?.lastName && (
                            <div className="invalid-feedback">
                              {errors?.lastName?.message}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>Enter Your Email *</label>
                          <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="email"
                                // name="fname"
                                placeholder="Email"
                              />
                            )}
                          />
                          {errors?.email && (
                            <div className="invalid-feedback">
                              {errors?.email?.message}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>Enter Your Phone Number *</label>
                          <Controller
                            name="phoneNumber"
                            control={control}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="phoneNumber"
                                // name="fname"
                                placeholder="Phone Number"
                              />
                            )}
                          />
                          {errors?.phoneNumber && (
                            <div className="invalid-feedback">
                              {errors?.phoneNumber?.message}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>Password *</label>
                          <div className="form-wrapper-relative">
                            <Controller
                              name="password"
                              control={control}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type="password"
                                  // name="fname"
                                  placeholder="Password"
                                />
                              )}
                            />
                            <i
                              className="bi bi-eye-slash"
                              id="togglePassword"
                            />
                          </div>
                          {errors?.password && (
                            <div className="invalid-feedback">
                              {errors?.password?.message}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>Confirm Password *</label>
                          <div className="form-wrapper-relative">
                            <Controller
                              name="confirmPassword"
                              control={control}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type="password"
                                  // name="fname"
                                  placeholder="Password"
                                />
                              )}
                            />
                            <i
                              className="bi bi-eye-slash"
                              id="togglePassword2"
                            />
                          </div>

                          {errors?.confirmPassword && (
                            <div className="invalid-feedback">
                              {errors?.confirmPassword?.message}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <button className="account-btn" type="submit">
                      Create Account
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default signUpPage;
