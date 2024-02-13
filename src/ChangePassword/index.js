import React, { useState } from "react";
import axios from "axios";
import Header from "../Header";

const ChangePassword = ({ user }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setMessage("Please enter all the fields");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setMessage("New passwords do not match");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:3000/auth/change-password",
        {
          userId: user._id,
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(response.data);
    } catch (error) {
      console.error("Error changing password:", error);
      setMessage("Error changing password");
    }
  };

  return (
    <>
      <Header />

      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h2>Change Password</h2>
        <form
          onSubmit={handleChangePassword}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div style={{ margin: "0 auto", width: "50%" }}>
            <label htmlFor="currentPassword">Current Password:</label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>
          <div style={{ margin: "0 auto", width: "50%" }}>
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>
          <div style={{ margin: "0 auto", width: "50%" }}>
            <label htmlFor="confirmNewPassword">Confirm New Password:</label>
            <input
              type="password"
              id="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>
          <button
            type="submit"
            style={{ width: "50%", margin: "0 auto", padding: "0.5rem" }}
          >
            Change Password
          </button>
        </form>
        {message && <p style={{color:"red"}}>{message}</p>}
      </div>
    </>
  );
};

export default ChangePassword;
