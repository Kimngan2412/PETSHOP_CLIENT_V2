import Link from "next/link";
import React, { useContext, useEffect } from "react";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Layout from "../layout/Layout";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { LoadingContext } from "../context/loading-context";

const schema = yup.object().shape({
	email: yup.string().email().required(),
});

const defaultValues = {
	email: "",
};

function ForgotPasswordPage() {
	const { setLoading } = useContext(LoadingContext);
	const router = useRouter();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues,
		mode: "onBlur",
		resolver: yupResolver(schema),
	});

	const [isShowConfirm, setIsShowConfirm] = useState(false);
	const [email, setEmail] = useState("");
	const [confirmCode, setConfirmCode] = useState("");
	const onSubmit = (data) => {
		setLoading(true);
		setEmail(data.email);
		axios
			.post("/users/forgot-password", { email: data.email })
			.then((res) => {
				console.log("res", res);
				if (res) handleShow();
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const handleClose = () => {
		setIsShowConfirm(false);
	};

	const handleShow = () => {
		setIsShowConfirm(true);
	};

	const handleResendCode = () => {
		setLoading(true);
		axios
			.post("/users/resend-code", { email: email })
			.then((res) => {
				if (res?.data?.messageCode == "CODE_SENT_SUCCESS") {
					toast.success("Process has been successfully!");
				} else toast.success("Something went wrong, please try again!");
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const handleConfirm = () => {
		setLoading(true);
		axios
			.post("/users/verify-code", { email: email, code: confirmCode })
			.then((res) => {
				if (res?.data?.messageCode == "CODE_CONFIRM_SUCCESS") {
					toast.success("Process has been successfully!");
					setTimeout(() => {
						router.push("/login");
					}, 1000);
				} else toast.error("Something went wrong, please try again!");
			})
			.catch((err) => {
				console.log("err?.data", err?.data);
				console.log("err", err);
				toast.error(err?.response?.data?.message);
			})
			.finally(() => {
				setLoading(false);
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
										<h3>Forgot Password</h3>
										<h6>Please enter your email to reset the password</h6>
									</div>
									<form
										className="w-100 needs-validation"
										onSubmit={handleSubmit(onSubmit)}
									>
										<div className="row">
											<div className="col-12">
												<div className="form-inner">
													<label>Enter your email *</label>
													<Controller
														name="email"
														control={control}
														render={({ field }) => (
															<input
																{...field}
																type="text"
																placeholder="Enter your email"
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
										</div>
										<button className="account-btn" type="submit">
											Send
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Modal show={isShowConfirm} onHide={handleClose} backdrop="static">
					<div className="form-wrapper" style={{ padding: "10px" }}>
						<Modal.Header closeButton>
							<Modal.Title>Confirm code</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<input
								type="text"
								placeholder="Enter your code"
								onChange={(event) => setConfirmCode(event.target.value)}
							/>
							{!confirmCode && (
								<div className="invalid-feedback">
									{"confirm code is required"}
								</div>
							)}
						</Modal.Body>
						<Modal.Footer>
							<button
								className="account-btn"
								type="button"
								onClick={handleResendCode}
							>
								Resend Code
							</button>
							<button
								className="account-btn"
								type="button"
								onClick={handleConfirm}
							>
								Confirm
							</button>
						</Modal.Footer>
					</div>
				</Modal>
			</Layout>
		</>
	);
}

export default ForgotPasswordPage;
