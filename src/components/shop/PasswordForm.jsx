import React, { useEffect, useState } from "react";
import { AUTH_ENDPOINT } from "../../api/endpoint";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
function PasswordForm() {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      const response = await axios.post("users/change-password", {
        userId: userInfo.id,
        oldPassword: currentPassword,
        newPassword: newPassword,
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      toast.success("Change Password Sucessfully");
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <div className="form-wrap box--shadow">
      <h4 className="title-25 mb-20">Do you want to change your password?</h4>
      <form onSubmit={handleFormSubmit}>
        <div className="row">
          <div className="col-md-12">
            <div className="form-inner">
              <label>Current password</label>
              <input
                type="password"
                name="fname"
                placeholder="Current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="form-inner">
              <label>New password</label>
              <input
                type="password"
                name="fname"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="form-inner">
              <label>Confirm password</label>
              <input
                type="password"
                name="name"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <button
                className="primary-btn5"
                style={{ fontSize: "12px" }}
                type="submit"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PasswordForm;
