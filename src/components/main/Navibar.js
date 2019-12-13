import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../../img/logo-white.png";
import { Link } from "react-router-dom";

export default function Navibar(props) {
  return (
    <Navbar className="navibar font-weight-bold" variant="dark" expand="lg">
      <div className="container p-3 ">
        <Navbar.Brand>
          <Link to="/">
            <img
              alt="logo"
              src={logo}
              width="150"
              className="d-inline-block align-top "
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {" "}
            <Link
              to="/create-event"
              className="navlink-one-side-border pr-5 text-white nav-link"
            >
              Create a Tribe
            </Link>
            {!props.user ? (
              <>
                <Link to="/auth/signin" className="pl-lg-5 nav-link">
                  Sign in
                </Link>
                <Link to="/auth/signup" className=" nav-link">
                  Join
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="pl-lg-5 nav-link">
                  My Profile
                </Link>
                <Nav.Link className="nav-link" onClick={props.logout}>
                  Sign Out
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
