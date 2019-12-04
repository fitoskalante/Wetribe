import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";

export default function Navibar(props) {
  const logout = async () => {
    const res = await fetch("https://127.0.0.1:5000/logout", {
      headers: {
        Authorization: `Token ${sessionStorage.getItem("token")}`
      }
    });
    if (res.ok) {
      sessionStorage.clear("token");
      props.setUser(null);
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Final Project</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {!props.user ? (
            <>
              <Nav.Link href="/signin">Sign In</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/">My Profile</Nav.Link>
              <Button onClick={() => logout()}>Sign Out</Button>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
