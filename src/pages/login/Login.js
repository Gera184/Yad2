import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Login.css";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function hundleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to login");
      passwordRef.current.value = "";
    }
    setLoading(false);
  }
  return (
    <>
      <div class="container-fluid">
        {error && <Alert variant="danger"> {error} </Alert>}
        <div class="row main-content bg-success text-center">
          <div class="col-md-4 text-center company__info">
            <span class="company__logo">
              <h2>
                <span class="fa fa-android"></span>
              </h2>
            </span>
          </div>
          <div class="col-md-8 col-xs-12 col-sm-12 login_form ">
            <div class="container-fluid">
              <div class="row login-header">
                <h2>Log In</h2>
              </div>
              <div class="row">
                <form control="" class="form-group" onSubmit={hundleSubmit}>
                  <div class="row">
                    <input
                      type="email"
                      name="username"
                      id="username"
                      class="form__input"
                      placeholder="Email"
                      ref={emailRef}
                      required
                    />
                  </div>
                  <div class="row">
                    <span class="fa fa-lock"></span>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      class="form__input"
                      placeholder="Password"
                      ref={passwordRef}
                      required
                    />
                  </div>

                  <div class="row">
                    <input
                      disabled={loading}
                      type="submit"
                      value="Submit"
                      class="btn"
                    />
                  </div>
                </form>
              </div>
              <div class="row">
                <p>
                  Don't have an account? <Link to="/register">Sign up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
