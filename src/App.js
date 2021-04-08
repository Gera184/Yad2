import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Home } from "./pages/home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "./pages/header/Header";
import Signup from "./pages/signup/Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./pages/contexts/AuthContext";
import Login from "./pages/login/Login";
import PrivateRoute from "./pages/contexts/PrivateRoute";
import Chat from "./pages/chat/Chat";

export default () => {
  return (
    <div>
      <AuthProvider>
        <Header />
        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/chat" component={Chat} />
            <Container className="d-flex align-items-center justify-content-center">
              <div className="w-100" style={{ maxWidth: "500px" }}>
                <Route exact path="/register" component={Signup} />
                <Route exact path="/login" component={Login} />
              </div>
            </Container>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
};
