import React, { useState } from "react";
import { Alert, Col, Row, Container } from "react-bootstrap";
import "./Header.css";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router";

export const Header = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory;

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to logout");
    }
  }

  return (
    <>
      <div className="header-con">
        <div>
          <a className="header" href="/">
            Home
          </a>
          <a className="header" href="/register">
            Register
          </a>
          <a className="header" href="/login">
            Login
          </a>
          {currentUser ? (
            <a className="header" type="button" onClick={handleLogout}>
              Logout
            </a>
          ) : null}
          <strong>{currentUser && currentUser.email}</strong>
        </div>
      </div>
    </>
  );
};
