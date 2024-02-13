import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./Registration";
import Login from "./Login";
import Error from "./error";
import Dashboard from "./Dashboard";
import ChangePassword from "./ChangePassword";

function getToken() {
  return localStorage.getItem("token");
}

function getUser() {
  return localStorage.getItem("user");
}

const AppRouter = () => {
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());

  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route
        path="/login"
        element={<Login setToken={setToken} setUser={setUser} />}
      />
      <Route
        path="/dashboard"
        element={token ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/change-password"
        element={token ? <ChangePassword user={user} /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default AppRouter;
