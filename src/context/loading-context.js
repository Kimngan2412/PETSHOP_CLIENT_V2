import { createContext, useState } from "react";
export const LoadingContext = createContext("");

export const LoadingProvider = ({ children }) => {
	const [open, setOpen] = useState(false);

	const setLoading = (value) => {
		setOpen(value);
	};

	const handleClose = (event) => {
		event.preventDefault();
	};

	return (
		<LoadingContext.Provider value={{ setLoading }}>
			<div
				className="text-center"
				style={{
					visibility: open ? "visible" : "hidden",
					opacity: open ? 0.1 : 1,
					height: open ? "100vh" : "0",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<div className="spinner-border" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>
			{children}
		</LoadingContext.Provider>
	);
};
