import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleChangePassword = () => {
    navigate("/change-password");
  };

  return (
    <header>
      <nav style={{ display: "flex", justifyContent: "space-between", padding:"1rem" }}>
        <h1 onClick={() => navigate("/dashboard")} style={{ cursor: "pointer", border: "1px solid black", padding: "0.5rem"}}> Home </h1>
        <ul style={{ display: "flex", listStyle: "none", gap: "10px" }}>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
          <li>
            <button onClick={handleChangePassword}>Change Password</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
