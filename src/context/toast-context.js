import { createContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastContext = createContext('');

export const ToastProvider = ({ children }) => {
  const [toastContent, setToastContent] = useState(null);

  const showToast = (message, type = 'info') => {
    setToastContent({ message, type });
  };

  const handleCloseToast = () => {
    setToastContent(null);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer autoClose={3000} onClose={handleCloseToast} />
      {toastContent && (
        <div
          className={`toast align-items-center text-white bg-${toastContent.type}`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">{toastContent.message}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={handleCloseToast}
            ></button>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};