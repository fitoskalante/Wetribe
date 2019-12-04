import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Button } from "react-bootstrap";

export default function Sidebar(props) {
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
    <Menu right {...props}>
      <a className="menu-item" href="/">
        Home
      </a>
      {!props.user ? (
        <>
          <a href="/signin" className="menu-item">
            Sign In
          </a>

          <a className="menu-item" href="/signup">
            Create Account
          </a>
        </>
      ) : (
        <>
          <Button onClick={() => logout()} className="menu-item">
            Log Out
          </Button>

          <a className="menu-item" href="/create-event">
            Create Event
          </a>
          <a className="menu-item" href="/profile">
            My profile
          </a>
        </>
      )}
    </Menu>
  );
}
