import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import logo from "../../img/logo-white.png";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

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
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <NavDropdown
                  className="pl-lg-5"
                  title={props.user.name || "My Account"}
                  id="basic-nav-dropdown"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/activity">
                    <NavDropdown.Item>Activity</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Divider />

                  <NavDropdown.Item
                    className="link-dropdown font-weight-bold"
                    onClick={props.logout}
                  >
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
