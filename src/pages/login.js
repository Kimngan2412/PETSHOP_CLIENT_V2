import Link from "next/link";
import React, { useContext, useEffect } from "react";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Layout from "../layout/Layout";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../hooks";
import { ToastContext } from "../context/toast-context";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const schema = yup.object().shape({
  userName: yup.string().min(5).required(),
  password: yup.string().min(5).required(),
});

const defaultValues = {
  password: "",
  userName: "",
};

function loginPage() {
  const router = useRouter();
  const authen = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    authen
      .login({ params: data })
      ?.then((res) => {
        if (res) {
          toast.success("Hello, Welcome to Scooby!");
          router.push("/");
        }
      })
      .catch((err) => {
        toast.error("Wrong userName or password!");
      });
  };

  useEffect(() => {
    import("../../public/assets/js/bootstrap.bundle.min.js");
  });

  return (
    <>
      <Layout>
        <Breadcrumb pageName="Login" pageTitle="Login" />
        <div className="login-section pt-120 pb-120">
          <div className="container">
            <div className="row d-flex justify-content-center g-4">
              <div className="col-xl-6 col-lg-8 col-md-10">
                <div
                  className="form-wrapper wow fadeInUp"
                  data-wow-duration="1.5s"
                  data-wow-delay=".2s"
                >
                  <div className="form-title">
                    <h3>Log In</h3>
                    <p>
                      New Member?{" "}
                      <Link legacyBehavior href="/sign-up">
                        <a>signup here</a>
                      </Link>
                    </p>
                  </div>
                  <form
                    className="w-100 needs-validation"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="row">
                      <div className="col-12">
                        <div className="form-inner">
                          <label>Enter your userName *</label>
                          <Controller
                            name="userName"
                            control={control}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="text"
                                placeholder="Enter your userName"
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
                      <div className="col-12">
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
                                  placeholder="Enter your password"
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
                      <div className="col-12">
                        <div className="form-agreement form-inner d-flex justify-content-between flex-wrap">
                          <div className="form-group"></div>
                          <a href="/forgot-password" className="forgot-pass">
                            Forgotten Password
                          </a>
                        </div>
                      </div>
                    </div>
                    <button className="account-btn" type="submit">
                      Log in
                    </button>
                  </form>
                  {/* <div className="alternate-signup-box">
                    <h6>or signup WITH</h6>
                    <div className="btn-group gap-4">
                      <a
                        href="#"
                        className="eg-btn google-btn d-flex align-items-center"
                      >
                        <i className="bx bxl-google" />
                        <span>signup whit google</span>
                      </a>
                      <a
                        href="#"
                        className="eg-btn facebook-btn d-flex align-items-center"
                      >
                        <i className="bx bxl-facebook" />
                        signup whit facebook
                      </a>
                    </div>
                  </div> */}
                  {/* <div className="form-poicy-area">
                    <p>
                      By clicking the "signup" button, you create a Cobiro
                      account, and you agree to Cobiro's{" "}
                      <a href="#">Terms &amp; Conditions</a> &amp;{" "}
                      <a href="#">Privacy Policy.</a>
                    </p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default loginPage;
