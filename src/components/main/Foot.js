import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Foot() {
  return (
    <>
      <div className="foot container-fluid py-5">
        <div className="container d-flex flex-column flex-sm-row border-bottom border-white pb-5">
          <Nav
            defaultActiveKey="/home"
            className="flex-column col-12 col-sm-3 mt-3"
          >
            <p className="text-white nav-link m-0 font-weight-bold">
              Your Account
            </p>
            <Nav.Link className="foot-link" href="/home">
              Join
            </Nav.Link>
            <Nav.Link className="foot-link">Sign In</Nav.Link>
            <Nav.Link className="foot-link">Help</Nav.Link>
          </Nav>
          <Nav
            defaultActiveKey="/home"
            className="flex-column col-12 col-sm-3 mt-3"
          >
            <p className="text-white nav-link m-0 font-weight-bold">Discover</p>
            <Nav.Link className="foot-link" href="/home">
              Groups
            </Nav.Link>
            <Nav.Link className="foot-link">Topics</Nav.Link>
            <Nav.Link className="foot-link">Cities</Nav.Link>
          </Nav>
          <Nav
            defaultActiveKey="/home"
            className="flex-column col-12 col-sm-3 mt-3"
          >
            <p className="text-white nav-link m-0 font-weight-bold">Wetribe</p>
            <Nav.Link className="foot-link" href="/home">
              About
            </Nav.Link>
            <Nav.Link className="foot-link">Apps</Nav.Link>
            <Nav.Link className="foot-link">Accessibility</Nav.Link>
          </Nav>
          <Nav
            defaultActiveKey="/home"
            className="flex-column col-12 col-sm-3 mt-3"
          >
            <p className="text-white nav-link m-0 font-weight-bold">
              Follow us
            </p>
            <div className="d-flex flex-column flex-md-row">
              <div className="d-flex">
                <Nav.Link className="foot-link">
                  <FontAwesomeIcon
                    icon={["fab", "facebook-square"]}
                    size="lg"
                  />
                </Nav.Link>
                <Nav.Link className="foot-link">
                  <FontAwesomeIcon icon={["fab", "twitter"]} size="lg" />
                </Nav.Link>
              </div>
              <div className="d-flex">
                <Nav.Link className="foot-link">
                  <FontAwesomeIcon icon={["fab", "youtube"]} size="lg" />
                </Nav.Link>
                <Nav.Link className="foot-link">
                  <FontAwesomeIcon icon={["fab", "instagram"]} size="lg" />
                </Nav.Link>
              </div>
            </div>
          </Nav>
        </div>
        <div className="container">
          <p className="pl-3 text-white m-0 pt-5">
            <small>
              © Wetribe 2019 . Wetribe is a wholly owned subsidiary of
              CoderSchool Companies Inc.
            </small>
          </p>
          <div className="d-flex">
            <Nav.Link className="foot-link">
              <small>Terms of Service</small>
            </Nav.Link>
            <Link to="/privacy" className="nav-link foot-link">
              <small>Privacy Policy</small>
            </Link>
            <Nav.Link className="foot-link">
              <small>Cookie Policy</small>
            </Nav.Link>
          </div>
        </div>
      </div>
    </>
  );
}
